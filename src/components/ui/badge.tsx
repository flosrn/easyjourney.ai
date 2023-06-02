import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { XCircleIcon } from "lucide-react";

import { cn } from "~/lib/classNames";

const badgeVariants = cva(
  "group relative inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    hasClose?: boolean;
  };

function Badge({
  className,
  variant,
  children,
  hasClose,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {hasClose && (
        <span className="absolute -right-1 -top-1 hidden group-hover:block">
          <XCircleIcon className="h-3 w-3" />
        </span>
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
