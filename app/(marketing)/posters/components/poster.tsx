import React from "react";
import Link from "next/link";
import getFirstLetters from "~/utils/getFirstLetter";

import CheckboxSelect from "~/components/posters/checkbox-select";
import ImageAnimationSelect from "~/components/posters/image-animation-select";
import LikeButton from "~/components/posters/like-button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import type { PosterType } from "~/types/poster";

import BottomPosterPrompt from "./bottom-poster-prompt";

type PostersProps = PosterType;

const Poster = ({
  id,
  prompt,
  image,
  width,
  height,
  likes,
  user,
}: PostersProps) => {
  const author = user?.username;

  return (
    <div className="group relative h-auto max-w-full overflow-hidden rounded-lg">
      <Link href={`/poster/${id}`}>
        <ImageAnimationSelect
          id={id}
          prompt={prompt}
          image={image}
          width={width ?? 500}
          height={height ?? 500}
        />
        <BottomPosterPrompt prompt={prompt} />
      </Link>
      {author && (
        <p className="absolute left-2 top-1 z-10 hidden w-full text-[10px] md:group-hover:block">
          <Link
            href={`/profile/${author}`}
            className="flex items-center text-gray-300"
          >
            {user.image && (
              <Avatar className="mr-2 h-7 w-7 cursor-pointer">
                <AvatarImage src={user.image} referrerPolicy="no-referrer" />
                <AvatarFallback>{getFirstLetters(author)}</AvatarFallback>
              </Avatar>
            )}
            <span className="hover:underline">@{author}</span>
          </Link>
        </p>
      )}
      <div className="absolute right-[2px] top-[2px] z-20">
        <LikeButton id={id} likes={likes} hasHoverAnim />
      </div>
      <CheckboxSelect id={id} />
    </div>
  );
};

export default Poster;
