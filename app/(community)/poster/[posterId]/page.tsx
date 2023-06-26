import React from "react";
import { getCurrentUser } from "~/server/auth";
import { prisma } from "~/server/db/prisma";
import { Toaster } from "react-hot-toast";

import BackToPreviousPageButton from "~/components/posters/buttons/back-to-previous-page-button";
import PosterImageContainer from "~/components/posters/poster-image-container";
import PosterInfoContainer from "~/components/posters/poster-info-container";

import type { Poster, UserWithFollowStatus } from "~/types/poster";

type Props = {
  params: { posterId: string };
  searchParams: Record<string, string[] | string | undefined>;
};

export async function generateMetadata({
  params: { posterId },
  searchParams,
}: Props) {
  const poster = await prisma.poster.findUnique({
    where: { id: posterId },
  });

  // optionally access and extend (rather than replace) parent metadata

  // const previousImages = (await parent)?.openGraph?.images ?? [];

  return {
    title: poster?.title ? `Poster - ${poster.title}` : "Poster",
    twitter: {
      card: "summary_large_image",
      title: `${poster?.title} - Easyjourney Poster`,
      description: poster?.prompt ?? "twitter description",
      creator: "@flosrn",
    },
    themeColor: "#FFF",
    // openGraph: {
    //   images: [...previousImages],
    // },
  };
}

const getCurrentPoster = async (
  posterId: Poster["id"],
  currentUserId?: string
): Promise<Poster | null> => {
  const poster = await prisma.poster.findUnique({
    where: { id: posterId },
    include: {
      user: {
        include: {
          followers: true,
        },
      },
      likes: true,
    },
  });

  if (poster?.user) {
    const isFollowing = poster.user.followers.some(
      (follower) => follower.followerId === currentUserId
    );

    const userWithFollowStatus: UserWithFollowStatus = {
      ...poster.user,
      isFollowing,
    };

    return { ...poster, user: userWithFollowStatus } as Poster;
  }

  return null;
};

export default async function PosterPage({
  params: { posterId },
}: {
  params: { posterId: Poster["id"] };
}) {
  const user = await getCurrentUser();
  const poster = await getCurrentPoster(posterId, user?.id);
  return (
    <>
      <section className="container mt-8 items-center justify-center gap-6 pb-8">
        <div className="mx-auto mb-5 max-w-5xl md:flex md:flex-row md:space-x-8">
          <BackToPreviousPageButton />
        </div>
        <div className="mx-auto max-w-5xl md:flex md:flex-row md:space-x-8">
          {poster ? (
            <>
              <PosterImageContainer {...poster} />
              <PosterInfoContainer {...poster} />
            </>
          ) : (
            <p className="w-full text-center text-2xl font-bold">
              Poster not found
            </p>
          )}
        </div>
        <Toaster position="bottom-right" />
      </section>
    </>
  );
}
