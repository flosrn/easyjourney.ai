"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { cn } from "~/lib/classNames";

type FollowButtonProps = {
  userId: User["id"];
  isFollowing: boolean;
};

const followUser = async (userId: User["id"]) => {
  const response = await fetch(`/api/users/${userId}/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  return response.json();
};

const FollowButton = ({
  userId,
  isFollowing: isUserFollowing,
}: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(isUserFollowing);
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleFollowClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (!session.data) {
      router.push(`/api/auth/signin?callbackUrl=/${pathname}`);
    }
    setIsFollowing(!isFollowing);
    const data = await followUser(userId);
    if (data.error) {
      toast.error(data.error);
      setIsFollowing(!isFollowing);
    }
  };

  return (
    <>
      <button
        onClick={handleFollowClick}
        className={cn(
          "rounded-full px-4 py-2",
          isFollowing ? "bg-blue-500" : "bg-gray-300"
        )}
      >
        <span
          className={cn(
            "text-sm font-semibold",
            isFollowing ? "text-white" : "text-gray-700"
          )}
        >
          {isFollowing ? "Following" : "Follow"}
        </span>
      </button>
      <Toaster position="bottom-right" />
    </>
  );
};

export default FollowButton;
