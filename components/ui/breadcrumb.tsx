import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Backward-compatible wrapper ─────────────────────────────────────────────
// Accepts `items` array; used by all pages via <Breadcrumb items={[...]} />
type BreadcrumbItemData = { label: string; href?: string };

const Breadcrumb = ({ items }: { items: BreadcrumbItemData[] }) => (
    <nav aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5 min-w-0">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    <li className="inline-flex items-center gap-1.5">
                        {item.href ? (
                            <a href={item.href} className="transition-colors hover:text-foreground shrink-0">
                                {item.label}
                            </a>
                        ) : (
                            <span
                                className="font-medium text-foreground truncate max-w-36 sm:max-w-xs md:max-w-none"
                                title={item.label}
                            >
                                {item.label}
                            </span>
                        )}
                    </li>
                    {i < items.length - 1 && (
                        <li role="presentation" aria-hidden className="[&>svg]:w-3.5 [&>svg]:h-3.5">
                            <ChevronRight />
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ol>
    </nav>
);
Breadcrumb.displayName = "Breadcrumb"

// ── shadcn primitives (available for direct use if needed) ──────────────────

const BreadcrumbList = React.forwardRef<
    HTMLOListElement,
    React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
    <ol
        ref={ref}
        className={cn(
            "flex flex-wrap items-center gap-1.5 wrap-break-word text-sm text-muted-foreground sm:gap-2.5",
            className
        )}
        {...props}
    />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
    <li
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
    />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<"a"> & {
        asChild?: boolean
    }
>(({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
        <Comp
            ref={ref}
            className={cn("transition-colors hover:text-foreground", className)}
            {...props}
        />
    )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
    HTMLSpanElement,
    React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn("font-normal text-foreground", className)}
        {...props}
    />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
    children,
    className,
    ...props
}: React.ComponentProps<"li">) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
        {...props}
    >
        {children ?? <ChevronRight />}
    </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        role="presentation"
        aria-hidden="true"
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">More</span>
    </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
}
