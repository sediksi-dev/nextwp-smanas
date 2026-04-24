import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-display font-bold tracking-tight", {
  variants: {
    level: {
      h1: "text-4xl md:text-5xl lg:text-6xl leading-[1.1]",
      h2: "text-3xl md:text-4xl lg:text-5xl leading-[1.15]",
      h3: "text-2xl md:text-3xl lg:text-4xl leading-[1.2]",
      h4: "text-xl md:text-2xl lg:text-3xl leading-[1.25]",
      h5: "text-lg md:text-xl lg:text-2xl leading-[1.3]",
      h6: "text-base md:text-lg lg:text-xl leading-[1.4]",
    },
    align: {
      default: "",
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    level: "h1",
    align: "default",
  },
});

const Eyebrow = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { variant?: "default" | "accent" }
>(({ className, variant = "default", ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xs font-bold uppercase tracking-widest",
      variant === "default"
        ? "text-primary"
        : "text-accent",
      className
    )}
    {...props}
  />
));
Eyebrow.displayName = "Eyebrow";

const Heading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof headingVariants>
>(({ className, level, align, ...props }, ref) => {
  const Component = level || "h1";
  return (
    <Component
      ref={ref}
      className={cn(headingVariants({ level, align, className }))}
      {...props}
    />
  );
});
Heading.displayName = "Heading";

const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive",
      success: "text-success",
      warning: "text-warning",
      accent: "text-accent",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default",
  },
});

const Text = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof textVariants>
>(({ className, size, weight, color, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(textVariants({ size, weight, color, className }))}
    {...props}
  />
));
Text.displayName = "Text";

const Lead = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-lg md:text-xl text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
Lead.displayName = "Lead";

const Blockquote = React.forwardRef<
  HTMLblockquoteElement,
  React.HTMLAttributes<HTMLblockquoteElement>
>(({ className, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn(
      "border-l-4 border-primary pl-4 italic text-muted-foreground",
      className
    )}
    {...props}
  />
));
Blockquote.displayName = "Blockquote";

const Prose = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "[&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-foreground",
      "[&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-2xl",
      "[&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:font-display [&>h3]:font-bold [&>h3]:text-xl",
      "[&>ul]:mb-4 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-1",
      "[&>ol]:mb-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-1",
      "[&>a]:text-primary [&>a]:underline [&>a]:underline-offset-2 [&>a]:hover:underline",
      "[&>code]:bg-muted [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono",
      "[&>pre]:bg-muted [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto",
      className
    )}
    {...props}
  />
));
Prose.displayName = "Prose";

export {
  Eyebrow,
  Heading,
  headingVariants,
  Text,
  textVariants,
  Lead,
  Blockquote,
  Prose,
};