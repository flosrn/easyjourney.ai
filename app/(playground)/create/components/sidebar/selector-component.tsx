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

type SelectorComponentProps = {
  title: string;
  description: string;
  defaultValue?: string;
  size?: "medium" | "small";
  className?: string;
};

const SelectorComponent = ({
  title,
  description,
  defaultValue,
  size,
  className,
}: SelectorComponentProps) => {
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
          className="w-[260px] text-left text-sm"
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

export default SelectorComponent;
