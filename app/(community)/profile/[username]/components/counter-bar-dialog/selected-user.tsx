"use client";

import Link from "next/link";
import getFirstLetters from "~/utils/getFirstLetter";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import type { UserWithFollowers } from "~/types/user";

import FollowButton from "../follow-button";

type SelectedUserProps = {
  user: UserWithFollowers;
  actualUser: string;
};

const SelectedUser = ({ user, actualUser }: SelectedUserProps) => {
  const isFollowing = user.followers.some(
    (follower) => follower.followerId === actualUser
  );
  const { image, username, name, id } = user;

  return (
    <Link
      href={`/profile/${username}`}
      className="flex h-16 w-full justify-between"
    >
      <div className="flex">
        <div className="mx-2 flex h-full items-center justify-center">
          {image && (
            <Avatar className="h-12 w-12">
              <AvatarImage src={image} referrerPolicy="no-referrer" />
              <AvatarFallback>{getFirstLetters(username)}</AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="ml-2 flex flex-col justify-center">
          <div className="font-bold">{name}</div>
          <div className="truncate text-sm">@{username}</div>
        </div>
      </div>

      <div className="flex h-full items-center">
        <FollowButton userId={id} isFollowing={isFollowing} />
      </div>
    </Link>
  );
};

export default SelectedUser;
