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

import type { PosterProductProps } from "../PosterProduct";

const RightContainer = ({
  ratio,
  width,
  height,
  user,
  createdAt,
  prompt,
  model,
  style,
  chaos,
  quality,
  stylise,
}: PosterProductProps) => {
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

      <div className="mt-8 grid w-auto grid-cols-2 gap-4 border-t border-gray-500 pt-4">
        <div className="flex flex-col">
          <span className="select-none text-gray-500">Resolution</span>
          <span className="">
            {width}px/{height}px
          </span>
        </div>

        <div className="flex flex-col">
          <span className="select-none text-gray-500">Ratio</span>
          <span className="">{ratio}</span>
        </div>

        <div className="flex flex-col">
          <span className="select-none text-gray-500">Created at</span>
          <span className="">{date}</span>
        </div>

        {model && (
          <div className="flex flex-col">
            <span className="select-none text-gray-500">Model of AI</span>
            <span>{model}</span>
          </div>
        )}

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500 ">Filter</span>
                <Info size={13} color="grey" className="ml-2" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              The filter gives a special render to the image, as cinematic,
              epic, film noir, etc...
            </HoverCardContent>
          </HoverCard>
          <span className="">{style ? style : "none"}</span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500">Chaos</span>
                <Info size={13} color="grey" className="ml-2" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              Chaos is the amount of randomness in the image and originality
              permission given to the IA, between 0 and 100.
            </HoverCardContent>
          </HoverCard>
          <span className="">{chaos}</span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500">Quality</span>
                <Info size={13} color="grey" className="ml-2" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              The Quality Parameter will define how long the AI spends creating
              the image.
            </HoverCardContent>
          </HoverCard>
          <span className="">{quality}</span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-gray-500">Stylise</span>
                <Info size={13} color="grey" className="ml-2" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              The Stylize Parameter will make your image more stylized,
              rendering with a much more artistic style.
            </HoverCardContent>
          </HoverCard>
          <span className="">{stylise ? stylise : "none"}</span>
        </div>
      </div>
    </>
  );
};

export default RightContainer;
