import React from "react";
import Image from "next/image";
import Link from "next/link";
import getFirstLetters from "~/utils/getFirstLetter";

import CheckboxSelect from "~/components/posters/CheckboxSelect";
import LikeButton from "~/components/posters/LikeButton";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";

import type { PosterType } from "~/types/poster";

type PostersProps = PosterType;

const Poster = ({
  id,
  prompt,
  image,
  width,
  height,
  likes,
  user,
  isSelected,
}: PostersProps) => {
  const author = user?.username;
  return (
    <div className="group relative h-auto max-w-full overflow-hidden rounded-lg">
      <Link href={`/poster/${id}`}>
        <Image
          alt={prompt}
          src={image}
          width={width ?? 500}
          height={height ?? 500}
        />
        <div className="absolute inset-0 hidden bg-black/50 md:group-hover:block" />
        <div className="absolute bottom-0 mt-1 hidden w-full truncate p-2 md:group-hover:block">
          <p className="w-full truncate text-sm font-medium text-white">
            {prompt}
          </p>
        </div>
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
      <div className="absolute right-[2px] top-[2px] z-10">
        <LikeButton id={id} likes={likes} hasHoverAnim />
      </div>
      <div className="absolute left-[2px] top-[2px] z-10">
        <CheckboxSelect id={id} />
      </div>
    </div>
  );
};

export default Poster;
