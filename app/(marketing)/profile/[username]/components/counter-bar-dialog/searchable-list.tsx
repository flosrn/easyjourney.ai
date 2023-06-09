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
  isLoading: boolean;
};

const SearchableList = ({
  list,
  actualUser,
  isLoading,
}: SearchableListProps) => {
  return (
    <>
      <Command className="h-full">
        <CommandInput placeholder="Search for a user" />
        <CommandList className="h-full min-h-[700px]">
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup className=" ">
            {isLoading ? (
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
