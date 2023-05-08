import Link from "next/link";
import type { User } from "@prisma/client";

type PosterOptionsProps = {
  prompt: string;
  user?: User | null;
  createdAt: string;
};

const PosterOptions = ({ prompt, user, createdAt }: PosterOptionsProps) => (
  <div className="mt-4 w-full flex-row truncate md:mt-0">
    <div className="w-full truncate text-3xl font-medium capitalize">
      {prompt}
    </div>
    {user ? (
      <div className="mt-4 font-extralight">
        By{" "}
        <Link
          href={`/profile/${user.username}`}
          className="font-medium hover:underline"
        >
          @{user.username}
        </Link>
      </div>
    ) : (
      ""
    )}
    <div className="font-extralight">Created on {createdAt}</div>
  </div>
);

export default PosterOptions;
