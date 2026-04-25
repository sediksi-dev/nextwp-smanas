import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import Link from "next/link";
import { mockNews, mockEvents, mockInspirations } from "@/lib/mock-data";
import { SectionTitle } from "@/components/elements/section-title";
import { PostCardList } from "@/components/elements/post-card";

export function PostsSection() {
    return (
        <Section>
            <SectionTitle
                variant="badge"
                eyebrow="Informasi Terkini"
                title="Berita, Event & Inspirasi"
                description="Ikuti perkembangan terbaru, jadwal kegiatan, dan kisah inspiratif dari lingkungan sekolah."
                className="mb-12"
            />
            <div className="grid md:grid-cols-3 gap-10">

                <div className="flex flex-col gap-5">
                    <h3 className="text-base font-bold text-foreground pb-3 border-b border-border">Berita</h3>
                    <div className="flex flex-col divide-y divide-border">
                        {mockNews.map((post) => (
                            <div key={post.id} className="py-4 first:pt-0">
                                <PostCardList
                                    title={post.title}
                                    excerpt={post.excerpt}
                                    image={post.image}
                                    href={`/berita/${post.slug}`}
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
                    <h3 className="text-base font-bold text-foreground pb-3 border-b border-border">Event</h3>
                    <div className="flex flex-col divide-y divide-border">
                        {mockEvents.map((post) => (
                            <div key={post.id} className="py-4 first:pt-0">
                                <PostCardList
                                    title={post.title}
                                    excerpt={post.excerpt}
                                    href={`/agenda/${post.slug}`}
                                    date={post.date}
                                />
                            </div>
                        ))}
                    </div>
                    <Button asChild variant="outline" className="self-start">
                        <Link href="/agenda">Lihat Semua Event</Link>
                    </Button>
                </div>

                <div className="flex flex-col gap-5">
                    <h3 className="text-base font-bold text-foreground pb-3 border-b border-border">Inspirasi</h3>
                    <div className="flex flex-col divide-y divide-border">
                        {mockInspirations.map((insp, index) => (
                            <div key={index} className="py-4 first:pt-0">
                                <PostCardList
                                    title={insp.title}
                                    excerpt={insp.excerpt}
                                    href={`/inspirasi/${insp.slug}`}
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
