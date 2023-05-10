import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

const LeftContainer = ({
  image,
  prompt,
  likes,
  id,
  width,
  height,
}: PosterType) => {
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
        width={width}
        height={height}
        className="max-h-[80vh] w-auto rounded-lg"
      />
      <div
        className="m-1 mt-2 inline-block max-w-max
       rounded-3xl border bg-gray-700/20 px-2 py-1 hover:bg-gray-700/80"
      >
        <motion.button
          onClick={handleLike}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center p-1"
        >
          <HeartIcon
            className={cn(
              "h-5 w-5",
              userHasLiked ? "text-red-500 fill-current" : "text-white"
            )}
          />
          <span className="ml-2 mr-1 text-sm">{likesCount}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default LeftContainer;
