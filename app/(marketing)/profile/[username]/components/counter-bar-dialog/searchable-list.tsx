import React, { useEffect, useState } from "react";

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
import { Skeleton } from "~/components/ui/skeleton";

import SelectedUser from "./selected-user";

type SearchableListProps = {
  list: any;
  actualUser: string;
};

const SearchableList = ({ list, actualUser }: SearchableListProps) => {
  console.log("list", list);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (list) {
      setIsLoading(false);
    }
  }, [list]);

  return (
    <>
      <Command className="flex h-full ">
        <CommandInput placeholder="Search for a user" />
        <CommandList className="h-full max-h-[58vh] grow">
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup className=" ">
            {list.lenght > 0 ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              list.map((user: any) => (
                <CommandItem key={user.id}>
                  <SelectedUser
                    key={user.id}
                    user={user}
                    actualUser={actualUser}
                  />
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
};
export default SearchableList;
