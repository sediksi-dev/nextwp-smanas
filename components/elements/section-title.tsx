import { cn } from "@/lib/utils";

export type SectionTitleVariant =
    | "default"      // eyebrow (xs label) + h2, center-aligned
    | "badge"        // eyebrow as pill badge + h2, center-aligned
    | "underline"    // h2 + decorative dual-bar underline, center-aligned
    | "centered-bar" // horizontal lines flanking the eyebrow + h2, center-aligned
    | "left";        // accent bar + eyebrow + h2, left-aligned

interface SectionTitleProps {
    eyebrow?: string;
    title: string;
    description?: string;
    variant?: SectionTitleVariant;
    className?: string;
}

export function SectionTitle({
    eyebrow,
    title,
    description,
    variant = "default",
    className,
}: SectionTitleProps) {

    /* ── default ──────────────────────────────────────────
       Plain centered eyebrow label + h2.
       Current pattern used across most sections.
    ─────────────────────────────────────────────────────── */
    if (variant === "default") {
        return (
            <div className={cn("text-center mb-8", className)}>
                {eyebrow && (
                    <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                        {eyebrow}
                    </p>
                )}
                <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
                    {title}
                </h2>
                {description && (
                    <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        );
    }

    /* ── badge ────────────────────────────────────────────
       Eyebrow rendered as a translucent pill badge above h2.
       Great for sections that need a modern, tag-like feel.
    ─────────────────────────────────────────────────────── */
    if (variant === "badge") {
        return (
            <div className={cn("text-center mb-8", className)}>
                {eyebrow && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-site-primary/10 text-site-primary border border-site-primary/20 mb-3">
                        {eyebrow}
                    </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {title}
                </h2>
                {description && (
                    <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        );
    }

    /* ── underline ────────────────────────────────────────
       Centered h2 followed by a two-segment decorative bar
       (primary blue + gold accent). Clean editorial look.
    ─────────────────────────────────────────────────────── */
    if (variant === "underline") {
        return (
            <div className={cn("text-center mb-8", className)}>
                {eyebrow && (
                    <p className="text-xs font-bold tracking-widest uppercase text-site-primary mb-2">
                        {eyebrow}
                    </p>
                )}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {title}
                </h2>
                <div className="mt-4 flex justify-center items-center gap-1">
                    <span className="block h-1 w-12 rounded-full bg-site-primary" />
                    <span className="block h-1 w-3 rounded-full bg-site-accent" />
                </div>
                {description && (
                    <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        );
    }

    /* ── centered-bar ─────────────────────────────────────
       Thin horizontal rules flanking the eyebrow text,
       then the h2 below. Elegant, ceremony-like feel.
    ─────────────────────────────────────────────────────── */
    if (variant === "centered-bar") {
        return (
            <div className={cn("text-center mb-10", className)}>
                {eyebrow && (
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="block flex-1 max-w-14 h-px bg-site-border" />
                        <p className="text-xs font-bold tracking-widest uppercase text-site-muted">
                            {eyebrow}
                        </p>
                        <span className="block flex-1 max-w-14 h-px bg-site-border" />
                    </div>
                )}
                <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-foreground">
                    {title}
                </h2>
                {description && (
                    <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        );
    }

    /* ── left ─────────────────────────────────────────────
       Gold accent bar + eyebrow + h2, left-aligned.
       Ideal for asymmetric / editorial layouts.
    ─────────────────────────────────────────────────────── */
    return (
        <div className={cn("mb-8", className)}>
            {eyebrow && (
                <div className="flex items-center gap-3 mb-3">
                    <span className="block w-8 h-1 rounded-full bg-site-accent shrink-0" />
                    <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                        {eyebrow}
                    </p>
                </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {title}
            </h2>
            {description && (
                <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
