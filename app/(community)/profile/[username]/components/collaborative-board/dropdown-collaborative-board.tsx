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
