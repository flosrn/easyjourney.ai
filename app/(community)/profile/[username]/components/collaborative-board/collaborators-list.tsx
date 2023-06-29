import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

const getCollaborators = async (boardId: string) => {
  const response = await fetch(
    `/api/boards/collaborators/actual-collaborators?boardId=${boardId}`
  );
  const data = await response.json();
  return data.collaborators;
};

export function CollaboratorsList({ boardId }: string) {
  const [usersList, setUsersList] = useState([]);

  const { data: collaborators, isLoading } = useQuery({
    queryKey: ["collaborators", boardId],
    queryFn: async () => getCollaborators(boardId),
  });

  useEffect(() => {
    if (usersList.length > 0) {
      setUsersList(collaborators);
      console.log("userList", userList);
    }
  }, [usersList]);

  console.log("collaborators", collaborators);

  return (
    <>
      <CommandInput placeholder="Type a command or search..." />

      <CommandList>
        <CommandEmpty>No collaborators on this board</CommandEmpty>
        <CommandGroup heading="Collaborators">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}
