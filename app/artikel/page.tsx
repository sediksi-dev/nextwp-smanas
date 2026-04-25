import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { getCategories, getCategoryBySlug, getAllPostsPaginated, getPostsByCategoryPaginated, getMediaById } from "@/lib/wordpress";
import { ArtikelSearch } from "./_components/artikel-search";

const IMAGE_PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e8f4fb'/%3E%3Crect x='150' y='90' width='100' height='80' rx='8' fill='%2329abe2' opacity='.25'/%3E%3Ccircle cx='200' cy='120' r='22' fill='%2329abe2' opacity='.35'/%3E%3Cpath d='M160 170 l30-40 25 30 18-20 47 30z' fill='%2329abe2' opacity='.2'/%3E%3C/svg%3E";

const PER_PAGE = 12;

type SearchParams = { kategori?: string; q?: string; page?: string; view?: string };

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
    const { kategori, q } = await searchParams;
    const parts: string[] = [kategori ? `${kategori} — Artikel` : "Artikel & Informasi"];
    if (q) parts.push(`"${q}"`);
    return {
        title: parts.join(" "),
        description: `Baca berita, agenda, karya, dan informasi terbaru dari SMA Nasional Malang${kategori ? ` kategori ${kategori}` : ""}.`,
    };
}

function buildHref(kategori: string, q: string, page: number, view: string) {
    const params = new URLSearchParams();
    if (kategori) params.set("kategori", kategori);
    if (q) params.set("q", q);
    if (page > 1) params.set("page", String(page));
    if (view && view !== "grid") params.set("view", view);
    const qs = params.toString();
    return qs ? `/artikel?${qs}` : "/artikel";
}

function buildViewHref(kategori: string, q: string, page: number, view: string) {
    return buildHref(kategori, q, page, view);
}

export default async function ArtikelPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { kategori = "", q = "", page = "1", view = "grid" } = await searchParams;
    const currentPage = Math.max(1, Number(page) || 1);
    const viewMode = view === "list" ? "list" : "grid";

    // Fetch categories for tabs
    const categories = await getCategories();

    // Fetch posts: by category (no pagination) or all (with pagination)
    let posts: Awaited<ReturnType<typeof getAllPostsPaginated>>["posts"];
    let total: number;
    let totalPages: number;
    let categoryName = "";

    if (kategori) {
        const cat = await getCategoryBySlug(kategori);
        if (cat) {
            categoryName = cat.name;
            // Fetch up to PER_PAGE only — "Lihat semua" button replaces pagination
            const result = await getPostsByCategoryPaginated(cat.id, kategori, 1, PER_PAGE, q);
            posts = result.posts;
            total = result.total;
            totalPages = 0; // suppress pagination
        } else {
            posts = [];
            total = 0;
            totalPages = 0;
        }
    } else {
        const result = await getAllPostsPaginated(currentPage, PER_PAGE, q);
        posts = result.posts;
        total = result.total;
        totalPages = result.totalPages;
    }

    // Pre-fetch featured images in parallel
    const mediaSrcs = await Promise.all(
        posts.map(async (post) => {
            if (!post.featured_media) return IMAGE_PLACEHOLDER;
            const media = await getMediaById(post.featured_media);
            return media?.source_url ?? IMAGE_PLACEHOLDER;
        }),
    );

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Artikel" }]}>
            <PageHeading
                title={categoryName || "Artikel & Informasi"}
                subtitle="Informasi Sekolah"
                description={`${total} artikel${q ? ` untuk pencarian "${q}"` : ""}`}
            />

            <div className="container">
                {/* Category tabs */}
                <div className="flex flex-wrap gap-2 border-b border-border pb-4 mb-6">
                    <Button asChild variant={!kategori ? "default" : "outline"} size="sm">
                        <Link href="/artikel">Semua</Link>
                    </Button>
                    {categories.map((cat) => {
                        const isActive = kategori === cat.slug;
                        return (
                            <Button key={cat.id} asChild variant={isActive ? "default" : "outline"} size="sm">
                                <Link href={buildHref(cat.slug, q, 1, viewMode)}>{cat.name}</Link>
                            </Button>
                        );
                    })}
                </div>

                {/* Search + view toggle */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                    <Suspense>
                        <ArtikelSearch defaultValue={q} kategori={kategori} />
                    </Suspense>
                    {/* View toggle */}
                    <div className="flex gap-1 bg-white border border-border rounded-full p-1 self-start">
                        <Link
                            href={buildViewHref(kategori, q, currentPage, "grid")}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${viewMode === "grid" ? "bg-site-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                <rect x="1" y="1" width="6" height="6" rx="1" />
                                <rect x="9" y="1" width="6" height="6" rx="1" />
                                <rect x="1" y="9" width="6" height="6" rx="1" />
                                <rect x="9" y="9" width="6" height="6" rx="1" />
                            </svg>
                            Grid
                        </Link>
                        <Link
                            href={buildViewHref(kategori, q, currentPage, "list")}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${viewMode === "list" ? "bg-site-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
                        >
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
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
                </div>

                {/* Posts */}
                {posts.length === 0 ? (
                    <div className="py-16 text-center text-muted-foreground">
                        <p className="text-lg font-semibold mb-2">Tidak ada artikel ditemukan.</p>
                        {q && (
                            <p className="text-sm">
                                Coba kata kunci lain atau{" "}
                                <Link href={buildHref(kategori, "", 1, viewMode)} className="text-site-primary underline underline-offset-2">
                                    hapus pencarian
                                </Link>
                                .
                            </p>
                        )}
                    </div>
                ) : viewMode === "list" ? (
                    /* ── List view ── */
                    <div className="flex flex-col divide-y divide-border">
                        {posts.map((post, i) => {
                            const src = mediaSrcs[i];
                            const date = new Date(post.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            });
                            return (
                                <article key={post.id} className="py-5 first:pt-0 flex gap-4 group">
                                    <Link href={`/artikel/${post.slug}`} className="relative shrink-0 w-28 h-20 sm:w-40 sm:h-28 overflow-hidden rounded-lg bg-site-bg">
                                        <Image
                                            src={src}
                                            alt={post.title.rendered}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            sizes="(max-width: 640px) 112px, 160px"
                                        />
                                    </Link>
                                    <div className="flex flex-1 flex-col justify-center gap-2 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {categoryName || "Artikel"}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">{date}</span>
                                        </div>
                                        <Link href={`/artikel/${post.slug}`}>
                                            <h2
                                                className="font-bold leading-snug line-clamp-2 group-hover:text-site-primary transition-colors"
                                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                            />
                                        </Link>
                                        <div
                                            className="text-sm text-muted-foreground line-clamp-2 hidden sm:block"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    /* ── Grid view ── */
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, i) => {
                            const src = mediaSrcs[i];
                            const date = new Date(post.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            });
                            return (
                                <article key={post.id} className="surface flex flex-col overflow-hidden">
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        <Image
                                            src={src}
                                            alt={post.title.rendered}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3 p-5">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {categoryName || "Artikel"}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">{date}</span>
                                        </div>
                                        <h2
                                            className="font-bold leading-snug"
                                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                        />
                                        <div
                                            className="text-sm text-muted-foreground line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                        />
                                        <Button asChild variant="link" size="sm" className="mt-auto self-start px-0">
                                            <Link href={`/artikel/${post.slug}`}>Baca selengkapnya &rarr;</Link>
                                        </Button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* Bottom action: pagination (no kategori) OR "Lihat semua" (kategori aktif) */}
                {kategori ? (
                    total > PER_PAGE && (
                        <div className="mt-10 mb-4 flex justify-center">
                            <Button asChild variant="outline">
                                <Link href={`/category/${kategori}`}>
                                    Lihat semua artikel di &ldquo;{categoryName}&rdquo; &rarr;
                                </Link>
                            </Button>
                        </div>
                    )
                ) : (
                    totalPages > 1 && (
                        <nav className="mt-10 mb-4 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                            {currentPage > 1 && (
                                <Button asChild variant="outline" size="sm">
                                    <Link href={buildHref(kategori, q, currentPage - 1, viewMode)}>← Sebelumnya</Link>
                                </Button>
                            )}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                                const isCurrent = p === currentPage;
                                const show = p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1;
                                if (!show) {
                                    if (p === 2 || p === totalPages - 1) {
                                        return <span key={p} className="px-1 text-muted-foreground text-sm select-none">…</span>;
                                    }
                                    return null;
                                }
                                return (
                                    <Button key={p} asChild variant={isCurrent ? "default" : "outline"} size="sm">
                                        <Link href={buildHref(kategori, q, p, viewMode)}>{p}</Link>
                                    </Button>
                                );
                            })}
                            {currentPage < totalPages && (
                                <Button asChild variant="outline" size="sm">
                                    <Link href={buildHref(kategori, q, currentPage + 1, viewMode)}>Selanjutnya →</Link>
                                </Button>
                            )}
                        </nav>
                    )
                )}
            </div>
        </PageWrap>
    );
}

