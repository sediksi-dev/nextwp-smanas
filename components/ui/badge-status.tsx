import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeStatusVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        success: "bg-success/10 text-success border border-success/20",
        warning: "bg-warning/10 text-warning border border-warning/20",
        destructive: "bg-destructive/10 text-destructive border border-destructive/20",
        info: "bg-info/10 text-info border border-info/20",
        navy: "bg-navy/10 text-navy border border-navy/20",
        sky: "bg-sky/10 text-sky border border-sky/20",
        gold: "bg-gold/10 text-gold border border-gold/20",
      },
      size: {
        sm: "text-xs px-2 py-0.5 gap-1",
        default: "text-sm px-3 py-1 gap-1.5",
        lg: "text-base px-4 py-1.5 gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface BadgeStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeStatusVariants> {
  icon?: React.ReactNode;
}

const BadgeStatus = React.forwardRef<HTMLDivElement, BadgeStatusProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeStatusVariants({ variant, size, className }))}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </div>
    );
  }
);

BadgeStatus.displayName = "BadgeStatus";

export { BadgeStatus, badgeStatusVariants };