"use client";

import { useState } from "react";
import Image from "next/image";
import { GalleryLightbox } from "@/components/elements/gallery-lightbox";
import { parseGalleryPhotos } from "@/lib/utils";
import type { WpGalleryItem } from "@/types/wordpress";

type SelectedGallery = { item: WpGalleryItem; photos: string[] };

interface GalleryGridProps {
    items: WpGalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
    const [selected, setSelected] = useState<SelectedGallery | null>(null);

    return (
        <>
            {items.length === 0 ? (
                <p className="py-16 text-center text-muted-foreground">Belum ada foto galeri.</p>
            ) : (
                <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
                    {items.map((item) => {
                        const photos = parseGalleryPhotos(item.gallery_photos);
                        const thumbnail = photos[0];
                        if (!thumbnail) return null;

                        return (
                            <button
                                key={item._ID}
                                onClick={() => setSelected({ item, photos })}
                                className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl text-left cursor-pointer"
                            >
                                <div className="relative aspect-4/3 w-full overflow-hidden">
                                    <Image
                                        src={thumbnail}
                                        alt={item.gallery_title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <p className="text-sm font-semibold text-white leading-tight">
                                            {item.gallery_title}
                                        </p>
                                        {photos.length > 1 && (
                                            <p className="text-xs text-white/70 mt-0.5">{photos.length} foto</p>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            <GalleryLightbox
                item={selected?.item ?? null}
                photos={selected?.photos ?? []}
                onClose={() => setSelected(null)}
            />
        </>
    );
}
