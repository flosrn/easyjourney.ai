"use client";

import React from "react";
import { Share2Icon } from "lucide-react";

import TooltipButton from "~/components/posters/buttons/tooltip-button";

type SharePosterButtonProps = {};

const SharePosterButton = ({}: SharePosterButtonProps) => {
  return (
    <TooltipButton Icon={Share2Icon} clickHandler={() => null}>
      Share poster
    </TooltipButton>
  );
};

export default SharePosterButton;
