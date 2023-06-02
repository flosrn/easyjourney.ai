import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/Accordion";

import { cn } from "~/lib/classNames";

import MoreOptions from "./MoreOptions";
import TitleComponent from "./TitleComponent";

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {};

const AccordionSide = ({ className }: AccordionProps) => {
  return (
    <Accordion type="single" collapsible className={(cn("w-full"), className)}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <TitleComponent
            title="More Options"
            description="Select advanced Options"
          />
        </AccordionTrigger>
        <AccordionContent>
          <MoreOptions />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionSide;
