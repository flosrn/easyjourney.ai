import { Input } from "~/components/ui/input";

import SelectedUser from "./selected-user";

type SearchableListProps = {
  username: string;
};

const SearchableList = ({ list }) => {
  return (
    <>
      <Input />
      <div></div>
    </>
  );
};
export default SearchableList;
