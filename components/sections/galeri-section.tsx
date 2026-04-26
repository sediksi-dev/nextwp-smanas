import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "@/components/elements/section-title";
import { getGalleryItemsPreview } from "@/lib/wordpress";
import { GaleriPreviewGrid } from "./galeri-preview-grid";

interface GaleriSectionProps {
    title: string;
    description?: string;
    eyebrow?: string;
}

export async function GaleriSection({ title, description, eyebrow }: GaleriSectionProps) {
    const items = await getGalleryItemsPreview(6);

    return (
        <Section py="sm">
            <SectionTitle
                variant="underline"
                eyebrow={eyebrow}
                title={title}
                description={description}
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
