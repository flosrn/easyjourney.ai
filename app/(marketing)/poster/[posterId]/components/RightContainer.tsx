import Link from "next/link";
import { formatDate } from "~/utils/formatDate";
import getFirstLetters from "~/utils/getFirstLetter";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";

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
          <span className="text-gray-500">Resolution</span>
          <span className="">
            {width}px/{height}px
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Ratio</span>
          <span className="">{ratio}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500">Created at</span>
          <span className="">{date}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-gray-500">Filter</span>
          <span className="">{style ?? "none"}</span>
        </div>

        {model && (
          <div className="flex flex-col">
            <span className="text-gray-500">Model of AI</span>
            <span>{model}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default RightContainer;
