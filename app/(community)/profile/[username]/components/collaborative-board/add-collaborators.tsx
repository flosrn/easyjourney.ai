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

  const addCollaborator = async ({ boardId }) => {
    const response = await fetch(`/api/boards/${boardId}/collaborators/add`);
    return response.json();
  };

  const searchUser = async ({ queryKey }) => {
    const [_key, search] = queryKey;
    const response = await fetch(
      `/api/boards/collaborators/add/find-users?search=${search}`
    );
    console.log("response", response);
    return response.json();
  };

  const { data: users } = useQuery({
    queryKey: ["search-user", search],
    queryFn: searchUser,
    enabled: search.length > 0,
  });

  return (
    <>
      <CommandInput
        onValueChange={setSearch}
        placeholder="search for a username..."
      />

      <CommandList>
        <CommandEmpty></CommandEmpty>
      </CommandList>
    </>
  );
}
