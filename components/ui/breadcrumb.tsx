import Link from "next/link";
import { cn } from "@/lib/utils";

type Crumb = {
    label: string;
    href?: string;
};

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
    return (
        <nav aria-label="Breadcrumb">
            <ol
                className={cn(
                    "flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm",
                    className
                )}
            >
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                            {item.href && !isLast ? (
                                <Link href={item.href} className="text-primary hover:underline">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={isLast ? "font-medium text-foreground" : "text-muted-foreground"}>
                                    {item.label}
                                </span>
                            )}
                            {!isLast && (
                                <span aria-hidden="true" className="text-muted-foreground">
                                    /
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
