import { Input } from "~/components/ui/input";

import SelectedUser from "./selected-user";

type SearchableListProps = {
  username: string;
};

const SearchableList = ({ list }) => {
  console.log("list", list);

  return (
    <>
      <Input className="mb-2" />
      <div className="grid grid-cols-1 gap-2">
        {list.map((user) => (
          <SelectedUser key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};
export default SearchableList;
