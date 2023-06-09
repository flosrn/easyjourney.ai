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
      <div className="flex h-20 w-full">
        <div className="mx-2 flex h-full items-center justify-center">
          {image && (
            <Avatar className="h-16 w-16">
              <AvatarImage
                className=""
                src={image}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>{getFirstLetters(username)}</AvatarFallback>
            </Avatar>
          )}
        </div>

        <div className="ml-2 flex flex-col justify-center">
          <div className="font-bold">{name}</div>
          <div className="truncate text-sm">@{username}</div>
        </div>

        <div className="flex w-full justify-end">
          <div className="mt-2">
            <FollowButton userId={id} isFollowing={isFollowing} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedUser;
