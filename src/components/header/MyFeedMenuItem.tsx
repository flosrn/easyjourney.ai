"useClient";

import React from "react";
import { useSession } from "next-auth/react";

type ListItemProps = {
  title: string;
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
  className?: string;
};

type MyFeedMenuItemProps = {
  ListItem: React.ComponentType<ListItemProps>;
};

export default function MyFeedMenuItem({ ListItem }: MyFeedMenuItemProps) {
  const { data: session, status } = useSession();

  const isUserConnected = status === "authenticated";
  return (
    <ListItem
      title="My feed"
      href="/posters/my-feed"
      disabled={!isUserConnected}
    >
      Discover all the posters made from peoples you follow
    </ListItem>
  );
}
