import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poster } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { cn } from "~/lib/classNames";
import type { PosterType } from "~/types/poster";

const likePoster = async (posterId: string) => {
  const response = await fetch("/api/posters/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId }),
  });
  return response;
};

const LeftContainer = ({ image, prompt, likes, id }: PosterType) => {
  const [likesCount, setLikesCount] = useState(likes.length);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
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
    <div className="flex flex-col">
      <Image
        src={image}
        alt={prompt}
        width="1280"
        height="1280"
        className="rounded-lg"
      />
      <div>
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
    </div>
  );
};

export default LeftContainer;
