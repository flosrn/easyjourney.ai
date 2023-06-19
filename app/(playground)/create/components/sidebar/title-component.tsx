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

type TitleComponentProps = {
  title: string;
  description: string;
  defaultValue?: string;
  size?: "medium" | "small";
};

const TitleComponent = ({
  title,
  description,
  defaultValue,
  size,
}: TitleComponentProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center">
      <h2
        className={cn(
          "relative text-lg font-semibold truncate tracking-tight",
          size === "small" ? "text-[16px]" : "text-lg"
        )}
      >
        {title}
      </h2>
      <HoverCard open={open} onOpenChange={setOpen}>
        <HoverCardTrigger asChild onClick={() => setOpen(!open)}>
          <Label>
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

export default TitleComponent;
