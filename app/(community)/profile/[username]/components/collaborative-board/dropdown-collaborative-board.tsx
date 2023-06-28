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
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { AddCollaborators } from "./add-collaborators";
import { CollaboratorsList } from "./collaborators-list";

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
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="collaborators">collaborators</TabsTrigger>
              <TabsTrigger value="add">Add new</TabsTrigger>
            </TabsList>
            <TabsContent value="collaborators">
              <CollaboratorsList boardId={boardId} />
            </TabsContent>
            <TabsContent value="add">
              <AddCollaborators boardId={boardId} />
            </TabsContent>
          </Tabs>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
