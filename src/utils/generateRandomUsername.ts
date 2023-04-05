import { generateFromEmail } from "unique-username-generator";

export const generateRandomUsername = (email: string) => {
  const username = generateFromEmail(email, 3);
  return username;
};
