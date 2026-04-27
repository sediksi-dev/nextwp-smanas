import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getPpdbBySlug, getPostOrPageById } from "@/lib/wordpress";
import type { PpdbRelatedLink } from "@/types/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import { PpdbSidebar } from "../_components/ppdb-sidebar";

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
                                <Image
                                    src={flyer}
                                    alt={`Flyer PPDB ${year_open}`}
                                    width={800}
                                    height={1100}
                                    style={{ width: "100%", height: "auto" }}
                                    priority
                                    sizes="(max-width: 768px) 100vw, 672px"
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
                        <PpdbSidebar
                            slug={slug}
                            year_open={year_open}
                            admission_results={admission_results}
                            externalLinks={externalLinks}
                            relatedFiltered={relatedFiltered}
                        />
                    )}
                </div>
            </Section>
        </PageWrap>
    );
}
