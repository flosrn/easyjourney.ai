import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { ScrollArea } from "~/components/ui/scroll-area";

import { SelectedUser } from "./selected-users";

export function CollaboratorsList({ boardId, collaborators }) {
  const collaboratorsWithStatus = collaborators.map((collab) => ({
    ...collab,
    isCollaborator: true,
  }));
  console.log("collaboratorsWithStatus", collaboratorsWithStatus);

  return (
    <>
      <CommandInput placeholder="Type a command or search..." />
      <ScrollArea className="w-full" type="always">
        <CommandList>
          <CommandEmpty>No collaborators on this board</CommandEmpty>

          {collaboratorsWithStatus.map((user) => (
            <CommandItem key={user.id}>
              <SelectedUser
                name={user.name}
                username={user.username}
                image={user.image}
                id={user.id}
                boardId={boardId}
                isCollaborator={user.isCollaborator}
                collaborators={collaborators}
              />
            </CommandItem>
          ))}
        </CommandList>
      </ScrollArea>
    </>
  );
}
