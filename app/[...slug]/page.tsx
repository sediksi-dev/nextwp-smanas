import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getPageBySlug, getPostBySlug, getMediaById } from "@/lib/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";

interface Props {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const leafSlug = slug[slug.length - 1];
    const page = await getPageBySlug(leafSlug);
    if (!page) return { title: "Halaman Tidak Ditemukan | SMA Nasional Malang" };

    const title = page.title.rendered;
    const description = page.excerpt?.rendered
        ? page.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160)
        : undefined;
    return {
        title: `${title} | SMA Nasional Malang`,
        description,
    };
}

export default async function CatchAllPage({ params }: Props) {
    const { slug } = await params;

    // Try the leaf segment first; WordPress REST API matches page slugs, not full paths.
    const leafSlug = slug[slug.length - 1];

    // If slug belongs to a post (post_type=post), redirect to /artikel/{slug}
    const post = await getPostBySlug(leafSlug);
    if (post) redirect(`/artikel/${post.slug}`);

    const page = await getPageBySlug(leafSlug);
    if (!page) notFound();

    const title = page.title.rendered;
    const content = page.content.rendered;

    const featuredImage =
        page.featured_media > 0 ? await getMediaById(page.featured_media) : null;

    // Build breadcrumb from URL segments
    const breadcrumb = [
        { label: "Beranda", href: "/" },
        ...slug.slice(0, -1).map((segment, i) => ({
            label: segment.replace(/-/g, " "),
            href: "/" + slug.slice(0, i + 1).join("/"),
        })),
        { label: title },
    ];

    return (
        <PageWrap breadcrumb={breadcrumb}>
            <Section py="sm">
                <article className="max-w-3xl mx-auto">

                    {/* ── Header ─────────────────────────────────────────── */}
                    <header className="mb-8">
                        <h1
                            className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    </header>

                    {/* ── Featured image ─────────────────────────────────── */}
                    {featuredImage && (
                        <figure className="relative aspect-video w-full overflow-hidden rounded-2xl mb-10 shadow-site">
                            <Image
                                src={featuredImage.source_url}
                                alt={featuredImage.alt_text || title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 768px"
                                priority
                            />
                        </figure>
                    )}

                    {/* ── Page content ───────────────────────────────────── */}
                    <div
                        className="wp-content"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                </article>
            </Section>
        </PageWrap>
    );
}
