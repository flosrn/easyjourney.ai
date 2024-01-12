"use client";

import React from "react";

import { Tabs } from "~/components/ui/tabs";

import { cn } from "~/lib/classNames";

import MainColumn from "./main-column";
import RightColumn from "./right-column";
import SideColumn from "./side-column";
import { useColumnStore } from "./store/columnStore";
import { DisplayMode } from "./store/displayStore";

export default function CreatePage() {
  const [showRightColumn] = useColumnStore((state) => [state.showRightColumn]);
  return (
    <div className="h-screen bg-background pt-[65px]">
      <Tabs
        defaultValue={DisplayMode.STACK}
        className={cn(
          "md:grid md:h-full",
          showRightColumn
            ? "md:grid-cols-[265px,minmax(auto,1fr),265px]"
            : "md:grid-cols-[265px,minmax(auto,1fr)]"
        )}
      >
        <SideColumn />
        <MainColumn />
        {showRightColumn && <RightColumn />}
      </Tabs>
    </div>
  );
}
