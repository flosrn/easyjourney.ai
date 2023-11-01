"use client";

import React from "react";
import { useZoomStore } from "~/store/zoomStore";
import { Maximize2Icon } from "lucide-react";

import TooltipButton from "~/components/posters/buttons/tooltip-button";

type ExpandButtonProps = {};

const ExpandButton = ({}: ExpandButtonProps) => {
  const setIsZoomed = useZoomStore((state) => state.setIsZoomed);
  return (
    <TooltipButton Icon={Maximize2Icon} clickHandler={() => setIsZoomed(true)}>
      Expand
    </TooltipButton>
  );
};

export default ExpandButton;
