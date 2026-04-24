import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import Image from "next/image";
import Link from "next/link";
import { mockNews, mockEvents, mockInspirations } from "@/lib/mock-data";

type PostCardProps = {
    title: string;
    excerpt: string;
    image: string;
    href: string;
    date?: string;
};

function PostCard({ title, excerpt, image, href, date }: PostCardProps) {
    return (
        <Link href={href} className="flex gap-3 group">
            <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-col justify-center gap-1 min-w-0">
                {date && <p className="text-xs text-muted-foreground">{date}</p>}
                <p className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">{excerpt}</p>
            </div>
        </Link>
    );
}

export function PostsSection() {
    return (
        <Section>
            <p className="text-xs font-bold tracking-widest uppercase text-primary text-center">
                Informasi Terkini
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
                Berita, Event &amp; Inspirasi
            </h2>
            <div className="grid md:grid-cols-3 gap-10">

                <div className="flex flex-col gap-5">
                    <h3 className="text-base font-bold text-foreground pb-3 border-b border-border">Berita</h3>
                    <div className="flex flex-col divide-y divide-border">
                        {mockNews.map((post) => (
                            <div key={post.id} className="py-4 first:pt-0">
                                <PostCard
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
                                <PostCard
                                    title={post.title}
                                    excerpt={post.excerpt}
                                    image={post.image}
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
                                <PostCard
                                    title={insp.title}
                                    excerpt={insp.excerpt}
                                    image={insp.image}
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
