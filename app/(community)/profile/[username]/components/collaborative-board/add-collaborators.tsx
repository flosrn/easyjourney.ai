import { Button } from "~/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

export function AddCollaborators({ boardId }) {
  return (
    <>
      <CommandInput placeholder="Type a command or search..." />

      <CommandList>
        <CommandEmpty>Nobody was found</CommandEmpty>
        <CommandGroup heading="Collaborators">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}
