"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { Separator } from "~/components/ui/separator";

type MainColumnProps = {
  children: React.ReactNode;
};

const MainColumn = ({ children }: MainColumnProps) => {
  const { data: session } = useSession();
  const username = session?.user.username;

  const message = "";

  return (
    <main className="relative col-span-3 flex flex-col lg:col-span-4 lg:border-l">
      <div className="h-full grow px-4 py-6 xl:px-8">
        <div className="h-full flex-col border-none p-0 data-[state=active]:flex">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Dashboard
              </h2>
              <p className="text-sm text-muted-foreground">
                Welcome back, <span className="text-primary">{username}</span>!
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          {children}
        </div>
      </div>
      <div className="flex-center sticky bottom-0 h-6 border-t bg-background">
        <p className="px-4 text-xs">{message}</p>
      </div>
      <Toaster position="bottom-right" />
    </main>
  );
};

export default MainColumn;
