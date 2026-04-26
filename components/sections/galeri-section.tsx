import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/elements/section-title";
import { getGalleryItemsPreview } from "@/lib/wordpress";
import { GaleriPreviewGrid } from "./galeri-preview-grid";

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

            <GaleriPreviewGrid items={items} />

            <div className="text-center mt-10">
                <Button asChild variant="outline">
                    <Link href="/galeri">Lihat Semua Galeri</Link>
                </Button>
            </div>
        </Section>
    );
}
