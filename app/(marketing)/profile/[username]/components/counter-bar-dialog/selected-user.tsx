import Image from "next/image";
import { Link } from "lucide-react";

const SelectedUser = ({ user }) => {
  return (
    <>
      <div className="flex h-20 w-full rounded-md border-2">
        <div className="flex h-full w-3/12 items-center justify-center">
          <Image
            src={user.image}
            alt={user.name}
            width={70}
            height={70}
            unoptimized
            className=" rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-bold">{user.name}</div>
          <div className="truncate text-sm">@{user.username}</div>
        </div>
      </div>
    </>
  );
};

export default SelectedUser;
