"use client";

import * as React from "react";
import Link from "next/link";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/Tabs";

import type { NavItem } from "~/types/nav";

type MainNavProps = {
  items?: NavItem[];
};

const MainNav = ({ items }: MainNavProps) => {
  return (
    <Tabs className="flex w-[400px] justify-center">
      <TabsList>
        {items?.map((item) => (
          <TabsTrigger key={item.title} value={item.title}>
            <Link href={item.href}>{item.title}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default MainNav;
