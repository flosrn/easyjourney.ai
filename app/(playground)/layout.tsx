import React from "react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

import PlaygroundHeader from "~/components/header/playground-header";

type LayoutPageProps = {
  children: React.ReactNode;
};

const LayoutPage = async ({ children }: LayoutPageProps) => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/playground");
  }

  return (
    <>
      <PlaygroundHeader />
      {children}
    </>
  );
};

export default LayoutPage;
