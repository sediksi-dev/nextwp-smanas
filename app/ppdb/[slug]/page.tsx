import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPpdbBySlug, getPostOrPageById } from "@/lib/wordpress";
import type { PpdbRelatedLink } from "@/types/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const item = await getPpdbBySlug(slug);
    if (!item) return { title: "PPDB Tidak Ditemukan | SMA Nasional Malang" };
    const title = item.title.rendered;
    return {
        title: `${title} | SMA Nasional Malang`,
        description: `Informasi PPDB ${item.meta.year_open} SMA Nasional Malang.`,
    };
}

/** Normalise related_links to a flat array regardless of WP field format */
function normaliseRelatedLinks(raw: PpdbRelatedLink[] | Record<string, PpdbRelatedLink> | string): PpdbRelatedLink[] {
    if (!raw || raw === "") return [];
    if (Array.isArray(raw)) return raw;
    return Object.values(raw as Record<string, PpdbRelatedLink>).filter(
        (v) => v && typeof v === "object" && v.title && v.url,
    );
}

export default async function PpdbDetailPage({ params }: Props) {
    const { slug } = await params;
    const item = await getPpdbBySlug(slug);
    if (!item) notFound();

    const title = item.title.rendered;
    const { flyer, year_open, related_content, related_links, admission_results } = item.meta;

    // Fetch related posts/pages — run in parallel
    const relatedIds = Array.isArray(related_content)
        ? related_content.map(Number).filter(Boolean)
        : [];
    const relatedItems = await Promise.all(relatedIds.map((id) => getPostOrPageById(id)));
    const relatedFiltered = relatedItems.filter(
        (r): r is { slug: string; title: string; type: "post" | "page" } => r !== null,
    );

    const externalLinks = normaliseRelatedLinks(related_links as PpdbRelatedLink[] | Record<string, PpdbRelatedLink> | string);

    const hasSidebar = relatedFiltered.length > 0 || externalLinks.length > 0 || !!admission_results;

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "PPDB", href: "/ppdb" },
                { label: title },
            ]}
        >
            <Section py="sm">
                <div className={hasSidebar ? "grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-14 items-start" : ""}>

                    {/* ── Main content ─────────────────────────────── */}
                    <article>
                        {/* Flyer (featured image) — natural dimensions, no crop */}
                        {flyer && (
                            <figure className="w-full mb-8 rounded-2xl overflow-hidden shadow-site border border-border">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={flyer}
                                    alt={`Flyer PPDB ${year_open}`}
                                    className="w-full h-auto block"
                                    loading="eager"
                                />
                            </figure>
                        )}

                        {/* Title */}
                        <header className="mb-6">
                            <p className="text-xs font-bold tracking-widest uppercase text-site-primary mb-1">
                                Tahun Ajaran {year_open}/{Number(year_open) + 1}
                            </p>
                            <h1
                                className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                        </header>

                        {/* Body */}
                        <div
                            className="wp-content"
                            dangerouslySetInnerHTML={{ __html: item.content.rendered }}
                        />
                    </article>

                    {/* ── Sidebar ───────────────────────────────────── */}
                    {hasSidebar && (
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
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 mr-2 shrink-0" aria-hidden>
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
                    )}
                </div>
            </Section>
        </PageWrap>
    );
}
