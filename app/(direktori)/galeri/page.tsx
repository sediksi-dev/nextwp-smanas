import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getGalleryItemsPaginated } from "@/lib/wordpress";
import { parsePageParam } from "@/lib/utils";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import PageHeading from "@/components/elements/page-heading";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "./_components/gallery-grid";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Galeri Foto",
    description: "Kumpulan foto dokumentasi kegiatan SMA Nasional Malang.",
};

export default async function GaleriPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page: pageStr } = await searchParams;
    const page = parsePageParam(pageStr);
    const { items, totalPages } = await getGalleryItemsPaginated(page, 12);

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Galeri" }]}>
            <PageHeading
                title="Galeri Foto"
                subtitle="Dokumentasi"
                description="Kumpulan foto dokumentasi kegiatan SMA Nasional Malang."
            />
            <Section py="none" className="pb-12">
                <GalleryGrid items={items} />

                {totalPages > 1 && (
                    <div className="mt-10 flex items-center justify-center gap-3">
                        {page > 1 && (
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/galeri?page=${page - 1}`}>
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Sebelumnya
                                </Link>
                            </Button>
                        )}
                        <span className="text-sm text-muted-foreground px-2">
                            Halaman {page} dari {totalPages}
                        </span>
                        {page < totalPages && (
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/galeri?page=${page + 1}`}>
                                    Selanjutnya
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </Button>
                        )}
                    </div>
                )}
            </Section>
        </PageWrap>
    );
}
