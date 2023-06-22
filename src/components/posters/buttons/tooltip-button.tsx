import React from "react";
import { motion } from "framer-motion";
import type { LucideProps } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { cn } from "~/lib/classNames";

type TooltipButtonProps = {
  children: React.ReactNode;
  Icon: React.ComponentType<LucideProps>;
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  contentClassName?: string;
};

const TooltipButton = ({
  children,
  Icon,
  clickHandler,
  className,
  contentClassName,
}: TooltipButtonProps) => {
  const MotionButton = motion(Button);
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton
            variant="outline"
            onClick={clickHandler}
            onMouseDown={(event) => event.preventDefault()}
            whileTap={{ scale: 0.9 }}
            className={cn("rounded-3xl", className)}
          >
            <Icon className="h-4 w-4" />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={10}
          side="bottom"
          className={cn("bg-accent text-secondary", contentClassName)}
        >
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
