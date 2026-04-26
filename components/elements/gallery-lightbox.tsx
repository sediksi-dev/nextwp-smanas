"use client";

import { useState, useEffect, useCallback } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WpGalleryItem } from "@/types/wordpress";

interface GalleryLightboxProps {
    item: WpGalleryItem | null;
    photos: string[];
    onClose: () => void;
}

export function GalleryLightbox({ item, photos, onClose }: GalleryLightboxProps) {
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        setCurrentIdx(0);
    }, [item]);

    const prev = useCallback(
        () => setCurrentIdx((i) => (i - 1 + photos.length) % photos.length),
        [photos.length],
    );
    const next = useCallback(
        () => setCurrentIdx((i) => (i + 1) % photos.length),
        [photos.length],
    );

    useEffect(() => {
        if (!item) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [item, prev, next]);

    return (
        <DialogPrimitive.Root open={!!item} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogPrimitive.Portal>
                {/* Overlay */}
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

                {/* Content */}
                <DialogPrimitive.Content
                    className={cn(
                        "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2",
                        "flex flex-col overflow-hidden rounded-2xl bg-gray-950 shadow-2xl",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                        "max-h-[90dvh]",
                    )}
                >
                    {/* ── Header ─────────────────────────────────────────── */}
                    <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-gray-900 px-4 py-3">
                        <DialogPrimitive.Title className="truncate pr-4 text-sm font-semibold text-white">
                            {item?.gallery_title}
                        </DialogPrimitive.Title>
                        <div className="flex shrink-0 items-center gap-3">
                            {photos.length > 1 && (
                                <span className="font-mono text-xs text-white/50">
                                    {currentIdx + 1} / {photos.length}
                                </span>
                            )}
                            <DialogPrimitive.Close className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Tutup</span>
                            </DialogPrimitive.Close>
                        </div>
                    </div>

                    {/* ── Main image ─────────────────────────────────────── */}
                    <div className="relative flex min-h-0 flex-1 items-center justify-center bg-gray-950">
                        {photos[currentIdx] && (
                            // eslint-disable-next-line @next/next-eslint/no-img-element
                            <img
                                key={currentIdx}
                                src={photos[currentIdx]}
                                alt={`${item?.gallery_title ?? "Foto"} ${currentIdx + 1}`}
                                className="max-h-[60dvh] max-w-full object-contain"
                            />
                        )}

                        {/* Nav arrows */}
                        {photos.length > 1 && (
                            <>
                                <button
                                    onClick={prev}
                                    aria-label="Foto sebelumnya"
                                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={next}
                                    aria-label="Foto selanjutnya"
                                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* ── Thumbnail strip ────────────────────────────────── */}
                    {photos.length > 1 && (
                        <div className="flex shrink-0 gap-2 overflow-x-auto bg-gray-900/80 p-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {photos.map((url, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIdx(i)}
                                    aria-label={`Foto ${i + 1}`}
                                    className={cn(
                                        "h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all",
                                        i === currentIdx
                                            ? "ring-2 ring-[var(--site-primary)] ring-offset-1 ring-offset-gray-900 opacity-100"
                                            : "opacity-40 hover:opacity-70",
                                    )}
                                >
                                    {/* eslint-disable-next-line @next/next-eslint/no-img-element */}
                                    <img src={url} alt="" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    {/* ── Description ────────────────────────────────────── */}
                    {item?.gallery_description && (
                        <div
                            className="shrink-0 overflow-y-auto border-t border-gray-800 bg-white px-4 py-3 text-sm text-gray-700 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 prose prose-sm max-w-none max-h-28"
                            dangerouslySetInnerHTML={{ __html: item.gallery_description }}
                        />
                    )}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
