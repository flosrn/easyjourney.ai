import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

export function AddCollaborators({ boardId }) {
  const [search, setSearch] = useState("");
  console.log("search", search);

  const searchUser = async ({ queryKey }) => {
    const [_key, search] = queryKey;
    const response = await fetch(
      `/api/boards/collaborators/add/find-users?search=${search}`
    );
    const data = await response.json();
    console.log("data", data);
    return data.searchUsers;
  };

  const { data: users } = useQuery({
    queryKey: ["search-user", search],
    queryFn: searchUser,
    enabled: search.length > 0,
  });
  console.log("users", users);

  return (
    <>
      <CommandInput
        onValueChange={setSearch}
        placeholder="Search username or email..."
      />

      <CommandList>
        <CommandEmpty>No email or username mathching</CommandEmpty>
        {users?.map((user) => (
          <CommandItem key={user.id} className="h-10 truncate">
            <div>{user.username}</div>
          </CommandItem>
        ))}
      </CommandList>
    </>
  );
}
