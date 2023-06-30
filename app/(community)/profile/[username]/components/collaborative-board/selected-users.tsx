import Link from "next/link";
import getFirstLetters from "~/utils/getFirstLetter";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import { AddOrDeleteButton } from "./add-delete-button";

type selectedUserProps = {
  name: string;
  username: string;
  image: string;
  id: string;
  boardId: string;
  isCollaborator: boolean;
};

export function SelectedUser({
  name,
  username,
  image,
  id,
  boardId,
  isCollaborator,
}: selectedUserProps) {
  return (
    <div className="flex h-16 w-full items-center justify-between hover:bg-accent">
      <Link href={`/profile/${username}`}>
        <div className="flex">
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
        </div>
      </Link>
      <div>
        <AddOrDeleteButton
          boardId={boardId}
          userId={id}
          isCollaborator={isCollaborator}
        />
      </div>
    </div>
  );
}
