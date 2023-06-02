import React from "react";
import { Scrollbar } from "@radix-ui/react-scroll-area";

import { Separator } from "~/components/ui/Separator";

import { cn } from "~/lib/classNames";

import ButtonsAspectRatio from "./components/sidebar/ButtonsAspectRatio";
import ChaosSelector from "./components/sidebar/ChaosSelector";
import { FilterSelector } from "./components/sidebar/FilterSelector";
import QualitySelector from "./components/sidebar/QualitySelector";
import StopSelector from "./components/sidebar/StopSelector";
import StylizeSelector from "./components/sidebar/StylizeSelector";
import TileSelector from "./components/sidebar/TileSelector";
import TitleComponent from "./components/sidebar/TitleComponent";
import VersionSelector from "./components/sidebar/VersionSelector";

type SidebarProps = React.HTMLAttributes<HTMLDivElement> & {};

const SideColumn = ({ className }: SidebarProps) => (
  <aside className={cn("bg-background z-10 lg:mt-2", className)}>
    <div className="space-y-4">
      <Scrollbar>
        <div>
          <TitleComponent
            title="Style Filter"
            description="Experiment with different pre-defined styles that can be applied to your image."
          />
          <div className="mt-2">
            <FilterSelector />
          </div>
        </div>
        <Separator />
        <div>
          <TitleComponent
            title="Aspect Ratio"
            description="Changes the aspect ratio of the generated image."
          />
          <ButtonsAspectRatio />
        </div>
        <Separator />
        <div>
          <TitleComponent
            title="Version"
            description="Version 5 is the default version, the style raw remove some of the default Midjourney aesthetic style. 
          Niji5 produce anime and illustrative styles with vastly more knowledge of anime, anime styles, and anime aesthetics."
          />
          <div className="mt-2">
            <VersionSelector />
          </div>
        </div>
        <Separator />
        <div>
          <TitleComponent
            title="Quality"
            description="How much rendering quality time you want to spend. The default value
            is 1. Higher values use more GPU minutes, lower values use less."
          />
          <div className="mt-2">
            <QualitySelector />
          </div>
        </div>
        <Separator />
        <div>
          <TitleComponent
            title="Chaos"
            description="Change how varied the results will be. Higher values produce more unusual and unexpected generations. Default at '0'."
          />
          <ChaosSelector />
        </div>
        <Separator />
        <div>
          <TitleComponent
            title="Stylize"
            description="Influences how strongly Midjourney's default aesthetic style is applied to Jobs. Default at '100'."
          />
          <StylizeSelector />
        </div>
        <Separator />
        <div>
          <TitleComponent
            title="Stop"
            description="Use the --stop parameter to finish a Job partway through the
            process. Stopping a Job at an earlier percentage can create
            blurrier, less detailed results. Default at '100'."
          />
          <StopSelector />
        </div>
        <Separator />
        <div className="flex justify-between">
          <TitleComponent
            title="Tile"
            description="Generates images that can be used as repeating tiles to create seamless patterns."
          />
          <TileSelector />
        </div>
      </Scrollbar>
    </div>
  </aside>
);

export default SideColumn;
