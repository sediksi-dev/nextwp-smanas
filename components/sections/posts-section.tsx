import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import Link from "next/link";
import { mockNews, mockEvents, mockInspirations } from "@/lib/mock-data";
import { SectionTitle } from "@/components/elements/section-title";
import { PostCardList } from "@/components/elements/post-card";
import { getPostsByCategory } from "@/lib/wordpress";

interface PostsSectionProps {
    article_section_title?: string;
    article_section_description?: string;
    article_section_eyebrow?: string;
    article_count?: number;
    article_groups?: {
        group1?: {
            title?: string;
            category: {
                id: number;
                name: string;
                slug: string;
            };
        },
        group2?: {
            title?: string;
            category: {
                id: number;
                name: string;
                slug: string;
            };
        },
        group3?: {
            title?: string;
            category: {
                id: number;
                name: string;
                slug: string;
            };
        },
    }
}
const DEFAULT_CATEGORY = {
    id: 1,
    name: "Berita",
    slug: "berita",
}
const DEFAULT_ARTICLE_COUNT = 3;

export async function PostsSection(props: PostsSectionProps) {
    const articlesGroup1 = await getPostsByCategory(
        String(props.article_groups?.group1?.category.id) || String(DEFAULT_CATEGORY.id),
        props.article_count || DEFAULT_ARTICLE_COUNT
    );
    const articlesGroup2 = await getPostsByCategory(
        String(props.article_groups?.group2?.category.id) || String(DEFAULT_CATEGORY.id),
        props.article_count || DEFAULT_ARTICLE_COUNT
    );
    const articlesGroup3 = await getPostsByCategory(
        String(props.article_groups?.group3?.category.id) || String(DEFAULT_CATEGORY.id),
        props.article_count || DEFAULT_ARTICLE_COUNT
    );



    return (
        <Section>
            <SectionTitle
                variant="badge"
                eyebrow={props.article_section_eyebrow || "Informasi Terkini"}
                title={props.article_section_title || "Berita, Event & Inspirasi"}
                description={props.article_section_description || "Ikuti perkembangan terbaru, jadwal kegiatan, dan kisah inspiratif dari lingkungan sekolah."}
                className="mb-12"
            />
            <div className="grid md:grid-cols-3 gap-10">

                <div className="flex flex-col gap-5">
                    <h3 className="text-base font-bold text-foreground pb-3 border-b border-border">
                        {props.article_groups?.group1?.title || "Agenda"}
                    </h3>
                    <div className="flex flex-col divide-y divide-border">
                        {articlesGroup1.map((post) => (
                            <div key={post.id} className="py-4 first:pt-0">
                                <PostCardList
                                    title={post.title.rendered}
                                    excerpt={post.excerpt.rendered || ""}
                                    image_id={Number(post.featured_media) || undefined}
                                    href={`/artikel/${post.slug}`}
                                    date={post.date}
                                />
                            </div>
                        ))}
                    </div>
                    <Button asChild variant="outline" className="self-start">
                        <Link href="/berita">Lihat Semua Berita</Link>
                    </Button>
                </div>

                <div className="flex flex-col gap-5">
                    <h3 className="text-base font-bold text-foreground pb-3 border-b border-border">
                        {props.article_groups?.group2?.title || "Event"}
                    </h3>
                    <div className="flex flex-col divide-y divide-border">
                        {articlesGroup2.map((post) => (
                            <div key={post.id} className="py-4 first:pt-0">
                                <PostCardList
                                    title={post.title.rendered}
                                    excerpt={post.excerpt.rendered || ""}
                                    image_id={Number(post.featured_media) || undefined}
                                    href={`/artikel/${post.slug}`}
                                    date={post.date}
                                />
                            </div>
                        ))}
                    </div>
                    <Button asChild variant="outline" className="self-start">
                        <Link href="/artikel">Lihat Semua Event</Link>
                    </Button>
                </div>

                <div className="flex flex-col gap-5">
                    <h3 className="text-base font-bold text-foreground pb-3 border-b border-border">
                        {props.article_groups?.group3?.title || "Inspirasi"}
                    </h3>
                    <div className="flex flex-col divide-y divide-border">
                        {articlesGroup3.map((post) => (
                            <div key={post.id} className="py-4 first:pt-0">
                                <PostCardList
                                    title={post.title.rendered}
                                    excerpt={post.excerpt.rendered || ""}
                                    image_id={Number(post.featured_media) || undefined}
                                    href={`/artikel/${post.slug}`}
                                    date={post.date}
                                />
                            </div>
                        ))}
                    </div>
                    <Button asChild variant="outline" className="self-start">
                        <Link href="/inspirasi">Lihat Semua Inspirasi</Link>
                    </Button>
                </div>

            </div>
        </Section>
    );
}
