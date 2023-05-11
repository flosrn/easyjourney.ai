import React from "react";
import { getServerAuthSession } from "~/server/auth";

import MainColumn from "./MainColumn";
import SideColumn from "./SideColumn";
import { redirect } from "next/navigation";

export default async function CreatePage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="h-[calc(100vh-57px)]">
      <div className="bg-background h-full">
        <div className="grid h-full lg:grid-cols-5">
          <SideColumn className="hidden p-4 lg:block xl:px-8" />
          <MainColumn />
        </div>
      </div>
    </div>
  );

}
