"use client";

import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Separator } from "~/components/ui/separator";

import { useTourStore } from "../../store/tourStore";
import LabelWithTooltip from "./label-with-tooltip";
import ChaosSelector from "./selectors/chaos-selector";
import QualitySelector from "./selectors/quality-selector";
import SeedSelector from "./selectors/seed-selector";
import StopSelector from "./selectors/stop-selector";
import StylizeSelector from "./selectors/stylize-selector";
import TileSelector from "./selectors/tile-selector";
import VersionSelector from "./selectors/version-selector";

const AccordionSide = ({}) => {
  const [driverObj, isTourActive] = useTourStore((state) => [
    state.driverJs,
    state.isTourActive,
  ]);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b-0 lg:border-b">
        <AccordionTrigger
          id="advanced"
          onClick={() => {
            isTourActive && driverObj?.moveNext();
          }}
          className="pt-0"
        >
          <LabelWithTooltip
            title="Advanced"
            description="Select advanced options like quality, chaos, stylize and more."
          />
        </AccordionTrigger>
        <AccordionContent id="advanced-content">
          <div className="space-y-4 px-1">
            <LabelWithTooltip
              title="Version"
              description="Changes the version of Midjourney that is used to generate the image."
              defaultValue="Default value is Version 5.1"
            />
            <VersionSelector />
            <LabelWithTooltip
              title="Quality"
              description="How much rendering quality time you want to spend. Higher values use more GPU minutes, lower values use less."
              defaultValue="Default value is '1'"
            />
            <QualitySelector />
            <Separator />

            <LabelWithTooltip
              title="Seed"
              description="Using a seed number as a complement to the same or nearly the same prompt will ensure a final result that is very similar."
              defaultValue="Number can be beetween 1 and 999999999"
            />
            <SeedSelector />
            <Separator />

            <LabelWithTooltip
              title="Chaos"
              description="Change how varied the results will be. Higher values produce more unusual and unexpected generations."
              defaultValue="Default value is '0'"
            />
            <ChaosSelector />
            <Separator />

            <LabelWithTooltip
              title="Stylize"
              description="Influences how strongly Midjourney's default aesthetic style is applied to Jobs."
              defaultValue="Default value is '100'"
            />
            <StylizeSelector />
            <Separator />

            <LabelWithTooltip
              title="Stop"
              description="Finish a Job partway through the process. Stopping a Job at an earlier percentage can create blurrier, less detailed results."
              defaultValue="Default value is '100'"
            />
            <StopSelector />
            <Separator />

            <div className="flex justify-between">
              <LabelWithTooltip
                title="Tile"
                description="Generates images that can be used as repeating tiles to create seamless patterns."
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
