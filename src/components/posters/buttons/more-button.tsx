"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MoreVerticalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Switch } from "~/components/ui/switch";

type MoreButtonProps = {
  posterId: string;
  userId: string;
  isPublic: boolean;
};

const makePosterPublic = async (posterId: string, isPublic: boolean) => {
  const response = await fetch(`/api/posters/${posterId}/public`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isPublic }),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }
  const data = await response.json();
  return data;
};

const MoreButton = ({
  posterId,
  userId,
  isPublic: isPublicInitial,
}: MoreButtonProps) => {
  const [isPublic, setIsPublic] = useState(isPublicInitial);
  const { data: session } = useSession();
  const isOwner = session?.user.id === userId;

  const { mutate } = useMutation({
    mutationFn: async () => makePosterPublic(posterId, isPublic),
    onMutate: () => {
      setIsPublic((prev) => !prev);
    },
    onSuccess: (posterIsPublic) => {
      toast.success(
        `Your poster is now ${posterIsPublic ? "public" : "private"}`
      );
    },
    onError: () => {
      setIsPublic((prev) => !prev);
      toast.error("Something went wrong");
    },
  });

  if (!isOwner) return null;

  const handleCheckedChange = async () => {
    await mutate();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">
          <MoreVerticalIcon className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={0}
        alignOffset={0}
        side="left"
        align="start"
        className="w-64"
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Poster property</h4>
            <p className="text-sm text-muted-foreground">
              Make this posters private or public
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="isPublic" className="text-md">
                Public
              </Label>
              <Switch
                id="isPublic"
                checked={isPublic}
                onCheckedChange={handleCheckedChange}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <p className="text-xs text-muted-foreground">
              {isPublic
                ? "All users can see this poster"
                : "Only you can see this poster"}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoreButton;
