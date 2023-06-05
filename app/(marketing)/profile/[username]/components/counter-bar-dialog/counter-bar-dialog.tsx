import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import SearchableList from "./searchable-list";

type counterBarDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValue: string;
  username: string;
};

const getFollowersUserList = async (username: string) => {
  const response = await fetch(`/api/profile/followers?username=${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data.data;
};

const getFollowedUserList = async (username: string) => {
  const response = await fetch(`/api/profile/following?username=${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return data.data;
};

const CounterBarDialog = ({
  open,
  setOpen,
  defaultValue,
  username,
}: counterBarDialogProps) => {
  const [followersUserList, setFollowersUserList] = useState([]);
  const [followedUsersList, setFollowedUsersList] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const followers = await getFollowersUserList(username);
      setFollowersUserList(followers);
      const followed = await getFollowedUserList(username);
      setFollowedUsersList(followed);
      console.log("followed", followed);
    };
    fetchFollowers();
  }, [username]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader></DialogHeader>
        <Tabs defaultValue={defaultValue} className="w-full">
          <TabsList className="flex w-full">
            <TabsTrigger value="likes" className="flex-1">
              Likes
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex-1">
              Followers
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="likes">
            <SearchableList list={followersUserList} />
          </TabsContent>
          <TabsContent value="followers">
            <SearchableList list={followersUserList} />
          </TabsContent>
          <TabsContent value="following">
            <SearchableList list={followedUsersList} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CounterBarDialog;
