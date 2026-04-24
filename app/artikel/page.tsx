import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { mockPosts } from "@/lib/mock/posts";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ kategori?: string }>;
}): Promise<Metadata> {
    const { kategori } = await searchParams;
    const title = kategori ? `${kategori} — Artikel` : "Artikel & Informasi";
    return {
        title,
        description: `Baca berita, agenda, karya, dan informasi terbaru dari SMA Nasional Malang${kategori ? ` kategori ${kategori}` : ""
            }.`,
    };
}

const tabs = [
    { label: "Semua", value: "" },
    { label: "Berita", value: "Berita" },
    { label: "Agenda", value: "Agenda" },
    { label: "Inspirasi", value: "Inspirasi" },
    { label: "Kliping Media", value: "Kliping Media" },
    { label: "Karya Siswa", value: "Karya Siswa" },
    { label: "Karya Guru", value: "Karya Guru" },
    { label: "Ekskul", value: "Ekskul" },
];

export default async function ArtikelPage({
    searchParams,
}: {
    searchParams: Promise<{ kategori?: string }>;
}) {
    const { kategori = "" } = await searchParams;

    const posts = kategori
        ? mockPosts.filter((p) => p.category === kategori)
        : mockPosts;

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Artikel" }]}>
            <PageHeading
                title="Artikel & Informasi"
                subtitle="Informasi Sekolah"
                description="Berita, agenda, karya, ekskul, dan informasi sekolah."
            />

            <div className="container">
                <div className="flex flex-wrap gap-2 border-b border-border pb-4 mb-8">
                    {tabs.map((tab) => {
                        const isActive = kategori === tab.value;
                        const href = tab.value ? `/artikel?kategori=${encodeURIComponent(tab.value)}` : "/artikel";
                        return (
                            <Button key={tab.value} asChild variant={isActive ? "default" : "outline"} size="sm">
                                <Link href={href}>{tab.label}</Link>
                            </Button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="surface flex flex-col overflow-hidden">
                            <div className="relative aspect-video w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-300 hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(post.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                    </span>
                                </div>
                                <h2 className="font-bold leading-snug">{post.title}</h2>
                                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                                <Button asChild variant="link" size="sm" className="mt-auto self-start px-0">
                                    <Link href={`/artikel/${post.slug}`}>Baca selengkapnya &rarr;</Link>
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </PageWrap>
    );
}
