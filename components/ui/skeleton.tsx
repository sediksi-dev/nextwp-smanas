import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva("animate-pulse bg-muted", {
  variants: {
    shape: {
      default: "rounded-md",
      full: "rounded-full",
      xl: "rounded-xl",
      lg: "rounded-lg",
      sm: "rounded-sm",
    },
  },
  defaultVariants: {
    shape: "default",
  },
});

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ shape, className }))}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

const SkeletonText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { lines?: number }
>(({ className, lines = 3, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 animate-pulse bg-muted rounded-md",
            i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
});

SkeletonText.displayName = "SkeletonText";

const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: "sm" | "default" | "lg" | "xl" }
>(({ className, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "animate-pulse bg-muted rounded-full",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
});

SkeletonAvatar.displayName = "SkeletonAvatar";

const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-border bg-card p-5 space-y-4",
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-3">
      <SkeletonAvatar size="lg" />
      <div className="space-y-2 flex-1">
        <Skeleton width="40%" height={14} />
        <Skeleton width="25%" height={12} />
      </div>
    </div>
    <SkeletonText lines={3} />
    <div className="flex gap-2">
      <Skeleton width={80} height={32} shape="full" />
      <Skeleton width={80} height={32} shape="full" />
    </div>
  </div>
));

SkeletonCard.displayName = "SkeletonCard";

export { Skeleton, skeletonVariants, SkeletonText, SkeletonAvatar, SkeletonCard };