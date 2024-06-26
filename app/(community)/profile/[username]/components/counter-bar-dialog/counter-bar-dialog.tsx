"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import SearchableList from "./searchable-list";

type counterBarDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValue: string;
  username: string;
  actualUser: string;
};

const getFollowersUserList = async (username: string) => {
  const response = await fetch(`/api/profile/followers?username=${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { followerUsers } = await response.json();

  return followerUsers;
};

const getFollowedUserList = async (username: string) => {
  const response = await fetch(`/api/profile/following?username=${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { followingUsers } = await response.json();

  return followingUsers;
};

const CounterBarDialog = ({
  open,
  setOpen,
  defaultValue,
  username,
  actualUser,
}: counterBarDialogProps) => {
  const followersQuery = useQuery({
    queryKey: ["followers", username],
    queryFn: async () => getFollowersUserList(username),
    enabled: open,
  });
  const followingQuery = useQuery({
    queryKey: ["following", username],
    queryFn: async () => getFollowedUserList(username),
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80vh] px-2 sm:px-6">
        <Tabs defaultValue={defaultValue} className="h-full w-full ">
          <TabsList className="mt-2 flex w-full">
            <TabsTrigger value="followers" className="flex-1">
              Followers
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="followers">
            <SearchableList
              list={followersQuery.data}
              actualUser={actualUser}
              isLoading={followersQuery.isLoading}
            />
          </TabsContent>
          <TabsContent value="following">
            <SearchableList
              list={followingQuery.data}
              actualUser={actualUser}
              isLoading={followingQuery.isLoading}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CounterBarDialog;
