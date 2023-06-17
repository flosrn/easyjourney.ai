import { env } from "~/env.mjs";

const absoluteUrl = (path: string) => {
  console.log("env.NEXT_PUBLIC_URL :", env.NEXT_PUBLIC_URL);
  return `${env.NEXT_PUBLIC_URL}${path}`;
};

export default absoluteUrl;
