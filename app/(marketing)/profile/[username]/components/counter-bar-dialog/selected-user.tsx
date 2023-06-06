import Image from "next/image";
import { Link } from "lucide-react";

import FollowButton from "../follow-button";

const SelectedUser = ({ user, actualUser }) => {
  console.log("user", user);
  console.log("actualUser", actualUser);
  const isFollowing = user.followers.some(
    (follower) => follower.followerId === actualUser
  );

  return (
    <>
      <div className="flex h-20 w-full ">
        <div className="flex h-full w-5/6">
          <div className="flex h-full w-1/3 items-center justify-center">
            <Image
              src={user.image}
              alt={user.name}
              width={70}
              height={70}
              unoptimized
              className=" rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="font-bold">{user.name}</div>
          <div className="truncate text-sm">@{user.username}</div>
        </div>

        <div className="flex w-full justify-end border-2">
          <div className="">
            <FollowButton userId={user.id} isFollowing={isFollowing} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedUser;
