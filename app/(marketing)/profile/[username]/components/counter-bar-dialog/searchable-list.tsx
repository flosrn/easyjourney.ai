import { Input } from "~/components/ui/input";

import SelectedUser from "./selected-user";

type SearchableListProps = {
  username: string;
};

const SearchableList = ({ list }) => {
  console.log("list", list);

  return (
    <>
      <Input />
      {list.map((user) => (
        <SelectedUser key={user.id} user={user} />
      ))}
    </>
  );
};
export default SearchableList;
