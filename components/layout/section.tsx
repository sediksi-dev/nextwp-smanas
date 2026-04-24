import { cn } from "@/lib/utils";

type SectionSize = "container" | "wide" | "fullwidth";

/**
 * container  – max-w-6xl  (1152px), centered, horizontal padding
 * wide       – max-w-screen-xl (1280px), centered, horizontal padding
 * fullwidth  – no max-width constraint, children render edge-to-edge
 */
const innerClass: Record<Exclude<SectionSize, "fullwidth">, string> = {
    container: "container",
    wide: "mx-auto w-full max-w-screen-2xl",
};

interface SectionProps {
    children: React.ReactNode;
    /** Width of the inner content wrapper. Default: "container" */
    size?: SectionSize;
    /** Apply default vertical padding (py-16 md:py-24). Default: true */
    py?: "none" | "sm" | "md" | "lg";
    /** Extra classes on the outer <section> */
    className?: string;
    /** Extra classes on the inner content wrapper (not used when size="fullwidth") */
    innerClassName?: string;
}

export function Section({
    children,
    size = "container",
    py = "md",
    className,
    innerClassName,
}: SectionProps) {
    const variantPadding = {
        none: "",
        sm: "py-4 md:py-8",
        md: "py-16 md:py-24",
        lg: "py-24 md:py-32",
    }[py];

    return (
        <section className={cn(variantPadding, className)}>
            {size === "fullwidth" ? (
                children
            ) : (
                <div className={cn(innerClass[size], innerClassName)}>{children}</div>
            )}
        </section>
    );
}
