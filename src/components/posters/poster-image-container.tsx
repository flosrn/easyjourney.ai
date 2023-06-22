import React from "react";
import Image from "next/image";

import DownloadButton from "~/components/posters/download-button";
import ExpandButton from "~/components/posters/expand-button";
import ExternalLinkButton from "~/components/posters/external-link-button";
import LikeButton from "~/components/posters/like-button";
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
  ratio,
  filename,
  children,
}: PosterImageContainerProps) => (
  <div
    className={cn("flex relative justify-start flex-col", {
      "sm:max-w-[90%]": ratio === "2/3",
      "sm:max-w-[80%]": ratio === "4/7",
    })}
  >
    <Image
      src={image}
      alt={prompt}
      width={width ?? 500}
      height={height ?? 500}
      className="h-auto max-h-[85vh] w-full object-cover"
    />
    <ZoomImage imageUrl={image} alt={prompt} />
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
