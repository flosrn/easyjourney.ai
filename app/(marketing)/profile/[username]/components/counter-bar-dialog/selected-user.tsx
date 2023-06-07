import getFirstLetters from "~/utils/getFirstLetter";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

import FollowButton from "../follow-button";

const SelectedUser = ({ user, actualUser }) => {
  const isFollowing = user.followers.some(
    (follower) => follower.followerId === actualUser
  );
  const { image, username, name, id } = user;

  return (
    <>
      <div className="flex h-20 w-full ">
        <div className="flex h-full w-5/6">
          <div className="flex h-full w-1/3 items-center justify-center">
            {image && (
              <Avatar className="mr-2 h-7 w-7 cursor-pointer">
                <AvatarImage
                  className="h-full"
                  src={image}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback>{getFirstLetters(username)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="font-bold">{name}</div>
          <div className="truncate text-sm">@{username}</div>
        </div>

        <div className="flex w-full justify-end border-2">
          <div className="">
            <FollowButton userId={id} isFollowing={isFollowing} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedUser;
