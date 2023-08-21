import React from "react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

import { cn } from "~/lib/classNames";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const SideColumn = ({ className }: SidebarProps) => (
  <aside className={cn("bg-background z-10 lg:mt-2", className)}>
    <div className="space-y-4">
      <ScrollArea className="h-screen">
        <div className="w-full">
          <div className="pb-4">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              Getting Started
            </h4>
            <div className="grid grid-flow-row auto-rows-max justify-start text-sm">
              <Button
                asChild
                variant="link"
                className="justify-start px-2 py-1"
              >
                <Link href="/dashboard">Posters</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="justify-start px-2 py-1"
              >
                <Link href="/dashboard/users">Users</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="justify-start px-2 py-1"
              >
                <Link href="/dashboard/search-posters">Search Posters</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="justify-start px-2 py-1"
              >
                <Link href="/dashboard/fetch">Fetch</Link>
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  </aside>
);

export default SideColumn;
