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

import { SelectedUsers } from "./selected-users";

const searchUser = async (search: string) => {
  const response = await fetch(
    `/api/boards/collaborators/add/find-users?search=${search}`
  );
  const data = await response.json();
  return data.searchUsers;
};

export function AddCollaborators({ boardId }) {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState([]);
  console.log("search", search);

  const { data: users, isLoading } = useQuery({
    queryKey: ["search-user", search],
    queryFn: async () => searchUser(search),
    enabled: search.length > 0,
  });
  console.log("users", users);

  useEffect(() => {
    if (users && users.length > 0) {
      setUserList(users);
      console.log("userList", userList);
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
            <SelectedUsers
              key={user.id}
              name={user.name}
              username={user.username}
              image={user.image}
              id={user.id}
            />
          );
        })
      ) : (
        <div>Y a rien</div>
      )}
    </>
  );
}
