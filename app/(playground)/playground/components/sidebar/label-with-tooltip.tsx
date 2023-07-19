"use client";

import React, { useState } from "react";
import { HelpCircleIcon } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Label } from "~/components/ui/label";

import { cn } from "~/lib/classNames";

type LabelWithTooltipProps = {
  title: string;
  description: string;
  defaultValue?: string;
  size?: "sm" | "xs";
  className?: string;
};

const LabelWithTooltip = ({
  title,
  description,
  defaultValue,
  size = "sm",
  className,
}: LabelWithTooltipProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("grid gap-2", className)}>
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCardTrigger asChild onClick={() => setOpen(!open)}>
          <Label className="flex w-fit">
            {title}
            <HelpCircleIcon color="gray" className="ml-1 h-4" />
          </Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          side="right"
          sideOffset={10}
          className={cn("w-[260px] text-left", {
            "text-sm": size === "sm",
            "text-xs": size === "xs",
          })}
        >
          {description}
          {defaultValue && (
            <div>
              <br />
              <div className="text-xs italic">{defaultValue}</div>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default LabelWithTooltip;
