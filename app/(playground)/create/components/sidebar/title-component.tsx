import React from "react";
import { LucideHelpCircle } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Label } from "~/components/ui/label";

type TitleComponentProps = {
  title: string;
  description: string;
  defaultValue?: string;
};

const TitleComponent = ({
  title,
  description,
  defaultValue,
}: TitleComponentProps) => {
  return (
    <div className="flex items-center">
      <h2 className="relative text-lg font-semibold tracking-tight">{title}</h2>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">
            <LucideHelpCircle className=" ml-1 h-4" color="gray" />
          </Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="right"
          sideOffset={10}
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
