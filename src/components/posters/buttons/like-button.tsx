"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Like } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import useThrottle from "~/hooks/use-throtle";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";

import { cn } from "~/lib/classNames";

type LikeButtonProps = {
  id: string;
  likes?: Like[];
  ghost?: boolean;
};

const likePoster = async (posterId: string) => {
  const response = await fetch("/api/posters/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posterId }),
  });
  return response;
};

const LikeButton = ({ id, likes, ghost }: LikeButtonProps) => {
  const [likesCount, setLikesCount] = useState<number>(likes?.length ?? 0);
  const [userHasLiked, setUserHasLiked] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setUserHasLiked(!!likes?.some((like) => like.userId === session?.user.id));
  }, [session, likes]);

  const likeMutation = useMutation({ mutationFn: likePoster });

  const throttledMutation = useThrottle(async () => {
    try {
      await likeMutation.mutateAsync(id);
    } catch {
      toast.error("Something went wrong liking this poster, please try again");
    }
  }, 2000);

  const handleLike = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!session) {
      return router.push(`/api/auth/signin?callbackUrl=/${pathname}`);
    }

    if (userHasLiked) {
      setLikesCount((prevState) => prevState - 1);
      setUserHasLiked(false);
    } else {
      setLikesCount((prevState) => prevState + 1);
      setUserHasLiked(true);
    }

    try {
      throttledMutation(id);
    } catch {
      toast.error("Something went wrong liking this poster, please try again");
    }
  };

  const MotionButton = motion(Button);

  return (
    <MotionButton
      variant={ghost ? "ghost" : "outline"}
      onClick={handleLike}
      whileHover={ghost ? { scale: 1.1 } : {}}
      whileTap={{ scale: 0.9 }}
      className="space-x-1 rounded-3xl"
    >
      <HeartIcon
        className={cn("h-5 w-5", {
          "text-red-500 fill-current": userHasLiked,
        })}
      />
      <span className="text-sm">{likesCount}</span>
    </MotionButton>
  );
};

export default LikeButton;
