import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getLatestPosts } from "@/lib/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPosts } from "@/lib/mock/posts";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return mockPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: "Artikel tidak ditemukan | SMA Nasional Malang" };
    }

    const title =
        typeof post.title === "string" ? post.title : post.title.rendered;
    const description =
        typeof post.excerpt === "string"
            ? post.excerpt
            : post.excerpt.rendered.replace(/<[^>]+>/g, "");

    return {
        title: `${title} | SMA Nasional Malang`,
        description,
    };
}

export default async function ArtikelDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) notFound();

    const title =
        typeof post.title === "string" ? post.title : post.title.rendered;
    const content =
        typeof post.content === "string"
            ? post.content
            : post.content.rendered;
    const date = new Date(post.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Related: latest 3 posts excluding current
    const allPosts = await getLatestPosts(7);
    const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

    // Find the mock post for image (WordPress API may not return featured image in this simple setup)
    const mockPost = mockPosts.find((p) => p.slug === slug);

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "Artikel", href: "/artikel" },
                { label: title },
            ]}
        >
            <Section py="sm">
                <article className="max-w-3xl mx-auto flex flex-col gap-6">
                    {/* Header */}
                    <header className="flex flex-col gap-3">
                        <p className="text-xs text-muted-foreground">{date}</p>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-foreground">
                            {title}
                        </h1>
                    </header>

                    {/* Featured image */}
                    {mockPost?.image && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                            <Image
                                src={mockPost.image}
                                alt={title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 768px"
                                priority
                            />
                        </div>
                    )}

                    {/* Body */}
                    <div
                        className="prose prose-sm md:prose-base max-w-none text-foreground/80 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                    {/* Back link */}
                    <div className="pt-6 border-t border-border">
                        <Button asChild variant="outline" size="sm">
                            <Link href="/artikel">&larr; Kembali ke Artikel</Link>
                        </Button>
                    </div>
                </article>
            </Section>

            {/* Related posts */}
            {related.length > 0 && (
                <Section py="sm">
                    <h2 className="text-lg font-bold text-foreground mb-6">Artikel Lainnya</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {related.map((relPost) => {
                            const relTitle =
                                typeof relPost.title === "string"
                                    ? relPost.title
                                    : relPost.title.rendered;
                            const relExcerpt =
                                typeof relPost.excerpt === "string"
                                    ? relPost.excerpt
                                    : relPost.excerpt.rendered.replace(/<[^>]+>/g, "");
                            const relMock = mockPosts.find((p) => p.slug === relPost.slug);
                            return (
                                <Link
                                    key={relPost.slug}
                                    href={`/artikel/${relPost.slug}`}
                                    className="surface flex flex-col gap-3 overflow-hidden group"
                                >
                                    {relMock?.image && (
                                        <div className="relative aspect-video w-full overflow-hidden">
                                            <Image
                                                src={relMock.image}
                                                alt={relTitle}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2 p-4">
                                        <Badge variant="secondary" className="text-xs self-start">
                                            {relMock?.category ?? "Artikel"}
                                        </Badge>
                                        <h3 className="font-bold text-sm leading-snug group-hover:text-site-primary transition-colors">
                                            {relTitle}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {relExcerpt}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </Section>
            )}
        </PageWrap>
    );
}
