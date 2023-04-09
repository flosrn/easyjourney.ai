"use client";

import React, { useState } from "react";
import type { User } from "@prisma/client";

type FollowButtonProps = {
  userId: User["id"];
};

const FollowButton = ({ userId }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    // Replace this with your own API logic to handle following
    setIsFollowing(!isFollowing);
    // eslint-disable-next-line no-console
    console.log("Follow button clicked", userId);
  };

  return (
    <>
      <button
        onClick={handleFollowClick}
        className={`mt-4 rounded-full px-4 py-2 ${
          isFollowing ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`text-sm font-semibold ${
            isFollowing ? "text-white" : "text-gray-700"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </span>
      </button>
    </>
  );
};

export default FollowButton;
