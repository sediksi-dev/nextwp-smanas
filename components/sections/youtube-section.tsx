import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/elements/section-title";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getYoutubeVideos } from "@/lib/youtube";

function PlayIcon() {
    return (
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md">
            {/* triangle */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 translate-x-0.5 text-red-600" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
            </svg>
        </span>
    );
}

function formatDate(iso: string): string {
    try {
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(iso));
    } catch {
        return "";
    }
}

export async function YoutubeSection() {
    const videos = await getYoutubeVideos(6);
    if (videos.length === 0) return null;

    return (
        <Section className="bg-white">
            <SectionTitle
                variant="centered-bar"
                eyebrow="Channel YouTube"
                title="Video Terbaru SMANAS"
                description="Saksikan berbagai dokumentasi kegiatan, prestasi, dan momen terbaik SMA Nasional Malang."
            />

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                    <a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col overflow-hidden rounded-xl border border-site-border bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                        {/* Thumbnail */}
                        <div className="relative overflow-hidden">
                            <AspectRatio ratio={16 / 9}>
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <PlayIcon />
                                </div>
                            </AspectRatio>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-1 flex-col gap-1 p-4">
                            <p className="line-clamp-2 text-sm font-semibold leading-snug text-site-text group-hover:text-site-primary">
                                {video.title}
                            </p>
                            {video.publishedAt && (
                                <p className="mt-auto pt-2 text-xs text-site-muted">
                                    {formatDate(video.publishedAt)}
                                </p>
                            )}
                        </div>
                    </a>
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <Button asChild variant="outline" size="lg" className="border-site-primary text-site-primary hover:bg-site-primary hover:text-white">
                    <Link
                        href="https://www.youtube.com/@smanasionalmalang910/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Lihat Semua Video
                        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-2 h-4 w-4" aria-hidden="true">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                            <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                        </svg>
                    </Link>
                </Button>
            </div>
        </Section>
    );
}
