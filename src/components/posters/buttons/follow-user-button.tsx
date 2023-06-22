"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useFollowStore } from "~/store/followStore";
import { UserCheck2Icon, UserPlus2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { cn } from "~/lib/classNames";

import TooltipButton from "./tooltip-button";

type FollowUserButtonProps = {
  userId: string;
  isFollowing?: boolean;
};

const followUser = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  return data;
};

const FollowUserButton = ({
  userId,
  isFollowing: isFollowingInitial,
}: FollowUserButtonProps) => {
  const [isFollowing, setIsFollowing] = useFollowStore((state) => [
    state.isFollowing,
    state.setIsFollowing,
  ]);
  const session = useSession();
  const router = useRouter();
  const isUser = session.data?.user.id === userId;

  useEffect(() => {
    setIsFollowing(isFollowingInitial);
  }, [isFollowingInitial, setIsFollowing]);

  const { mutate } = useMutation({
    mutationFn: async () => followUser(userId),
    onMutate: () => {
      setIsFollowing(!isFollowing);
    },
    onSuccess: ({ status }) => {
      toast.success(`User successfully ${status}`);
    },
    onError: () => {
      setIsFollowing(!isFollowing);
      toast.error("Something went wrong");
    },
  });

  const handleFollowClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!session.data) router.push("/api/auth/signin");
    await mutate();
  };

  if (isUser) return null;

  return (
    <TooltipButton
      Icon={isFollowing ? UserCheck2Icon : UserPlus2Icon}
      clickHandler={handleFollowClick}
      className={cn({
        "bg-success text-success-foreground hover:bg-success/80": isFollowing,
      })}
      contentClassName={cn({
        "bg-error": isFollowing,
      })}
    >
      {isFollowing ? "Unfollow user" : "Follow user"}
    </TooltipButton>
  );
};

export default FollowUserButton;
