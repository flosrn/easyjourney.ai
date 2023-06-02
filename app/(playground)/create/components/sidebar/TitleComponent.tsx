import React from "react";
import { LucideHelpCircle } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/HoverCard";
import { Label } from "~/components/ui/Label";

type TitleComponentProps = {
  title: string;
  description: string;
};

const TitleComponent = ({ title, description }: TitleComponentProps) => {
  return (
    <div className="flex items-center ">
      <h2 className="relative text-lg font-semibold tracking-tight">{title}</h2>
      <HoverCard openDelay={0}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">
            <LucideHelpCircle className=" ml-1 h-4" color="gray" />
          </Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="right"
          sideOffset={30}
        >
          {description}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default TitleComponent;
