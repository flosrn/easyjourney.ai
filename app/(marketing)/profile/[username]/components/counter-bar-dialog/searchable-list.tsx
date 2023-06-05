import { arrayOutputType } from "zod";

import { Input } from "~/components/ui/input";

import SelectedUser from "./selected-user";

type SearchableListProps = {
  list: any;
  actualUser: string;
};

const SearchableList = ({ list, actualUser }) => {
  console.log("list", list);

  return (
    <>
      <Input className="mb-2" placeholder="Search" />
      <div className="grid max-h-[60vh] grid-cols-1 gap-2 overflow-auto">
        {list ? (
          list.map((user) => (
            <SelectedUser key={user.id} user={user} actualUser={actualUser} />
          ))
        ) : (
          <div>Hum... it's empty !</div>
        )}
      </div>
    </>
  );
};
export default SearchableList;
