"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/Tabs";

type TabsHeaderProps = {
  username: string;
};

const TabsHeader = ({ username }: TabsHeaderProps) => {
  const pathname = usePathname();
  const defaultValue = pathname?.includes("likes") ? "liked" : "created";
  return (
    <Tabs value={defaultValue} className="mt-4 w-full">
      <TabsList className="w-full">
        <Link href={`/profile/${username}`} className="w-1/2">
          <TabsTrigger value="created" className="w-full">
            New
          </TabsTrigger>
        </Link>
        <Link href={`/profile/${username}/likes`} className="w-1/2">
          <TabsTrigger value="liked" className="w-full">
            Favorite
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};

export default TabsHeader;
