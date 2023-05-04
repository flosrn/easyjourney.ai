import React from "react";

import MainColumn from "./MainColumn";
import SideColumn from "./SideColumn";

export default async function CreatePage() {
  return (
    <div className="h-[calc(100vh-57px)]">
      <div className="bg-background h-full">
        <div className="grid h-full lg:grid-cols-5">
          <SideColumn className="bg-background z-10 hidden p-4 lg:block xl:px-8" />
          <MainColumn />
        </div>
      </div>
    </div>
  );
}
