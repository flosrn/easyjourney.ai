"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { cn } from "~/lib/classNames";

type PostersProps = {
  id: string;
  prompt: string;
  image: string;
  likes: { userId: string }[];
  author?: string;
};

const likePoster = async (posterId: string) => {
  const response = await fetch("/api/posters/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId }),
  });
  return response;
};

const Poster = ({ id, prompt, image, likes, author }: PostersProps) => {
  const { data: session } = useSession();
  const [likesCount, setLikesCount] = useState(likes.length);
  const [userHasLiked, setUserHasLiked] = useState(
    // eslint-disable-next-line unicorn/prefer-array-some
    !!likes.find((like) => like.userId === session?.user.id)
  );

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
    <>
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
      <div className="mt-1 text-gray-500">
        <p className="truncate text-xs font-medium text-gray-600">{prompt}</p>

        {author && (
          <p className="text-[11px]">
            by{" "}
            <Link href={`/`} className="text-gray-300">
              @{author}
            </Link>
          </p>
        )}
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default Poster;
