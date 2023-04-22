import Link from "next/link";
import type { User } from "@prisma/client";

type PosterOptionsProps = {
  prompt: string;
  user?: User | null;
  createdAt: string;
};

export default function PosterOptions({
  prompt,
  user,
  createdAt,
}: PosterOptionsProps) {
  let trimmedPrompt = prompt.slice(0, 50);
  if (prompt.length > 50) {
    trimmedPrompt += "...";
  }
  console.log("id");

  return (
    <>
      <div className="mt-4 flex-row md:mt-0">
        <div className="text-3xl font-medium capitalize">{trimmedPrompt}</div>
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
    </>
  );
}
