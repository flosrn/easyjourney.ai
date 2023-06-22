import React from "react";
import Image from "next/image";

import DownloadButton from "~/components/posters/buttons/download-button";
import ExpandButton from "~/components/posters/buttons/expand-button";
import ExternalLinkButton from "~/components/posters/buttons/external-link-button";
import LikeButton from "~/components/posters/buttons/like-button";
import ZoomImage from "~/components/posters/zoom-image";

import { cn } from "~/lib/classNames";
import type { PosterType } from "~/types/poster";

type PosterImageContainerProps = PosterType & {
  children?: React.ReactNode;
};

const PosterImageContainer = ({
  image,
  prompt,
  likes,
  id,
  width,
  height,
  filename,
  children,
}: PosterImageContainerProps) => (
  <div className="">
    <div className={cn("flex relative justify-star flex-col overflow-hidden")}>
      <Image
        src={image}
        alt={prompt}
        width={width ?? 500}
        height={height ?? 500}
        className="h-auto w-full object-cover"
      />
      <ZoomImage imageUrl={image} alt={prompt} />
    </div>
    <div className="my-2 flex justify-between">
      <LikeButton id={id} likes={likes} />
      <div className="grid grid-flow-col gap-1">
        <DownloadButton imageUrl={image} filename={filename} />
        <ExternalLinkButton imageUrl={image} />
        <ExpandButton />
      </div>
      {children}
    </div>
  </div>
);

export default PosterImageContainer;
