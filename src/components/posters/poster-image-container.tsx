import React from "react";
import Image from "next/image";

import DeleteButton from "~/components/posters/buttons/delete-button";
import DownloadButton from "~/components/posters/buttons/download-button";
import ExpandButton from "~/components/posters/buttons/expand-button";
import ExternalLinkButton from "~/components/posters/buttons/external-link-button";
import LikeButton from "~/components/posters/buttons/like-button";
import ZoomImage from "~/components/posters/zoom-image";

import { cn } from "~/lib/classNames";
import type { Poster } from "~/types/poster";

type PosterImageContainerProps = Poster & {
  children?: React.ReactNode;
};

const PosterImageContainer = ({
  id,
  image,
  prompt,
  likes,
  width,
  height,
  filename,
  user,
  children,
}: PosterImageContainerProps) => (
  <div className="">
    <div
      className={cn(
        "flex group relative justify-star flex-col overflow-hidden"
      )}
    >
      <Image
        src={image}
        alt={prompt}
        width={width ?? 500}
        height={height ?? 500}
        unoptimized
        className="h-auto w-full object-cover"
      />
      <ZoomImage imageUrl={image} alt={prompt} />
    </div>
    <div className="my-2 flex justify-between">
      <LikeButton id={id} likes={likes} />
      <div className="grid grid-flow-col gap-1">
        <DownloadButton imageUrl={image} filename={filename} />
        {user && <DeleteButton id={id} userId={user.id} />}
        <ExternalLinkButton imageUrl={image} />
        <ExpandButton />
      </div>
      {children}
    </div>
  </div>
);

export default PosterImageContainer;
