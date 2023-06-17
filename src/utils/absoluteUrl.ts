import { env } from "~/env.mjs";

const absoluteUrl = (path: string) => {
  console.log("env.NEXT_PUBLIC_URL :", env.NEXTAUTH_URL);
  return `${env.NEXTAUTH_URL}${path}`;
};

export default absoluteUrl;
