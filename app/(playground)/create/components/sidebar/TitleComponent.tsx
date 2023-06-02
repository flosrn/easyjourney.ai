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
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Label htmlFor="model" className="flex items-center ">
          <h2 className="relative hidden text-lg font-semibold tracking-tight lg:block ">
            {title}
          </h2>
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
  );
};

export default TitleComponent;
