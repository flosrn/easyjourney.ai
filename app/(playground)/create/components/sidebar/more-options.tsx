import React from "react";

import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/classNames";

import ChaosSelector from "./chaos-selector";
import QualitySelector from "./quality-selector";
import SeedSelector from "./seed-selector";
import StopSelector from "./stop-selector";
import StylizeSelector from "./stylize-selector";
import TileSelector from "./tile-selector";
import TitleComponent from "./title-component";
import VersionSelector from "./version-selector";

type MoreOptionsProps = React.HTMLAttributes<HTMLDivElement> & {};
const MoreOptions = ({ className }: MoreOptionsProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      <TitleComponent
        title="Version"
        description="The style raw remove some of the default Midjourney aesthetic style. Niji5 produce anime and illustrative styles with vastly more knowledge of anime styles and aesthetics."
        defaultValue="Default value is Version 5.1"
      />
      <VersionSelector />
      <Separator />

      <TitleComponent
        title="Quality"
        description="How much rendering quality time you want to spend. Higher values use more GPU minutes, lower values use less."
        defaultValue="Default value is '1'"
      />
      <QualitySelector />
      <Separator />

      <TitleComponent
        title="Chaos"
        description="Change how varied the results will be. Higher values produce more unusual and unexpected generations."
        defaultValue="Default value is '0'"
      />
      <ChaosSelector />
      <Separator />

      <TitleComponent
        title="Stylize"
        description="Influences how strongly Midjourney's default aesthetic style is applied to Jobs."
        defaultValue="Default value is '100'"
      />
      <StylizeSelector />
      <Separator />

      <TitleComponent
        title="Stop"
        description="Finish a Job partway through the process. Stopping a Job at an earlier percentage can create blurrier, less detailed results."
        defaultValue="Default value is '100'"
      />
      <StopSelector />
      <Separator />

      <div className="flex justify-between">
        <TitleComponent
          title="Seed"
          description="Using a seed number as a complement to the same or nearly the same prompt will ensure a final result that is very similar."
          defaultValue="Number can be beetween 1 and 999999999"
        />
        <SeedSelector />
      </div>
      <Separator />

      <div className="flex justify-between">
        <TitleComponent
          title="Tile"
          description="Generates images that can be used as repeating tiles to create seamless patterns."
        />
        <TileSelector />
      </div>
      <Separator />
    </div>
  );
};

export default MoreOptions;
