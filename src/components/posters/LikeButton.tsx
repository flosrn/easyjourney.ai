"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Like } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useDebounce from "~/hooks/useDebounce";

import { cn } from "~/lib/classNames";

type LikeButtonProps = {
  id: string;
  likes?: Like[];
  hasHoverAnim?: boolean;
};

const likePoster = async (posterId: string) => {
  const response = await fetch("/api/posters/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId }),
  });
  return response;
};

const LikeButton = ({ id, likes, hasHoverAnim }: LikeButtonProps) => {
  const [likesCount, setLikesCount] = useState<number>(likes?.length ?? 0);
  const [userHasLiked, setUserHasLiked] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setUserHasLiked(!!likes?.some((like) => like.userId === session?.user.id));
  }, [session, likes]);

  const likeMutation = useMutation(likePoster, {
    onSuccess: (data) => {
      if (data.status === 409) {
        setLikesCount(likesCount && likesCount - 1);
        setUserHasLiked(false);
        toast.error("You already liked this poster!");
      }
    },
  });

  // eslint-disable-next-line no-shadow
  const debouncedMutation = useDebounce(async (id: string) => {
    try {
      await likeMutation.mutateAsync(id);
    } catch {
      toast.error("Something went wrong liking this poster, please try again");
    }
  }, 500);

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!session) {
      return router.push("/api/auth/signin");
    }

    if (userHasLiked) {
      setLikesCount((prevState) => prevState - 1);
      setUserHasLiked(false);
    } else {
      setLikesCount((prevState) => prevState + 1);
      setUserHasLiked(true);
    }

    debouncedMutation(id);
  };
  return (
    <motion.button
      onClick={handleLike}
      whileHover={hasHoverAnim ? { scale: 1.1 } : {}}
      whileTap={{ scale: 0.9 }}
      className="flex items-center space-x-2 p-1"
    >
      <HeartIcon
        className={cn(
          "h-5 w-5",
          userHasLiked ? "text-red-500 fill-current" : "text-white"
        )}
      />
      <span className="text-sm">{likesCount}</span>
    </motion.button>
  );
};

export default LikeButton;
