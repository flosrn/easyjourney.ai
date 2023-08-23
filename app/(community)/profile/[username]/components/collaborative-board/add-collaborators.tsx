import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { set } from "date-fns";

import { Button } from "~/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Skeleton } from "~/components/ui/skeleton";

import { SelectedUser } from "./selected-users";

const searchUser = async (search: string) => {
  const response = await fetch(
    `/api/boards/collaborators/add/find-users?search=${search}`
  );
  const data = await response.json();
  return data.searchUsers;
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

export function AddCollaborators({ boardId, collaborators }) {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);

  const { data: users, isLoading } = useQuery({
    queryKey: ["search-user", search],
    queryFn: async () => searchUser(search),
    enabled: search.length > 0,
  });

  useEffect(() => {
    if (users && users.length > 0) {
      const userListWithCollabStatus = users.map((user) => {
        return {
          ...user,
          isCollaborator: collaborators.some((collab) => collab.id === user.id),
        };
      });
      setUserList(userListWithCollabStatus);
    }
  }, [users]);

  return (
    <>
      <CommandInput
        onValueChange={setSearch}
        placeholder="Search username or email..."
      />

      {userList.length > 0 ? (
        userList.map((user) => {
          return (
            <SelectedUser
              key={user.id}
              name={user.name}
              username={user.username}
              image={user.image}
              id={user.id}
              boardId={boardId}
              isCollaborator={user.isCollaborator}
            />
          );
        })
      ) : (
        <>
          {isLoading ? (
            <UserSkeleton />
          ) : (
            <>
              {search.length > 0 ? (
                <CommandEmpty>No user found.</CommandEmpty>
              ) : (
                <CommandEmpty>Search for a user</CommandEmpty>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
