import Link from "next/link";
import { formatDate } from "~/utils/formatDate";
import getFirstLetters from "~/utils/getFirstLetter";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/Avatar";

import type { PosterProductProps } from "../PosterProduct";

function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    const lastSpace = str.slice(0, Math.max(0, maxLength)).lastIndexOf(" ");
    if (lastSpace !== -1) {
      // Coupe la phrase à l'emplacement de l'espace trouvé
      return `${str.slice(0, Math.max(0, lastSpace))}...`;
    }
    // Si aucun espace n'a été trouvé, coupe simplement la phrase à maxLength
    return `${str.slice(0, Math.max(0, maxLength))}...`;
  }
  // Si la phrase est plus courte que maxLength, ne fait rien
  return str;
}

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

  const titlePrompt = truncateString(prompt, 50);

  const date = formatDate({ dateObject: createdAt });
  console.log("data", date);

  return (
    <>
      <div className="">
        {author && (
          <p className=" left-2 top-1 z-10 w-full text-sm font-extrabold md:group-hover:block">
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
      <div className="mt-8 text-3xl font-bold">{titlePrompt}</div>
      <div className="my-2 mb-4 flex flex-col">
        <span className="text-gray-500">Prompt</span>
        <span className="">{prompt}</span>
      </div>
      <div className="mt-4 grid  grid-cols-2 gap-4">
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
        {style && (
          <div className="flex flex-col">
            <span className="text-gray-500">Filter</span>
            <span className="">{style}</span>
          </div>
        )}
        {model && (
          <div className="flex flex-col">
            <span className="text-gray-500">Model of AI</span>
            <span className="">{model}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default RightContainer;
