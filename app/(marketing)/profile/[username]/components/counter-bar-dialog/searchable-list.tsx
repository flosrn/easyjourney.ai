import { arrayOutputType } from "zod";

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
import { Input } from "~/components/ui/input";

import SelectedUser from "./selected-user";

type SearchableListProps = {
  list: any;
  actualUser: string;
};

const SearchableList = ({ list, actualUser }: SearchableListProps) => {
  console.log("list", list);

  return (
    <>
      <Command>
        <CommandInput placeholder="Search for a user" />
        <CommandList>
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {list ? (
              list.map((user: any) => (
                <CommandItem key={user.id}>
                  <SelectedUser
                    key={user.id}
                    user={user}
                    actualUser={actualUser}
                  />
                </CommandItem>
              ))
            ) : (
              <div>Hum... it's empty !</div>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};
export default SearchableList;
