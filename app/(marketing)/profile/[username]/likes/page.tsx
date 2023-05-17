import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

const getPosterLikes = async (username) => {
  const response = await prisma.user.findUnique({
    where: { username },
    include: {
      posters: {
        orderBy: { createdAt: "desc" },
        include: { likes: true },
      },
    },
  });
};

type UserProfileProps = {
  params: { username: User["username"] };
};

const Likes = async (username) => {
  const session = await getServerAuthSession();
  const user = await getPosterLikes(username);
  console.log("user :", user);

  const isMe: boolean = session?.user.id === user.id;

  return (
    <div>
      <div className="container max-w-4xl">testing</div>
    </div>
  );
};

export default Likes;
