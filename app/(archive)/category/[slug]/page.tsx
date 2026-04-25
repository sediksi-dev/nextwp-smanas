import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, getPostsByCategoryPaginated, getMediaById } from "@/lib/wordpress";
import { CategorySearch } from "./_components/category-search";

const PER_PAGE = 12;

const IMAGE_PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e8f4fb'/%3E%3Crect x='150' y='90' width='100' height='80' rx='8' fill='%2329abe2' opacity='.25'/%3E%3Ccircle cx='200' cy='120' r='22' fill='%2329abe2' opacity='.35'/%3E%3Cpath d='M160 170 l30-40 25 30 18-20 47 30z' fill='%2329abe2' opacity='.2'/%3E%3C/svg%3E";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { q } = await searchParams;
    const category = await getCategoryBySlug(slug);
    if (!category) return { title: "Kategori tidak ditemukan" };
    const title = q
        ? `${category.name} — "${q}" | SMA Nasional Malang`
        : `${category.name} | SMA Nasional Malang`;
    return {
        title,
        description: `Daftar artikel kategori ${category.name} dari SMA Nasional Malang.`,
    };
}

function buildHref(slug: string, q: string, page: number) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/category/${slug}?${qs}` : `/category/${slug}`;
}

export default async function CategorySlugPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { q = "", page = "1" } = await searchParams;

    const category = await getCategoryBySlug(slug);
    if (!category) notFound();

    const currentPage = Math.max(1, Number(page) || 1);
    const { posts, total, totalPages } = await getPostsByCategoryPaginated(
        category.id,
        slug,
        currentPage,
        PER_PAGE,
        q,
    );

    // Pre-fetch all featured images in parallel (outside JSX to avoid async in .map())
    const mediaSrcs = await Promise.all(
        posts.map(async (post) => {
            if (!post.featured_media) return IMAGE_PLACEHOLDER;
            const media = await getMediaById(post.featured_media);
            return media?.source_url ?? IMAGE_PLACEHOLDER;
        }),
    );

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "Kategori", href: "/category" },
                { label: category.name },
            ]}
        >
            <PageHeading
                title={category.name}
                subtitle="Kategori"
                description={`${total} artikel ditemukan${q ? ` untuk pencarian "${q}"` : ""}`}
            />

            <div className="container">
                {/* Search */}
                <div className="mb-8">
                    <Suspense>
                        <CategorySearch
                            defaultValue={q}
                            placeholder={`Cari di ${category.name}...`}
                        />
                    </Suspense>
                </div>

                {/* Posts grid */}
                {posts.length === 0 ? (
                    <div className="py-16 text-center text-muted-foreground">
                        <p className="text-lg font-semibold mb-2">Tidak ada artikel ditemukan.</p>
                        {q && (
                            <p className="text-sm">
                                Coba kata kunci lain atau{" "}
                                <Link href={`/category/${slug}`} className="text-site-primary underline underline-offset-2">
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
                                            <Badge variant="secondary" className="text-xs">{category.name}</Badge>
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
                    <nav
                        className="mt-10 mb-4 flex flex-wrap items-center justify-center gap-2"
                        aria-label="Pagination"
                    >
                        {currentPage > 1 && (
                            <Button asChild variant="outline" size="sm">
                                <Link href={buildHref(slug, q, currentPage - 1)}>← Sebelumnya</Link>
                            </Button>
                        )}

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                            const isCurrent = p === currentPage;
                            // Show first, last, and pages near current
                            const show =
                                p === 1 ||
                                p === totalPages ||
                                Math.abs(p - currentPage) <= 1;
                            if (!show) {
                                // Ellipsis
                                if (p === 2 || p === totalPages - 1) {
                                    return (
                                        <span key={p} className="px-1 text-muted-foreground text-sm select-none">
                                            …
                                        </span>
                                    );
                                }
                                return null;
                            }
                            return (
                                <Button
                                    key={p}
                                    asChild
                                    variant={isCurrent ? "default" : "outline"}
                                    size="sm"
                                >
                                    <Link href={buildHref(slug, q, p)}>{p}</Link>
                                </Button>
                            );
                        })}

                        {currentPage < totalPages && (
                            <Button asChild variant="outline" size="sm">
                                <Link href={buildHref(slug, q, currentPage + 1)}>Selanjutnya →</Link>
                            </Button>
                        )}
                    </nav>
                )}
            </div>
        </PageWrap>
    );
}
