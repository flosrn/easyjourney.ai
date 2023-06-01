"use client";

import { useState } from "react";
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

const updateUserProfile = async ({ username }: string) => {
  const response = await fetch("/api/profile/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });
  console.log("response", response);
  return response.json();
};

export default function SettingsDialog({ title }) {
  const { data: session } = useSession();
  const [username, setUsername] = useState(session?.user.username);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await updateUserProfile(username);

      if (response.status === 400) {
        toast(response.message);
      }
      if (response.status === 405) {
        toast("suce mon zboub");
      }
    } catch {
      toast.error("failed to update profile");
    }
  };

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
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <Button variant="secondary" onClick={handleSubmit}>
          Confirmer
        </Button>
      </DialogContent>
    </Dialog>
  );
}
