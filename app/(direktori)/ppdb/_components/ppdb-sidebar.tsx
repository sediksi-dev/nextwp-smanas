import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RelatedItem {
    slug: string;
    title: string;
    type: "post" | "page";
}

interface ExternalLink {
    title: string;
    url: string;
}

interface PpdbSidebarProps {
    slug: string;
    year_open: string;
    admission_results?: string | null;
    externalLinks: ExternalLink[];
    relatedFiltered: RelatedItem[];
}

export function PpdbSidebar({
    slug,
    year_open,
    admission_results,
    externalLinks,
    relatedFiltered,
}: PpdbSidebarProps) {
    return (
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            {/* Results CTA */}
            {admission_results && (
                <div className="surface rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                        Hasil Seleksi
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Hasil seleksi PPDB {year_open} telah tersedia.
                    </p>
                    <Button asChild className="w-full">
                        <Link href={`/ppdb/${slug}/hasil`}>
                            Lihat Hasil Seleksi
                        </Link>
                    </Button>
                </div>
            )}

            {/* External links */}
            {externalLinks.length > 0 && (
                <div className="surface rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                        Tautan Terkait
                    </p>
                    <div className="flex flex-col gap-2">
                        {externalLinks.map((link) => (
                            <Button
                                key={link.url}
                                asChild
                                variant="outline"
                                size="sm"
                                className="w-full justify-start"
                            >
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-3.5 h-3.5 mr-2 shrink-0"
                                        aria-hidden
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" x2="21" y1="14" y2="3" />
                                    </svg>
                                    {link.title}
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* Related content */}
            {relatedFiltered.length > 0 && (
                <div className="surface rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                        Artikel Terkait
                    </p>
                    <ul className="flex flex-col gap-2">
                        {relatedFiltered.map((r) => (
                            <li key={r.slug}>
                                <Link
                                    href={r.type === "post" ? `/artikel/${r.slug}` : `/${r.slug}`}
                                    className="text-sm text-foreground/80 hover:text-site-primary transition-colors leading-snug line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: r.title }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </aside>
    );
}
