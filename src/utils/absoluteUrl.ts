import { env } from "~/env.mjs";

const absoluteUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_URL}${path}`;
};

export default absoluteUrl;
