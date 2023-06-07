import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Separator } from "~/components/ui/separator";

import ChaosSelector from "./chaos-selector";
import QualitySelector from "./quality-selector";
import SeedSelector from "./seed-selector";
import StopSelector from "./stop-selector";
import StylizeSelector from "./stylize-selector";
import TileSelector from "./tile-selector";
import TitleComponent from "./title-component";

const AccordionSide = ({}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b-0 lg:border-b">
        <AccordionTrigger className="pt-0">
          <TitleComponent
            title="Advanced"
            description="Select advanced options like quality, chaos, stylize and more."
          />
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 px-1">
            <TitleComponent
              title="Quality"
              description="How much rendering quality time you want to spend. Higher values use more GPU minutes, lower values use less."
              defaultValue="Default value is '1'"
              size="small"
            />
            <QualitySelector />
            <Separator />

            <TitleComponent
              title="Seed"
              description="Using a seed number as a complement to the same or nearly the same prompt will ensure a final result that is very similar."
              defaultValue="Number can be beetween 1 and 999999999"
              size="small"
            />
            <SeedSelector />
            <Separator />

            <TitleComponent
              title="Chaos"
              description="Change how varied the results will be. Higher values produce more unusual and unexpected generations."
              defaultValue="Default value is '0'"
              size="small"
            />
            <ChaosSelector />
            <Separator />

            <TitleComponent
              title="Stylize"
              description="Influences how strongly Midjourney's default aesthetic style is applied to Jobs."
              defaultValue="Default value is '100'"
              size="small"
            />
            <StylizeSelector />
            <Separator />

            <TitleComponent
              title="Stop"
              description="Finish a Job partway through the process. Stopping a Job at an earlier percentage can create blurrier, less detailed results."
              defaultValue="Default value is '100'"
              size="small"
            />
            <StopSelector />
            <Separator />

            <div className="flex justify-between">
              <TitleComponent
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
