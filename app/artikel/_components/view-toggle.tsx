import Link from "next/link";

interface ViewToggleProps {
    viewMode: "grid" | "list";
    gridHref: string;
    listHref: string;
}

export function ViewToggle({ viewMode, gridHref, listHref }: ViewToggleProps) {
    return (
        <div className="flex gap-1 bg-white border border-border rounded-full p-1 self-start">
            <Link
                href={gridHref}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${viewMode === "grid" ? "bg-site-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <rect x="1" y="1" width="6" height="6" rx="1" />
                    <rect x="9" y="1" width="6" height="6" rx="1" />
                    <rect x="1" y="9" width="6" height="6" rx="1" />
                    <rect x="9" y="9" width="6" height="6" rx="1" />
                </svg>
                Grid
            </Link>
            <Link
                href={listHref}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${viewMode === "list" ? "bg-site-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <rect x="1" y="1" width="4" height="4" rx="0.5" />
                    <rect x="7" y="2" width="8" height="2" rx="1" />
                    <rect x="1" y="6.5" width="4" height="4" rx="0.5" />
                    <rect x="7" y="7.5" width="8" height="2" rx="1" />
                    <rect x="1" y="12" width="4" height="4" rx="0.5" />
                    <rect x="7" y="13" width="8" height="2" rx="1" />
                </svg>
                List
            </Link>
        </div>
    );
}
