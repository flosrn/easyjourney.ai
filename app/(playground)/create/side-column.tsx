import React from "react";
import { LayersIcon, LayoutGridIcon } from "lucide-react";

import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { TabsList, TabsTrigger } from "~/components/ui/tabs";

import { cn } from "~/lib/classNames";

import AccordionSide from "./components/sidebar/accordion-side";
import SelectorComponent from "./components/sidebar/selector-component";
import AspectRatioSelector from "./components/sidebar/selectors/aspect-ratio-selector";
import { FilterSelector } from "./components/sidebar/selectors/filter-selector";
import { DisplayMode } from "./store/displayStore";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const SideColumn = ({ className }: SidebarProps) => (
  <ScrollArea className={cn("w-full", className)}>
    <div className="z-10 mt-20 space-y-4 bg-background p-4 md:mt-0 md:p-6">
      <SelectorComponent
        title="Display Mode"
        description="Choose the interface that best suits you. You can choose between a stack or grid layout."
        className="hidden md:block"
      />
      <TabsList className="hidden grid-cols-2 md:grid">
        <TabsTrigger value={DisplayMode.STACK}>
          <LayersIcon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value={DisplayMode.GRID}>
          <LayoutGridIcon className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
      <SelectorComponent
        title="Style Filter"
        description="Experiment with different pre-defined styles that can be applied to your image."
      />
      <FilterSelector />
      <Separator />

      <SelectorComponent
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
