import React from "react";
import Image from "next/image";
import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";
import { Toaster } from "react-hot-toast";

import FollowUserButton from "~/components/posters/buttons/follow-user-button";

import { CounterBar } from "./components/counter-bar";
import FollowButton from "./components/follow-button";
import { SelectBar } from "./components/select-bar";
import TabsHeader from "./components/tabs-header";

type LayoutProfileHeaderProps = {
  params: { username: User["username"] };
  children: React.ReactNode;
};

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
}: LayoutProfileHeaderProps) {
  const session = await getServerAuthSession();
  const user = await getUserInfos(username);

  if (!user) {
    return <div>User not found</div>;
  }

  const isAdmin = session?.user.role === "ADMIN";
  const isCurrentUser = session?.user.id === user.id;
  const isValidUser = isAdmin || isCurrentUser;
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
      <div className="container mt-4 max-w-6xl">
        <div className="flex w-full flex-col items-center justify-center rounded-xl bg-muted py-8">
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

          <div className="pt-4">
            {!isCurrentUser && (
              <FollowUserButton userId={user.id} isFollowing={isFollowing} />
            )}
          </div>

          <CounterBar
            totalPosters={totalPosters}
            totalLikes={totalLikes}
            totalFollowers={totalFollowers}
            totalFollowing={totalFollowing}
            username={user.username}
            actualUser={session?.user.id ?? ""}
          />
        </div>
      </div>
      <div className="container max-w-6xl pb-56">
        <TabsHeader username={username} isValidUser={isValidUser} />
        {children}
        <SelectBar isValidUser={isValidUser} />
        <Toaster position="bottom-right" />
      </div>
    </>
  );
}
