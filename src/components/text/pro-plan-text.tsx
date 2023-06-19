"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { cn } from "~/lib/classNames";

type ProPlanTextProps = {
  children?: React.ReactNode;
};

const ProPlanText = ({ children }: ProPlanTextProps) => {
  const { data: session } = useSession();
  const isPro = session?.user.plan === "PRO";

  return (
    <strong className={cn({ "text-gradient-hyper animate-text": isPro })}>
      {children}
    </strong>
  );
};

export default ProPlanText;
