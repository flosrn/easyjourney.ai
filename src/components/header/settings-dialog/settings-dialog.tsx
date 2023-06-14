"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type SettingsDialogProps = {
  open: boolean;
  openChangeHandler: (isOpen: boolean) => void;
};

type DataProfileProps = {
  username: string;
  name: string;
};

const updateUserProfile = async ({ username, name }: DataProfileProps) => {
  const response = await fetch("/api/profile/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, name }),
  });
  const data = await response.json();
  return data;
};

const SettingsDialog = ({ open, openChangeHandler }: SettingsDialogProps) => {
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user.username);
  const [name, setName] = useState(session?.user.name);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = username && (await updateUserProfile({ username, name }));
      if (data.status === 405) {
        toast.error("This username is already taken");
      }
      if (data.status === 400) {
        toast.error(data.message);
      }
      if (data.status === 200) {
        toast.success("Your profile has been successfully updated");
      }
    } catch (error: unknown) {
      toast.error(`failed to update profile: ${error}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your account settings</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={handleNameChange}
              className="col-span-3"
            />
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="col-span-3"
            />
          </div>
        </div>
        <Button variant="secondary" onClick={handleSubmit}>
          Confirmer
        </Button>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
