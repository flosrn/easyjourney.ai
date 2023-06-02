import React from "react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

import Header from "~/components/header/header";

import MainColumn from "./main-column";
import SideColumn from "./side-column";

type LayoutPageProps = {
  children: React.ReactNode;
};

const LayoutPage = async ({ children }: LayoutPageProps) => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const isAdmin = session.user.role === "ADMIN";
  if (!isAdmin) {
    return <div>Unauthorized</div>;
  }
  return (
    <>
      <Header expanded />
      <div className="h-[calc(100vh-57px)]">
        <div className="h-full bg-background">
          <div className="grid h-full lg:grid-cols-5">
            <SideColumn className="hidden p-4 lg:block xl:px-8" />
            <MainColumn>{children}</MainColumn>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutPage;
