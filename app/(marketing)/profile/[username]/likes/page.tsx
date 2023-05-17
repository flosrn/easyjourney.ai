import type { User } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db/prisma";

type UserProfileProps = {
  params: { username: User["username"] };
};

const Likes = async (username) => {
  return <div>TEST</div>;
};

export default Likes;
