"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import { CardDescription, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Icons } from "~/components/ui/icons";

import { cn } from "~/lib/classNames";
import { login } from "~/lib/login";

import logoBlackDesktop from "../../../public/images/logo/easyjourney_logo_black.svg";
import logoWhiteDesktop from "../../../public/images/logo/easyjourney_logo.svg";

type LoginDialogProps = {
  children?: React.ReactNode;
};

const LoginDialog = ({ children }: LoginDialogProps) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <Dialog>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="md:w-[400px]">
        <DialogHeader className="space-y-4 sm:text-center">
          <CardTitle className="text-2xl">
            <Image
              priority
              src={isDarkTheme ? logoWhiteDesktop : logoBlackDesktop}
              alt="Easyjourney.ai"
              className={cn("h-10 shrink-0")}
            />
          </CardTitle>
          <CardDescription>
            Sign in to generate your first poster
          </CardDescription>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <Button
            size="lg"
            variant="outline"
            onClick={async () => await login()}
            className="w-full"
          >
            <Icons.google className="mr-2" />
            Continue with Google
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
