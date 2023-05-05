"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

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
        <Image
          alt={prompt}
          src={image}
          width="1000"
          height="1000"
          className="scale-[1.03] transition duration-200 ease-in-out hover:scale-100"
        />
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
        <div className="absolute inset-0 hidden bg-black/30 group-hover:block" />
        <div className="absolute bottom-0 mt-1 hidden p-1 group-hover:block">
          <p className="truncate text-base font-medium text-white">{prompt}</p>
          {author && (
            <p className="text-[10px]">
              by{" "}
              <Link
                href={`/profile/${author}`}
                className="text-gray-300 hover:underline"
              >
                @{author}
              </Link>
            </p>
          )}
        </div>
      </Link>
    </div>

    /*  <div className="relative w-[150px]">
      <Link href={`/poster/${id}`}>
        <Image
          alt={prompt}
          src={image}
          width="150"
          height="300"
          className="rounded-lg transition duration-200 ease-in-out hover:scale-105"
        />
        <div className="absolute right-[2px] top-[2px]">
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
        <Toaster position="bottom-right" />
      </Link>

      <div className="mt-1 text-gray-500">
        <p className="truncate text-xs font-medium text-gray-600">{prompt}</p>
        {author && (
          <p className="text-[10px]">
            by{" "}
            <Link
              href={`/profile/${author}`}
              className="text-gray-300 hover:underline"
            >
              @{author}
            </Link>
          </p>
        )}
      </div>
    </div> */
  );
};

export default Poster;
