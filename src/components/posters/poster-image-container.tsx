import React from "react";
import Image from "next/image";

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
      className="h-auto max-h-[85vh] w-full rounded-md object-cover"
    />
    <ZoomImage imageUrl={image} alt={prompt} />
    <div>
      <div className="mt-2 inline-block max-w-max rounded-3xl border bg-gray-700/20 px-2 py-1 hover:bg-gray-700/80">
        <LikeButton id={id} likes={likes} />
      </div>
      {children}
    </div>
  </div>
);

export default PosterImageContainer;
