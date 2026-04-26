"use client";

import { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GalleryLightbox } from "@/components/elements/gallery-lightbox";
import { parseGalleryPhotos } from "@/lib/utils";
import type { WpGalleryItem } from "@/types/wordpress";

interface GaleriPreviewGridProps {
    items: WpGalleryItem[];
}

type SelectedGallery = { item: WpGalleryItem; photos: string[] };

export function GaleriPreviewGrid({ items }: GaleriPreviewGridProps) {
    const [selected, setSelected] = useState<SelectedGallery | null>(null);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {items.map((item) => {
                    const photos = parseGalleryPhotos(item.gallery_photos);
                    const thumbnail = photos[0];
                    if (!thumbnail) return null;

                    return (
                        <button
                            key={item._ID}
                            onClick={() => setSelected({ item, photos })}
                            className="group relative overflow-hidden rounded-xl text-left cursor-pointer"
                            aria-label={`Buka galeri: ${item.gallery_title}`}
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
                                    <p className="text-sm font-semibold text-white leading-tight">
                                        {item.gallery_title}
                                    </p>
                                    {photos.length > 1 && (
                                        <p className="text-xs text-white/70 mt-0.5">{photos.length} foto</p>
                                    )}
                                </div>
                            </AspectRatio>
                        </button>
                    );
                })}
            </div>

            <GalleryLightbox
                item={selected?.item ?? null}
                photos={selected?.photos ?? []}
                onClose={() => setSelected(null)}
            />
        </>
    );
}
