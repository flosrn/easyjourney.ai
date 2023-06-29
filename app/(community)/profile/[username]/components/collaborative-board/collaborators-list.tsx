import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

import { SelectedUser } from "./selected-users";

const getCollaborators = async (boardId: string) => {
  const response = await fetch(
    `/api/boards/collaborators/actual-collaborators?boardId=${boardId}`
  );
  const data = await response.json();
  console.log("data", data);
  return data.users;
};

export function CollaboratorsList({ boardId }: string) {
  const [collaboratorsList, setcollaboratorsList] = useState([]);

  const { data: collaborators, isLoading } = useQuery({
    queryKey: ["collaborators", boardId],
    queryFn: async () => getCollaborators(boardId),
  });

  useEffect(() => {
    if (collaborators) {
      setcollaboratorsList(collaborators);
    }
  }, [collaborators]);

  console.log("collaborators", collaborators);
  console.log("collaboratorsList", collaboratorsList);

  return (
    <>
      <CommandInput placeholder="Type a command or search..." />

      <CommandList>
        <CommandEmpty>No collaborators on this board</CommandEmpty>
        <CommandGroup heading="Collaborators">
          {collaboratorsList.map((user) => (
            <CommandItem key={user.id}>
              <SelectedUser
                name={user.name}
                username={user.username}
                image={user.image}
                id={user.id}
                boardId={boardId}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </>
  );
}
