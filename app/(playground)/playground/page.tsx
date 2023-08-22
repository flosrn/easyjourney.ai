import React from "react";

import { Tabs } from "~/components/ui/tabs";

import MainColumn from "./main-column";
import SideColumn from "./side-column";
import { DisplayMode } from "./store/displayStore";

export default async function CreatePage() {
  return (
    <div className="h-screen bg-background pt-[65px]">
      <Tabs
        defaultValue={DisplayMode.STACK}
        className="md:grid md:h-full md:grid-cols-[265px,minmax(auto,1fr)]"
      >
        <SideColumn />
        <MainColumn />
      </Tabs>
    </div>
  );
}
