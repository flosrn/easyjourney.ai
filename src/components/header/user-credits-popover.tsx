"use client";

import React from "react";
import { GemIcon, Info } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Label } from "~/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";

const UserCreditsPopover = () => {
  const { data: session, update } = useSession();

  const credits = session?.user.credits ?? 0;
  const freeCredits = session?.user.freeCredits ?? 0;
  const totalCredits = credits + freeCredits;

  const refreshSession = async () => {
    await update();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={refreshSession}
          className="shrink-0 space-x-1 rounded-3xl px-2"
        >
          <span className="">{totalCredits}</span>
          <GemIcon className="h-4 w-4 shrink-0 text-violet-400" />
          <span className="sr-only">Open credits popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={10} align="end" className="w-80">
        <div className="grid gap-2">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Credits</h4>
            <p className="text-sm text-muted-foreground">
              Your total credits. You can use them to generate posters.
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-4">
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex select-none">
                    <Label>Daily Credits</Label>
                    <Info size={13} color="grey" className="ml-1" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  Daily credits are added to your account every day at 08:00.
                </HoverCardContent>
              </HoverCard>
              <span className="font-bold text-violet-400">{credits}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex select-none">
                    <Label>Free Credits</Label>
                    <Info size={13} color="grey" className="ml-1" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  Free credits are added to your account when you perform
                  certain actions, such as sharing myposter.ai on social media
                  or inviting friends.
                </HoverCardContent>
              </HoverCard>
              <span className="font-bold text-green-400">{freeCredits}</span>
            </div>
          </div>
          <span className="text-right text-xs italic text-muted-foreground/50">
            1 credit = 1 generation.
          </span>
          <Separator />
          <div className="mt-2">
            <Button href="/pricing" variant="outline" className="w-full">
              Upgrade plan
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserCreditsPopover;
