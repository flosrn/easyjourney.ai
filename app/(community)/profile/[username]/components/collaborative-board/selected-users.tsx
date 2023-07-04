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
  collaboratorsWithStatus?: any;
};

export function SelectedUser({
  name,
  username,
  image,
  id,
  boardId,
  isCollaborator,
  collaborators,
}: selectedUserProps) {
  return (
    <div className="flex h-16 w-full items-center justify-between hover:bg-accent">
      <Link href={`/profile/${username}`} className="w-[80%]">
        <div className="flex ">
          <div className=" flex h-full items-center justify-center">
            {image && (
              <Avatar className="h-12 w-12">
                <AvatarImage src={image} referrerPolicy="no-referrer" />
                <AvatarFallback>{getFirstLetters(username)}</AvatarFallback>
              </Avatar>
            )}
          </div>

          <div className="ml-2 w-[70%] min-w-0 shrink-0 grow-0 flex-col justify-center ">
            <div className="truncate font-bold">{name}</div>
            <div className="truncate text-sm">@{username}</div>
          </div>
        </div>
      </Link>
      <div className="w-[20%]">
        <AddOrDeleteButton
          boardId={boardId}
          userId={id}
          isCollaborator={isCollaborator}
          collaborators={collaborators}
        />
      </div>
    </div>
  );
}
