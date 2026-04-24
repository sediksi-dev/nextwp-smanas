import { mockGallery, type GalleryVideo } from "@/lib/mock/gallery";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import PageHeading from "@/components/elements/page-heading";

export const revalidate = 7200;

export const metadata = {
    title: "Galeri Video",
    description: "Kumpulan video dokumentasi kegiatan dan prestasi SMA Nasional Malang di YouTube.",
};

export default function GaleriVideoPage() {
    const videos = mockGallery.filter((item): item is GalleryVideo => item.type === "Video");

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Galeri", href: "/galeri" }, { label: "Video" }]}>
            <PageHeading
                title="Galeri Video"
                subtitle="Dokumentasi"
                description="Video profil sekolah dan dokumentasi kegiatan SMA Nasional Malang."
            />
            <Section py="none" className="pb-12">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                        <div key={video.title} className="surface overflow-hidden flex flex-col">
                            <div className="relative aspect-video w-full overflow-hidden bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 h-full w-full border-0"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="font-bold leading-snug text-sm">{video.title}</h2>
                                {video.description && (
                                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
