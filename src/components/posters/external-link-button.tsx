"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLinkIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type ExternalLinkButtonProps = {
  imageUrl: string;
};

const ExternalLinkButton = ({ imageUrl }: ExternalLinkButtonProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href={imageUrl}
            whileTap={{ scale: 0.9 }}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 select-none items-center justify-center rounded-3xl border border-input px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <ExternalLinkIcon className="h-4 w-4" />
          </motion.a>
        </TooltipTrigger>
        <TooltipContent sideOffset={10} side="bottom" className="bg-accent">
          <p>Open in a new tab</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ExternalLinkButton;
