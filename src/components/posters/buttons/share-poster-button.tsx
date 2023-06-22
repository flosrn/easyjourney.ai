"use client";

import React from "react";
import { Share2Icon } from "lucide-react";
import toast from "react-hot-toast";

import TooltipButton from "~/components/posters/buttons/tooltip-button";

type SharePosterButtonProps = {};

const SharePosterButton = ({}: SharePosterButtonProps) => {
  const handleSharePoster = () => {
    toast("Coming soon!", {
      icon: "🚧",
    });
  };
  return (
    <TooltipButton Icon={Share2Icon} clickHandler={handleSharePoster}>
      Share poster
    </TooltipButton>
  );
};

export default SharePosterButton;
