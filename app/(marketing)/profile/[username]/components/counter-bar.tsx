"use client";

type counterBarProps = {
  totalPosters: number;
  totalLikes: number;
  totalFollowers: number;
  totalFollowing: number;
};

export const CounterBar = ({
  totalPosters,
  totalLikes,
  totalFollowers,
  totalFollowing,
}: counterBarProps) => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{totalPosters}</h2>
        <p className="text-gray-500">Posters</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{totalLikes}</h2>
        <p className="text-gray-500">Likes</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{totalFollowers}</h2>
        <p className="text-gray-500">Followers</p>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{totalFollowing}</h2>
        <p className="text-gray-500">Following</p>
      </div>
    </div>
  );
};
