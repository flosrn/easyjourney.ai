"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import LoginDialog from "~/components/dialog/login-dialog";
import { Button } from "~/components/ui/button";

type CreateButtonProps = {
  text?: string;
};

const CreateButton = ({ text }: CreateButtonProps) => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <LoginDialog>
        <Button>{text}</Button>
      </LoginDialog>
    );
  }
  return (
    <Button asChild>
      <Link href="/playground">{text}</Link>
    </Button>
  );
};

export default CreateButton;
