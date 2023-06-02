"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

import { Button } from "~/components/ui/Button";
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

const updateUserProfile = async (username: string) => {
  const response = await fetch("/api/profile/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  const data = await response.json();
  return data;
};

export default function SettingsDialog({ title }) {
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user.username);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = username && (await updateUserProfile(username));
      if (data.status === 400) {
        toast.error(data.message);
      }
      if (data.status === 405) {
        toast("suce mon zboub");
      }
      if (data.status === 200) {
        toast.success("Profile successfully updated!");
      }
    } catch (error: unknown) {
      toast.error(`failed to update profile: ${error}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{title}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modify your profile</DialogTitle>
          <DialogDescription>Personalize your profile</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <Button variant="secondary" onClick={handleSubmit}>
          Confirmer
        </Button>
      </DialogContent>
    </Dialog>
  );
}
