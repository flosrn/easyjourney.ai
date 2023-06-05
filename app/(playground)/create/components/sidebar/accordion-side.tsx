import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Separator } from "~/components/ui/separator";

import { cn } from "~/lib/classNames";

import MoreOptions from "./more-options";
import TitleComponent from "./title-component";

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {};

const AccordionSide = ({ className }: AccordionProps) => {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className={(cn("w-full"), className)}
      >
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
    </>
  );
};

export default AccordionSide;
