import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, Clock, Tag } from "lucide-react";
import {
    getPostBySlug,
    getLatestPosts,
    getTagsByIds,
    getCategories,
    getMediaById,
    getPrevPost,
    getNextPost,
} from "@/lib/wordpress";
import { isWpSlug } from "@/lib/utils";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArtikelNav } from "../_components/artikel-nav";
import { RelatedArtikelCard } from "../_components/related-artikel-card";

function estimateReadTime(html: string): number {
    const text = html.replace(/<[^>]+>/g, "");
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
}

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = isWpSlug(slug) ? await getPostBySlug(slug) : null;
    if (!post) return { title: "Artikel tidak ditemukan | SMA Nasional Malang" };
    const title = post.title.rendered;
    const description = post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160);
    return {
        title: `${title} | SMA Nasional Malang`,
        description,
    };
}

export default async function ArtikelDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = isWpSlug(slug) ? await getPostBySlug(slug) : null;
    if (!post) notFound();

    // Phase 2: parallel fetch all supplemental data
    const [featuredImage, allCategories, tags, prevPost, nextPost, latestPosts] =
        await Promise.all([
            post.featured_media > 0 ? getMediaById(post.featured_media) : Promise.resolve(null),
            getCategories(),
            getTagsByIds(post.tags),
            getPrevPost(post.date),
            getNextPost(post.date),
            getLatestPosts(7),
        ]);

    const title = post.title.rendered;
    const content = post.content.rendered;
    const readTime = estimateReadTime(content);
    const date = new Date(post.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const postCategories = allCategories.filter((c) => post.categories.includes(c.id));

    // Featured image
    const imageUrl = featuredImage?.source_url ?? null;

    // Related posts: latest excluding current, fetch their images in parallel
    const related = latestPosts.filter((p) => p.slug !== slug).slice(0, 3);
    const relatedWithImages = await Promise.all(
        related.map(async (p) => {
            const img = p.featured_media > 0 ? await getMediaById(p.featured_media) : null;
            return { post: p, imageUrl: img?.source_url ?? null };
        }),
    );

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "Artikel", href: "/artikel" },
                { label: title },
            ]}
        >
            <Section py="sm">
                <article className="max-w-3xl mx-auto">

                    {/* ── Header ──────────────────────────────────────────── */}
                    <header className="flex flex-col gap-4 mb-8">
                        {/* Category badges */}
                        {postCategories.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {postCategories.map((c) => (
                                    <Link key={c.id} href={`/artikel?kategori=${c.slug}`}>
                                        <Badge
                                            variant="secondary"
                                            className="text-xs font-bold tracking-wide uppercase hover:bg-site-primary hover:text-white transition-colors cursor-pointer"
                                        >
                                            {c.name}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        )}

                        <h1
                            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 shrink-0" />
                                {date}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 shrink-0" />
                                {readTime} menit baca
                            </span>
                        </div>
                    </header>

                    {/* ── Featured image ───────────────────────────────────── */}
                    {imageUrl && (
                        <figure className="relative aspect-video w-full overflow-hidden rounded-2xl mb-10 shadow-site">
                            <Image
                                src={imageUrl}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 768px"
                                priority
                            />
                        </figure>
                    )}

                    {/* ── Article content ──────────────────────────────────── */}
                    <div
                        className="wp-content"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                    {/* ── Tags ─────────────────────────────────────────────── */}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-border">
                            <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                            {tags.map((tag) => (
                                <Link
                                    key={tag.id}
                                    href={`/artikel?q=${encodeURIComponent(tag.name)}`}
                                >
                                    <Badge
                                        variant="outline"
                                        className="text-xs hover:bg-secondary transition-colors cursor-pointer"
                                    >
                                        {tag.name}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* ── Prev / Next navigation ───────────────────────────── */}
                    <ArtikelNav
                        prev={prevPost ? { slug: prevPost.slug, title: prevPost.title.rendered } : null}
                        next={nextPost ? { slug: nextPost.slug, title: nextPost.title.rendered } : null}
                    />

                    {/* ── Back button ──────────────────────────────────────── */}
                    <div className="mt-8">
                        <Button asChild variant="outline" size="sm">
                            <Link href="/artikel">← Kembali ke Artikel</Link>
                        </Button>
                    </div>
                </article>
            </Section>

            {/* ── Related articles ──────────────────────────────────────────── */}
            {relatedWithImages.length > 0 && (
                <Section py="sm" className="bg-site-bg border-t border-border">
                    <h2 className="section-title mb-6">Artikel Lainnya</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {relatedWithImages.map(({ post: relPost, imageUrl: relImg }) => {
                            const relTitle = relPost.title.rendered;
                            const relExcerpt = relPost.excerpt.rendered.replace(/<[^>]+>/g, "");
                            const relDate = new Date(relPost.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            });
                            const relCategories = allCategories.filter((c) =>
                                relPost.categories.includes(c.id),
                            );
                            return (
                                <RelatedArtikelCard
                                    key={relPost.slug}
                                    href={`/artikel/${relPost.slug}`}
                                    title={relTitle}
                                    excerpt={relExcerpt}
                                    date={relDate}
                                    imageUrl={relImg}
                                    categoryName={relCategories[0]?.name}
                                />
                            );
                        })}
                    </div>
                </Section>
            )}
        </PageWrap>
    );
}
