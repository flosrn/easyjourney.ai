import React from "react";

import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/classNames";

import AccordionSide from "./components/sidebar/accordion-side";
import AspectRatioSelector from "./components/sidebar/aspect-ratio-selector";
import { FilterSelector } from "./components/sidebar/filter-selector";
import TitleComponent from "./components/sidebar/title-component";
import VersionSelector from "./components/sidebar/version-selector";

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
          title="Version"
          description="Niji5 produce anime and illustrative styles with vastly more knowledge of anime styles and aesthetics."
          defaultValue="Default value is Version 5.1"
        />
        <VersionSelector />
        <Separator />

        <TitleComponent
          title="Aspect Ratio"
          description="Changes the aspect ratio of the generated image."
        />
        <AspectRatioSelector />
        <Separator />

        <AccordionSide />
      </div>
    </aside>
  </ScrollArea>
);

export default SideColumn;
