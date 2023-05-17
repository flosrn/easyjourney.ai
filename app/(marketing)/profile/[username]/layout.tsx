import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import FollowButton from "../FollowButton";

const getUserInfos = async (username: User["username"]) =>
  prisma.user.findUnique({
    where: { username },
    include: {
      posters: {
        orderBy: { createdAt: "desc" },
        include: { likes: true },
      },
      followers: true,
      following: true,
    },
  });

export default async function LayoutProfileHeader({
  params: { username },
  children,
}) {
  const session = await getServerAuthSession();
  const user = await getUserInfos(username);

  if (!user) {
    return <div>User not found</div>;
  }

  const isMe = session?.user.id === user.id;
  const totalPosters = user.posters.length;
  const totalLikes = user.posters.reduce(
    (total, poster) => total + poster.likes.length,
    0
  );
  const totalFollowers = user.followers.length;
  const totalFollowing = user.following.length;
  const isFollowing = user.followers.some(
    (follower) => follower.followerId === session?.user.id
  );
  return (
    <>
      <div className="mt-8 flex flex-col items-center justify-center">
        {user.image && (
          <Image
            src={user.image}
            alt={user.name}
            width={128}
            height={128}
            unoptimized
            className="h-32 w-32 rounded-full object-cover"
          />
        )}
        <h1 className="mt-4 text-2xl font-semibold">{user.name}</h1>
        <p className="mt-2 text-lg">@{user.username}</p>
        <Link href={`/profile/${user.username}/likes`}>Test</Link>

        {!isMe && <FollowButton userId={user.id} isFollowing={isFollowing} />}

        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{totalPosters}</h2>
            <p className="text-gray-500">Posters</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{totalLikes}</h2>
            <p className="text-gray-500">Likes</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{totalFollowers}</h2>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{totalFollowing}</h2>
            <p className="text-gray-500">Following</p>
          </div>
        </div>
      </div>
      <div className="container max-w-6xl">{children}</div>
    </>
  );
}
