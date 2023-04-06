import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

import FollowButton from "./FollowButton";

type UserProfileProps = {
  params: { username: string };
};

export default async function UserProfile({
  params: { username },
}: UserProfileProps) {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { username },
    include: { posters: true, likes: true, followers: true, following: true },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  const isMe = session?.user.id === user.id;

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

        {!isMe && <FollowButton userId={user.id} />}

        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{user.posters.length}</h2>
            <p className="text-gray-500">Posters</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{user.likes.length}</h2>
            <p className="text-gray-500">Likes</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{user.followers.length}</h2>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{user.following.length}</h2>
            <p className="text-gray-500">Following</p>
          </div>
        </div>
      </div>
      <div className="container max-w-4xl">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {user.posters.length > 0 &&
            user.posters.map((poster) => (
              <Link
                key={poster.id}
                href={`/poster/${poster.id}`}
                className="w-[150px]"
              >
                <Image
                  alt={poster.prompt}
                  src={poster.image}
                  width="150"
                  height="150"
                  className="rounded-lg transition duration-200 ease-in-out hover:scale-105"
                />
                <div className="mt-1 text-gray-500">
                  <p className="truncate text-xs font-medium text-gray-600">
                    {poster.prompt}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
