"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BadgePlusIcon, HeartIcon } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/Tabs";

type TabsHeaderProps = {
  username: string;
};

const TabsHeader = ({ username }: TabsHeaderProps) => {
  const pathname = usePathname();
  const value = pathname?.includes("likes") ? "liked" : "created";
  return (
    <Tabs value={value} className="mt-10 w-full">
      <TabsList className="w-full">
        <Link href={`/profile/${username}`} className="w-1/2">
          <TabsTrigger value="created" className="w-full">
            <BadgePlusIcon className="mr-2 h-5 w-5" />
            New
          </TabsTrigger>
        </Link>
        <Link href={`/profile/${username}/likes`} className="w-1/2">
          <TabsTrigger value="liked" className="w-full">
            <HeartIcon className="mr-2 h-5 w-5" />
            Favorite
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};

export default TabsHeader;
