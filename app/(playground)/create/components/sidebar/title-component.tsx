import React from "react";
import { LucideHelpCircle } from "lucide-react";

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
      <HoverCard>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">
            <LucideHelpCircle
              color="gray"
              className="ml-1 hidden h-4 lg:block"
            />
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
