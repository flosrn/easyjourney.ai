"use client";

import React from "react";

import { ScrollArea } from "~/components/ui/scroll-area";

import { cn } from "~/lib/classNames";
import { siteConfig } from "~/config/site";

import MenuItem from "./components/menu/menu-item";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const SideColumn = ({ className }: SidebarProps) => (
  <aside className={cn("bg-background z-10 lg:mt-2", className)}>
    <div className="space-y-4">
      <ScrollArea className="h-screen">
        <div className="w-full">
          <div className="pb-4">
            <div className="grid grid-flow-row auto-rows-max justify-start text-sm">
              {siteConfig.adminMenu.map((item) => (
                <MenuItem key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  </aside>
);

export default SideColumn;
