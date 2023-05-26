import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { prisma } from "~/server/db/prisma";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";

// const getUserInfo = async () => {
//   await prisma.user.findUnique({
//     where: { username: session.user.username },
//   });
// };

export default async function SettingsDialog({ title }) {
  const { data: session } = await useSession();
  console.log("session", session);
  const [userInfo, setUserInfo] = useState(null);
  console.log("userInfo", userInfo);

  useEffect(() => {
    const getUserInfo = async () => {
      if (session) {
        const user = await prisma.user.findUnique({
          where: { username: session.user.username },
        });
        setUserInfo(user);
      }
    };
    getUserInfo();
  }, [session]);

  return (
    <Dialog>
      <DialogTrigger className="">{title}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modify your profile</DialogTitle>
          <DialogDescription>Personalize your profile</DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="picture">Profile Pic</Label>
          <Input id="picture" type="file" />
        </div>
        <div>
          <Label htmlFor="pseudo">Username</Label>
          <Input id="pseudo" placeholder="Pseudo" />

          <Label htmlFor="description">Description</Label>
          <Input id="description" placeholder="maximum 300char" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
