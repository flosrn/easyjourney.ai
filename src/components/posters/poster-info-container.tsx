import React from "react";
import Link from "next/link";
import { formatDate } from "~/utils/formatDate";
import getFirstLetters from "~/utils/getFirstLetter";
import { Info } from "lucide-react";

import CopyPromptButton from "~/components/posters/buttons/copy-prompt-button";
import EditPromptButton from "~/components/posters/buttons/edit-prompt-button";
import FollowUserButton from "~/components/posters/buttons/follow-user-button";
import SharePosterButton from "~/components/posters/buttons/share-poster-button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

import type { Poster } from "~/types/poster";

type PosterInfoContainerProps = Poster & {
  children?: React.ReactNode;
};

const PosterInfoContainer = ({
  title,
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
  children,
}: PosterInfoContainerProps) => {
  const author = user?.username;
  const date = formatDate({ dateObject: createdAt });
  return (
    <div className="w-full pt-4">
      <div>
        {author && (
          <div className="flex items-center justify-between">
            <Link
              href={`/profile/${author}`}
              className="flex items-center font-bold text-muted-foreground"
            >
              {user.image && (
                <Avatar className="mr-2 h-7 w-7 cursor-pointer">
                  <AvatarImage src={user.image} referrerPolicy="no-referrer" />
                  <AvatarFallback>{getFirstLetters(author)}</AvatarFallback>
                </Avatar>
              )}
              <span className="hover:underline">{author}</span>
            </Link>
            <div className="grid grid-flow-col gap-1">
              <FollowUserButton
                userId={user.id}
                isFollowing={user.isFollowing}
              />
              <SharePosterButton />
            </div>
          </div>
        )}
      </div>
      <div className="mt-8 line-clamp-2 break-words text-2xl font-bold md:text-3xl">
        {title ?? prompt}
      </div>
      <div className="my-2 mt-8 flex flex-col">
        <span className="text-xl font-bold text-muted-foreground">Prompt</span>
        <div className="grid grid-flow-col items-center justify-between gap-5">
          <span className="text-sm md:text-base">{prompt}</span>
          <div className="grid items-center justify-between gap-1 md:grid-flow-col">
            <CopyPromptButton prompt={prompt} />
            <EditPromptButton prompt={prompt} />
          </div>
        </div>
      </div>

      <div className="mt-5 grid w-full grid-cols-2 gap-4 border-t border-gray-500 pt-4">
        <div className="flex flex-col">
          <span className="select-none text-muted-foreground">Resolution</span>
          <span>
            {width}px / {height}px
          </span>
        </div>

        <div className="flex flex-col">
          <span className="select-none text-muted-foreground">Created at</span>
          <span>{date}</span>
        </div>

        <div className="flex flex-col">
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex select-none">
                <span className="text-muted-foreground">Aspect Ratio</span>
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
                <span className="text-muted-foreground">Model Version</span>
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
                <span className="text-muted-foreground">Filter Style</span>
                <Info size={13} color="grey" className="ml-1" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              The filter style gives a special render to the image, as
              cinematic, epic, product shot, etc.
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
                <span className="text-muted-foreground">Chaos</span>
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
                <span className="text-muted-foreground">Quality</span>
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
                <span className="text-muted-foreground">Stylise</span>
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
      {children}
    </div>
  );
};

export default PosterInfoContainer;
