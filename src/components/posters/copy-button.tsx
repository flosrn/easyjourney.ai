"use client";

import React from "react";
import { motion } from "framer-motion";
import { CopyIcon } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type CopyButtonProps = {
  text: string;
};

const CopyButton = ({ text }: CopyButtonProps) => {
  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard");
  };
  const MotionButton = motion(Button);
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            variant="outline"
            onClick={handleDownload}
            whileTap={{ scale: 0.9 }}
            className="w-fit rounded-3xl"
          >
            <CopyIcon className="h-3 w-3" />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} side="bottom" className="bg-accent">
          <p>Copy prompt</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
