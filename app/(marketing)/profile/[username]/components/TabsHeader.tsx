"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgePlusIcon, HeartIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/Tabs";

import SelectButton from "./SelectButton";

type TabsHeaderProps = {
  username: string;
  isCurrentUser?: boolean;
};

const TabsHeader = ({ username, isCurrentUser }: TabsHeaderProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLikePage = pathname?.includes("likes");
  const value = isLikePage ? "liked" : "created";
  const isAdmin = session?.user.role === "ADMIN";
  const showSelectButton = (isCurrentUser || isAdmin) && !isLikePage;
  return (
    <div className="my-4 flex items-center justify-between space-x-3">
      <Tabs value={value} className="w-[263px]">
        <TabsList className="w-full">
          <Link href={`/profile/${username}`} className="w-1/2">
            <TabsTrigger value="created" className="w-full">
              <BadgePlusIcon className="mr-2 h-5 w-5 shrink-0" />
              New
            </TabsTrigger>
          </Link>
          <Link href={`/profile/${username}/likes`} className="w-1/2">
            <TabsTrigger value="liked" className="w-full">
              <HeartIcon className="mr-2 h-5 w-5 shrink-0" />
              Favorite
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
      {showSelectButton && <SelectButton />}
    </div>
  );
};

export default TabsHeader;
