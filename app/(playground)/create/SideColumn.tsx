import React from "react";

import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/classNames";

import AccordionSide from "./components/sidebar/AccordionSide";
import ButtonsAspectRatio from "./components/sidebar/ButtonsAspectRatio";
import { FilterSelector } from "./components/sidebar/FilterSelector";
import MoreOptions from "./components/sidebar/MoreOptions";
import TitleComponent from "./components/sidebar/TitleComponent";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const SideColumn = ({ className }: SidebarProps) => (
  <ScrollArea className={cn("lg:h-full", className)}>
    <aside className={cn("bg-background z-10 lg:mt-2", (className = "p-0"))}>
      <div className="space-y-4">
        <TitleComponent
          title="Style Filter"
          description="Experiment with different pre-defined styles that can be applied to your image."
        />
        <FilterSelector />
        <Separator />

        <TitleComponent
          title="Aspect Ratio"
          description="Changes the aspect ratio of the generated image."
        />
        <ButtonsAspectRatio />
        <Separator />

        <AccordionSide className="lg:hidden" />
        <MoreOptions className="hidden lg:block" />
      </div>
    </aside>
  </ScrollArea>
);

export default SideColumn;
