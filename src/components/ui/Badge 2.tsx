import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/classNames";

const badgeVariants = cva(
  "focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/80 text-primary-foreground border-transparent",
        secondary:
          "bg-secondary hover:bg-secondary/80 text-secondary-foreground border-transparent",
        destructive:
          "bg-destructive hover:bg-destructive/80 text-destructive-foreground border-transparent",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {};

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
