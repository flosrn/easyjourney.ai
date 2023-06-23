import React from "react";
import { cva } from "class-variance-authority";
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
  iconSize: "lg" | "md" | "sm" | "xl" | "xs";
  clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  contentClassName?: string;
};

const iconSizeVariants = cva("", {
  variants: {
    iconSize: {
      xs: "h-3.5 w-3.5",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7",
    },
  },
});

const TooltipButton = ({
  children,
  Icon,
  iconSize = "sm",
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
            <Icon className={iconSizeVariants({ iconSize })} />
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
