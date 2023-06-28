import { useMutation, useQuery } from "@tanstack/react-query";
import { UserPlus2Icon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export function DropdownCollaborativeBoard({ children, boardId }) {
  const getCollaborators = async ({ boardId }) => {
    const response = await fetch(`/api/boards/${boardId}/collaborators`);
    return response.json();
  };

  const addCollaborator = async ({ boardId }) => {
    const response = await fetch(`/api/boards/${boardId}/collaborators`);
    return response.json();
  };

  const collaborators = useQuery({
    queryKey: ["collaborators", boardId],
    queryFn: async () => getCollaborators(boardId),
  });

  const addCollaboratorMutation = useMutation(addCollaborator);

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="">
        <Command>
          <div className="flex">
            <CommandInput placeholder="Type a command or search..." />
            <Button>
              <UserPlus2Icon />
            </Button>
          </div>
          <CommandList>
            <CommandEmpty>No collaborators on this board</CommandEmpty>
            <CommandGroup heading="Collaborators">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
