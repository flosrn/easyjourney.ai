import { useQuery } from "@tanstack/react-query";

import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

export function CollaboratorsList({ boardId }) {
  const getCollaborators = async ({ boardId }) => {
    const response = await fetch(`/api/boards/${boardId}/collaborators`);
    return response.json();
  };

  const collaborators = useQuery({
    queryKey: ["collaborators", boardId],
    queryFn: async () => getCollaborators(boardId),
  });
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
