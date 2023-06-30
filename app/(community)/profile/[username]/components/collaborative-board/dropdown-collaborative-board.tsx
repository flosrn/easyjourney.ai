import { useEffect, useState } from "react";
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

const getCollaborators = async (boardId: string) => {
  const response = await fetch(
    `/api/boards/collaborators/actual-collaborators?boardId=${boardId}`
  );
  const data = await response.json();
  console.log("data", data);
  return data.users;
};

export function DropdownCollaborativeBoard({ children, boardId }) {
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

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="h-96">
        <Command>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="collaborators">
                collaborators
              </TabsTrigger>
              <TabsTrigger className="w-full" value="add">
                Add new
              </TabsTrigger>
            </TabsList>
            <TabsContent value="collaborators">
              <CollaboratorsList
                boardId={boardId}
                collaborators={collaboratorsList}
              />
            </TabsContent>
            <TabsContent value="add">
              <AddCollaborators
                boardId={boardId}
                collaborators={collaboratorsList}
              />
            </TabsContent>
          </Tabs>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
