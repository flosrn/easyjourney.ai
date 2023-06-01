"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";

const updateUserProfile = async ({ username }: string) => {
  const response = await fetch("/api/profile/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  return response.json();
};

export default function SettingsDialog({ title }) {
  const { data: session } = useSession();
  console.log("session", session);
  // const user = await getCurrentUser();
  // console.log("user", user);

  return (
    <Dialog>
      <DialogTrigger className="">{title}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modify your profile</DialogTitle>
          <DialogDescription>Personalize your profile</DialogDescription>
        </DialogHeader>

        <div>
          <Label htmlFor="pseudo">Username</Label>
          <Input
            id="pseudo"
            placeholder="Pseudo"
            value={session?.user.username ?? ""}
          />
        </div>
        <Button variant={}>Confirmer</Button>
      </DialogContent>
    </Dialog>
  );
}
