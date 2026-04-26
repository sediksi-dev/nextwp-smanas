import Link from "next/link";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/elements/section-title";
import { Button } from "@/components/ui/button";
import { getYoutubeVideos } from "@/lib/youtube";
import { YoutubeVideoGrid } from "../elements/youtube-video-grid";

const YtIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
);

interface YoutubeSectionProps {
    title: string;
    description?: string;
    eyebrow?: string;
    channelId: string;
    channelUrl: string;
}

export async function YoutubeSection({
    title,
    description,
    eyebrow,
    channelId,
    channelUrl = "https://www.youtube.com/@smanasionalmalang910/videos",
}: YoutubeSectionProps) {
    const videos = await getYoutubeVideos(5, channelId);
    if (!videos.length) return null;

    return (
        <Section py="sm">

            <SectionTitle
                variant="centered-bar"
                eyebrow={eyebrow}
                title={title}
                description={description}
            />

            {/* ── Playlist ─────────────────────────────────── */}
            <div className="mt-8">
                <YoutubeVideoGrid videos={videos} />
            </div>

            {/* ── CTA ──────────────────────────────────────── */}
            <div className="mt-8 flex justify-center">
                <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="gap-2 border-site-primary text-site-primary hover:bg-site-primary hover:text-white"
                >
                    <Link href={channelUrl} target="_blank" rel="noopener noreferrer">
                        <YtIcon />
                        Lihat Semua Video
                    </Link>
                </Button>
            </div>

        </Section>
    );
}

