"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgePlusIcon, HeartIcon, LucideBookOpen } from "lucide-react";
import { useSession } from "next-auth/react";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

import SelectButton from "./select-button";

type TabsHeaderProps = {
  username: string;
  isCurrentUser?: boolean;
};

const getTabsValue = (pathname: string | null) => {
  switch (true) {
    case pathname?.includes("likes"):
      return "liked";
    case pathname?.includes("boards"):
      return "boards";
    default:
      return "created";
  }
};

const TabsHeader = ({ username, isCurrentUser }: TabsHeaderProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const value = getTabsValue(pathname);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
  const isAdmin = session?.user.role === "ADMIN";
  const showSelectButton = isCurrentUser ?? isAdmin;
  return (
    <div className="my-4 flex items-center justify-between space-x-3">
      <Tabs value={value} className="w-[300px]">
        <TabsList className="w-full">
          <Link href={`/profile/${username}`} className="w-1/3">
            <TabsTrigger value="created" className="w-full">
              <BadgePlusIcon className="mr-2 h-5 w-5 shrink-0" />
              New
            </TabsTrigger>
          </Link>
          <Link href={`/profile/${username}/likes`} className="w-1/3">
            <TabsTrigger value="liked" className="w-full">
              <HeartIcon className="mr-2 h-5 w-5 shrink-0" />
              Favorite
            </TabsTrigger>
          </Link>
          <Link href={`/profile/${username}/boards`} className="w-1/3">
            <TabsTrigger value="boards" className="w-full">
              <LucideBookOpen className="mr-2 h-5 w-5 shrink-0" />
              Boards
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      {showSelectButton && (
        <div className="flex text-center">
          <SelectButton />
        </div>
      )}
    </div>
  );
};

export default TabsHeader;
