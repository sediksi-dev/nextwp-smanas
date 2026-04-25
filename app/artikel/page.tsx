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

type SearchParams = { kategori?: string; q?: string; page?: string };

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

function buildHref(kategori: string, q: string, page: number) {
    const params = new URLSearchParams();
    if (kategori) params.set("kategori", kategori);
    if (q) params.set("q", q);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/artikel?${qs}` : "/artikel";
}

export default async function ArtikelPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { kategori = "", q = "", page = "1" } = await searchParams;
    const currentPage = Math.max(1, Number(page) || 1);

    // Fetch categories for tabs
    const categories = await getCategories();

    // Fetch posts: by category or all
    let posts: Awaited<ReturnType<typeof getAllPostsPaginated>>["posts"];
    let total: number;
    let totalPages: number;
    let categoryName = "";

    if (kategori) {
        const cat = await getCategoryBySlug(kategori);
        if (cat) {
            categoryName = cat.name;
            const result = await getPostsByCategoryPaginated(cat.id, kategori, currentPage, PER_PAGE, q);
            posts = result.posts;
            total = result.total;
            totalPages = result.totalPages;
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
                                <Link href={buildHref(cat.slug, q, 1)}>{cat.name}</Link>
                            </Button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="mb-8 flex flex-wrap items-center gap-3">
                    <Suspense>
                        <ArtikelSearch defaultValue={q} kategori={kategori} />
                    </Suspense>
                    {kategori && (
                        <Button asChild variant="outline" size="sm">
                            <Link href={`/category/${kategori}`}>
                                Lihat semua di &ldquo;{categoryName}&rdquo; &rarr;
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Grid */}
                {posts.length === 0 ? (
                    <div className="py-16 text-center text-muted-foreground">
                        <p className="text-lg font-semibold mb-2">Tidak ada artikel ditemukan.</p>
                        {q && (
                            <p className="text-sm">
                                Coba kata kunci lain atau{" "}
                                <Link href={buildHref(kategori, "", 1)} className="text-site-primary underline underline-offset-2">
                                    hapus pencarian
                                </Link>
                                .
                            </p>
                        )}
                    </div>
                ) : (
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

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav className="mt-10 mb-4 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                        {currentPage > 1 && (
                            <Button asChild variant="outline" size="sm">
                                <Link href={buildHref(kategori, q, currentPage - 1)}>← Sebelumnya</Link>
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
                                    <Link href={buildHref(kategori, q, p)}>{p}</Link>
                                </Button>
                            );
                        })}
                        {currentPage < totalPages && (
                            <Button asChild variant="outline" size="sm">
                                <Link href={buildHref(kategori, q, currentPage + 1)}>Selanjutnya →</Link>
                            </Button>
                        )}
                    </nav>
                )}
            </div>
        </PageWrap>
    );
}

