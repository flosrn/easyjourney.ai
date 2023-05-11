import Link from "next/link";
import { Info } from "lucide-react";
import { formatDate } from "~/utils/formatDate";
import getFirstLetters from "~/utils/getFirstLetter";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/HoverCard";

import type { PosterType } from "~/types/poster";

const PosterInfoContainer = ({
  prompt,
  user,
  createdAt,
  width,
  height,
  ratio,
  model,
  style,
  chaos,
  quality,
  stylize,
}: PosterType) => {
  const author = user?.username;
  const date = formatDate({ dateObject: createdAt });
  return (
    <>
      <div>
        {author && (
          <p className="left-2 top-1 z-10 w-full text-sm font-extrabold md:group-hover:block">
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
              <span className="hover:underline">{author}</span>
            </Link>
          </p>
        )}
      </div>
      <div className="mt-8 line-clamp-2 text-3xl font-bold">{prompt}</div>
      <div className="my-2 mt-8 flex flex-col">
        <span className="text-gray-500">Prompt</span>
        <span className="tracking-wider">{prompt}</span>
      </div>

      <div className="mt-8 grid w-full grid-cols-2 gap-4 border-t border-gray-500 pt-4">
        <div className="flex flex-col">
          <span className="select-none text-gray-500">Resolution</span>
          <span>
            {width}px / {height}px
          </span>
        </div>

        <div className="flex flex-col">
          <span className="select-none text-gray-500">Created at</span>
          <span>{date}</span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500 ">Aspect Ratio</span>
                <Info size={13} color="grey" className="ml-1" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              Aspect ratio is the width-to-height ratio of an image
            </HoverCardContent>
          </HoverCard>
          <span>{ratio ?? "1/1"}</span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500 ">Model Version</span>
                <Info size={13} color="grey" className="ml-1" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              The model version is the version of Midjourney used to create the
              image.
            </HoverCardContent>
          </HoverCard>
          <span>{model ?? "MJ version 5.1"}</span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500 ">Filter</span>
                <Info size={13} color="grey" className="ml-1" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              The filter gives a special render to the image, as cinematic,
              epic, product shot, etc.
            </HoverCardContent>
          </HoverCard>
          <span className="line-clamp-3">
            {!style || style.length === 0 ? "None" : style}
          </span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500">Chaos</span>
                <Info size={13} color="grey" className="ml-1" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              Chaos is the amount of randomness in the image and originality
              permission given to the IA, between 0 and 100.
            </HoverCardContent>
          </HoverCard>
          <span>{chaos ?? "0"}</span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500">Quality</span>
                <Info size={13} color="grey" className="ml-1" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              The Quality Parameter will define how long the AI spends creating
              the image.
            </HoverCardContent>
          </HoverCard>
          <span>{quality ?? "1"}</span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500">Stylise</span>
                <Info size={13} color="grey" className="ml-1" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              The Stylize Parameter will make your image more stylized,
              rendering with a much more artistic style.
            </HoverCardContent>
          </HoverCard>
          <span>{stylize ?? "None"}</span>
        </div>
      </div>
    </>
  );
};

export default PosterInfoContainer;
