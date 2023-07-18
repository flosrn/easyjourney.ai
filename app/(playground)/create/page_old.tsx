import React from "react";

import MainColumn from "./main-column";
import SideColumn from "./side-column";

export default async function CreatePage() {
  return (
    <div className="h-screen bg-background pt-[57px]">
      <div className="lg:grid lg:h-full lg:grid-cols-5">
        <SideColumn className="hidden lg:block" />
        <MainColumn />
      </div>
    </div>
  );
}
