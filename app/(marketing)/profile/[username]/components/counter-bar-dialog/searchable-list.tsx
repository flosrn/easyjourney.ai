"use client";

import React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";

import type { UserWithFollowers } from "../../types/user";
import SelectedUser from "./selected-user";

type SearchableListProps = {
  list: UserWithFollowers[];
  actualUser: string;
  isLoading: boolean;
};

const UserSkeleton = () => (
  <div className="flex h-16 items-center space-x-4 px-3">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

const SearchableList = ({
  list,
  actualUser,
  isLoading,
}: SearchableListProps) => {
  return (
    <>
      <Command className="h-full">
        <CommandInput placeholder="Search for a user" />
        <ScrollArea className="h-[300px] pr-3">
          <CommandList className="max-h-full ">
            {!isLoading && <CommandEmpty>No user found.</CommandEmpty>}
            <CommandGroup className="pt-2">
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <UserSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <>
                  {list.length > 0 &&
                    list.map((user) => (
                      <CommandItem key={user.id}>
                        <SelectedUser
                          key={user.id}
                          user={user}
                          actualUser={actualUser}
                        />
                      </CommandItem>
                    ))}
                </>
              )}
            </CommandGroup>
          </CommandList>
        </ScrollArea>
      </Command>
    </>
  );
};
export default SearchableList;
