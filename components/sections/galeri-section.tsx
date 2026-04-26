import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/elements/section-title";
import { getGalleryItemsPreview, parseGalleryPhotos } from "@/lib/wordpress";

export async function GaleriSection() {
    const items = await getGalleryItemsPreview(6);

    return (
        <Section py="sm">
            <SectionTitle
                variant="underline"
                eyebrow="Dokumentasi"
                title="Galeri Sekolah"
                description="Momen dan kenangan berharga dalam berbagai kegiatan di SMA Nasional Malang."
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {items.map((item) => {
                    const photos = parseGalleryPhotos(item.gallery_photos);
                    const thumbnail = photos[0];
                    if (!thumbnail) return null;

                    return (
                        <Link
                            key={item._ID}
                            href="/galeri"
                            className="group relative overflow-hidden rounded-xl"
                        >
                            <AspectRatio ratio={4 / 3}>
                                <Image
                                    src={thumbnail}
                                    alt={item.gallery_title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="text-sm font-semibold text-white leading-tight">{item.gallery_title}</p>
                                </div>
                            </AspectRatio>
                        </Link>
                    );
                })}
            </div>

            <div className="text-center mt-10">
                <Button asChild variant="outline">
                    <Link href="/galeri">Lihat Semua Galeri</Link>
                </Button>
            </div>
        </Section>
    );
}
