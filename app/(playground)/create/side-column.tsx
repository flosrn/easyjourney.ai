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
  <ScrollArea className={cn("w-full lg:h-full", className)}>
    <div className="z-10 mx-2 space-y-4 bg-background lg:mx-4 lg:mt-6 xl:mx-8">
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
  </ScrollArea>
);

export default SideColumn;
