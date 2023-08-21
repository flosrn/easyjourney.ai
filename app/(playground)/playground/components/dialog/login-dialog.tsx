"use client";

import type { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { LogInIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { CardDescription, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";

type LoginDialogProps = {
  isOpen: boolean;
  openHandler: Dispatch<SetStateAction<boolean>>;
};

const LoginDialog = ({ isOpen, openHandler }: LoginDialogProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push(`/api/auth/signin?callbackUrl=/playground`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={openHandler}>
      <DialogContent className="md:w-[400px]">
        <DialogHeader className="space-y-1 sm:text-center">
          <CardTitle className="text-2xl">Authentication</CardTitle>
          <CardDescription>
            You need to login to generate a poster.
          </CardDescription>
        </DialogHeader>
        <DialogFooter className="">
          <Button onClick={handleLogin} className="w-full">
            <LogInIcon className="mr-2 h-4 w-4" />
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
