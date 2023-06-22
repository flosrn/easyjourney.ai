"use client";

import React from "react";
import { useZoomStore } from "~/store/zoomStore";
import { motion } from "framer-motion";
import { ExpandIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type ExpandButtonProps = {};

const ExpandButton = ({}: ExpandButtonProps) => {
  const setIsZoomed = useZoomStore((state) => state.setIsZoomed);
  const MotionButton = motion(Button);
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            variant="outline"
            onClick={() => setIsZoomed(true)}
            whileTap={{ scale: 0.9 }}
            className="rounded-3xl"
          >
            <ExpandIcon className="h-4 w-4" />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} side="bottom" className="bg-accent">
          <p>Expand</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExpandButton;
