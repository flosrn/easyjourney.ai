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

const SettingsDialog = ({ open, openChangeHandler }: SettingsDialogProps) => {
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user.username);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = username && (await updateUserProfile(username));
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
        <Toaster />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
