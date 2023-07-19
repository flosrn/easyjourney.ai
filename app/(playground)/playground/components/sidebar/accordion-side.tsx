import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Separator } from "~/components/ui/separator";

import SelectorComponent from "./selector-component";
import ChaosSelector from "./selectors/chaos-selector";
import QualitySelector from "./selectors/quality-selector";
import SeedSelector from "./selectors/seed-selector";
import StopSelector from "./selectors/stop-selector";
import StylizeSelector from "./selectors/stylize-selector";
import TileSelector from "./selectors/tile-selector";
import VersionSelector from "./selectors/version-selector";

const AccordionSide = ({}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b-0 lg:border-b">
        <AccordionTrigger className="pt-0">
          <SelectorComponent
            title="Advanced"
            description="Select advanced options like quality, chaos, stylize and more."
          />
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 px-1">
            <SelectorComponent
              title="Version"
              description="Changes the version of Midjourney that is used to generate the image."
              defaultValue="Default value is Version 5.1"
            />
            <VersionSelector />
            <SelectorComponent
              title="Quality"
              description="How much rendering quality time you want to spend. Higher values use more GPU minutes, lower values use less."
              defaultValue="Default value is '1'"
              size="small"
            />
            <QualitySelector />
            <Separator />

            <SelectorComponent
              title="Seed"
              description="Using a seed number as a complement to the same or nearly the same prompt will ensure a final result that is very similar."
              defaultValue="Number can be beetween 1 and 999999999"
              size="small"
            />
            <SeedSelector />
            <Separator />

            <SelectorComponent
              title="Chaos"
              description="Change how varied the results will be. Higher values produce more unusual and unexpected generations."
              defaultValue="Default value is '0'"
              size="small"
            />
            <ChaosSelector />
            <Separator />

            <SelectorComponent
              title="Stylize"
              description="Influences how strongly Midjourney's default aesthetic style is applied to Jobs."
              defaultValue="Default value is '100'"
              size="small"
            />
            <StylizeSelector />
            <Separator />

            <SelectorComponent
              title="Stop"
              description="Finish a Job partway through the process. Stopping a Job at an earlier percentage can create blurrier, less detailed results."
              defaultValue="Default value is '100'"
              size="small"
            />
            <StopSelector />
            <Separator />

            <div className="flex justify-between">
              <SelectorComponent
                title="Tile"
                description="Generates images that can be used as repeating tiles to create seamless patterns."
                size="small"
              />
              <TileSelector />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionSide;
