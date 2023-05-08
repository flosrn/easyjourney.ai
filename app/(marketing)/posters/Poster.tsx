"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import getFirstLetters from "~/utils/getFirstLetter";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";

import { cn } from "~/lib/classNames";
import type { PosterType } from "~/types/poster";

type PostersProps = PosterType;

const likePoster = async (posterId: string) => {
  const response = await fetch("/api/posters/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId }),
  });
  return response;
};

const Poster = ({ id, prompt, image, likes, user }: PostersProps) => {
  const [likesCount, setLikesCount] = useState(likes.length);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const author = user?.username;

  useEffect(() => {
    setUserHasLiked(likes.some((like) => like.userId === session?.user.id));
  }, [session, likes]);

  const likeMutation = useMutation(likePoster, {
    onSuccess: (data) => {
      if (data.status === 409) {
        setLikesCount(likesCount - 1);
        setUserHasLiked(false);
        toast.error("You already liked this poster!");
      }
    },
  });

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!session) {
      return router.push("/api/auth/signin");
    }
    setLikesCount(likesCount + 1);
    setUserHasLiked(true);
    try {
      await likeMutation.mutateAsync(id);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error("Error liking poster", error);
      toast.error("Something went wrong liking this poster, please try again");
    }
  };
  return (
    <div className="group relative h-auto max-w-full overflow-hidden rounded-lg">
      <Link href={`/poster/${id}`}>
        <Image alt={prompt} src={image} width="1000" height="1000" />
        {author && (
          <p className="absolute left-2 top-1 z-10 hidden w-full text-[10px] md:group-hover:block">
            <Link
              href={`/profile/${author}`}
              className="flex items-center text-gray-300"
            >
              {user.image && (
                <Avatar className="mr-2 h-7 w-7 cursor-pointer">
                  <AvatarImage src={user.image} referrerPolicy="no-referrer" />
                  <AvatarFallback>{getFirstLetters(author)}</AvatarFallback>
                </Avatar>
              )}
              <span className="hover:underline">@{author}</span>
            </Link>
          </p>
        )}
        <div className="absolute right-[2px] top-[2px] z-10">
          <motion.button
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center p-1"
          >
            <span className="mr-1 text-xs">{likesCount}</span>
            <HeartIcon
              className={cn(
                "h-4 w-4",
                userHasLiked ? "text-red-500 fill-current" : "text-white"
              )}
            />
          </motion.button>
        </div>
        <div className="absolute inset-0 hidden bg-black/50 md:group-hover:block" />
        <div className="absolute bottom-0 mt-1 hidden w-full truncate p-2 md:group-hover:block">
          <p className="w-full truncate text-sm font-medium text-white">
            {prompt}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Poster;
