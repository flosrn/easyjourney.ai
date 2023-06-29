import Link from "next/link";
import getFirstLetters from "~/utils/getFirstLetter";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { AddOrDeleteButton } from "./add-delete-button";

export function SelectedUsers({ name, username, image, id, boardId }) {
  return (
    <Link
      href={`/profile/${username}`}
      className="flex h-16 w-full justify-between"
    >
      <div className="flex w-full hover:bg-accent">
        <div className="mx-2 flex h-full items-center justify-center">
          {image && (
            <Avatar className="h-12 w-12">
              <AvatarImage src={image} referrerPolicy="no-referrer" />
              <AvatarFallback>{getFirstLetters(username)}</AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="ml-2 flex flex-col justify-center">
          <div className="font-bold">{name}</div>
          <div className="truncate text-sm">@{username}</div>
        </div>
        <AddOrDeleteButton boardId={boardId} userId={id} />
      </div>
    </Link>
  );
}
