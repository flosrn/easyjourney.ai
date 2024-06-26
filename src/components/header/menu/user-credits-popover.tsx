"use client";

import React from "react";
import Link from "next/link";
import { SubscriptionPlan } from "@prisma/client";
import { GemIcon, Info } from "lucide-react";
import { useSession } from "next-auth/react";

import ProPlanText from "~/components/text/pro-plan-text";
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

type UserCreditsPopoverProps = {
  sideOffset?: number;
  alignOffset?: number;
};

const UserCreditsPopover = ({
  sideOffset = 15,
  alignOffset = -57,
}: UserCreditsPopoverProps) => {
  const { data: session, update } = useSession();

  const plan = session?.user.plan ?? SubscriptionPlan.FREE;
  const isFree = plan === SubscriptionPlan.FREE;
  const credits = session?.user.credits ?? 0;
  const freeCredits = session?.user.freeCredits ?? 0;
  const totalCredits = credits + freeCredits;

  const refreshSession = async () => {
    await update();
  };

  if (!session?.user) return null;

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
      <PopoverContent
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        align="end"
        className="w-80 p-0"
      >
        <div className="grid">
          <div className="space-y-2 p-1">
            <h4 className="select-none px-2 py-1.5 text-sm font-semibold">
              Credits
            </h4>
          </div>
          <Separator className="bg-muted" />
          <div className="px-1 py-2">
            <p className="px-2 text-sm text-muted-foreground">
              Your total credits. You can use them to generate posters.
            </p>
          </div>
          <Separator className="bg-muted" />
          <div className="py-2">
            <div className="grid gap-2 p-1">
              <div className="mb-2 px-2 text-sm text-muted-foreground">
                You are on <ProPlanText>{plan}</ProPlanText> plan
              </div>
              <div className="flex items-center justify-between px-2">
                <HoverCard>
                  <HoverCardTrigger>
                    <div className="flex select-none">
                      <Label>{isFree ? "Daily" : "Monthly"} Credits</Label>
                      <Info size={13} color="grey" className="ml-1" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    {isFree ? "5 daily" : "500 monthly"} credits are added to
                    your account every{" "}
                    {isFree ? "day on FREE plan" : "month on PRO plan"}.
                  </HoverCardContent>
                </HoverCard>
                <span className="font-bold text-violet-400">{credits}</span>
              </div>
              <div className="flex items-center justify-between px-2">
                <HoverCard>
                  <HoverCardTrigger>
                    <div className="flex select-none">
                      <Label>Free Credits</Label>
                      <Info size={13} color="grey" className="ml-1" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    Free credits are added to your account when you perform
                    certain actions, such as sharing easyjourney on social media
                    or inviting friends.
                  </HoverCardContent>
                </HoverCard>
                <span className="font-bold text-green-400">{freeCredits}</span>
              </div>
            </div>
            <span className="flex justify-end px-2 text-right text-xs italic text-muted-foreground/50">
              1 credit = 1 poster.
            </span>
          </div>
          <div className="mb-2 px-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/pricing">Upgrade plan</Link>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserCreditsPopover;
