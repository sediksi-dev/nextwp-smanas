import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArtikelNavItem {
    slug: string;
    /** Raw HTML title */
    title: string;
}

interface ArtikelNavProps {
    prev?: ArtikelNavItem | null;
    next?: ArtikelNavItem | null;
}

export function ArtikelNav({ prev, next }: ArtikelNavProps) {
    if (!prev && !next) return null;

    return (
        <nav
            aria-label="Navigasi artikel"
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 pt-6 border-t border-border"
        >
            {prev ? (
                <Link
                    href={`/artikel/${prev.slug}`}
                    className="surface flex flex-col gap-1 p-4 rounded-xl group hover:border-site-primary transition-colors"
                >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Sebelumnya
                    </span>
                    <span
                        className="text-sm font-bold leading-snug text-foreground group-hover:text-site-primary transition-colors line-clamp-2 mt-0.5"
                        dangerouslySetInnerHTML={{ __html: prev.title }}
                    />
                </Link>
            ) : (
                <div />
            )}
            {next ? (
                <Link
                    href={`/artikel/${next.slug}`}
                    className="surface flex flex-col gap-1 p-4 rounded-xl group text-right hover:border-site-primary transition-colors"
                >
                    <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                        Selanjutnya
                        <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span
                        className="text-sm font-bold leading-snug text-foreground group-hover:text-site-primary transition-colors line-clamp-2 mt-0.5"
                        dangerouslySetInnerHTML={{ __html: next.title }}
                    />
                </Link>
            ) : (
                <div />
            )}
        </nav>
    );
}
