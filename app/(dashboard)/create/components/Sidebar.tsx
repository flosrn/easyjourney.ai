"use client";

import React from "react";

import { Badge } from "~/components/ui/Badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/HoverCard";
import { Label } from "~/components/ui/Label";

import { cn } from "~/lib/classNames";

import ButtonsAspectRatio from "./ButtonsAspectRatio";
import { FilterSelector } from "./FilterSelector";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div className={cn("lg:mt-2", className)}>
      <div className="space-y-4">
        <div className="">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="model">
                <h2 className="mb-2 text-lg font-semibold tracking-tight">
                  Filter
                </h2>
              </Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="right"
              sideOffset={30}
            >
              Experiment with different pre-defined styles that can be applied
              to your image.
            </HoverCardContent>
          </HoverCard>
          <div className="space-y-1">
            <FilterSelector />
          </div>
        </div>
        <div className="">
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Label htmlFor="model">
                <h2 className="mb-2 text-lg font-semibold tracking-tight">
                  Aspect Ratio
                </h2>
              </Label>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              className="w-[260px] text-sm"
              side="right"
              sideOffset={30}
            >
              Changes the aspect ratio of the generated image.
            </HoverCardContent>
            <ButtonsAspectRatio />
          </HoverCard>
        </div>
        <div className="">
          <h2 className="relative mb-2 hidden text-lg font-semibold tracking-tight lg:block">
            More Options
            <Badge
              variant="outline"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Soon
            </Badge>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
