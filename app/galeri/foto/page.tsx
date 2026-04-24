import Image from "next/image";
import { mockGallery, GalleryPhoto } from "@/lib/mock-data";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";

export const revalidate = 7200;

export default function GaleriFotoPage() {
    const photos = mockGallery.filter((item): item is GalleryPhoto => item.type === "Foto");

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Galeri", href: "/galeri" }, { label: "Foto" }]}>
            <Section py="sm">
                <h1 className="section-title">Galeri Foto</h1>
                <p className="section-copy">Dokumentasi kegiatan dan momen berharga SMA Nasional Malang.</p>
            </Section>
            <Section py="none" className="pb-12">
                <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
                    {photos.map((photo) => (
                        <figure key={photo.title} className="surface mb-4 break-inside-avoid overflow-hidden">
                            <div className="relative w-full overflow-hidden">
                                <Image
                                    src={photo.image}
                                    alt={photo.title}
                                    width={800}
                                    height={600}
                                    className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            </div>
                            <figcaption className="px-3 py-2">
                                <p className="text-xs font-semibold leading-snug">{photo.title}</p>
                                {photo.caption && (
                                    <p className="mt-0.5 text-xs text-muted-foreground">{photo.caption}</p>
                                )}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
