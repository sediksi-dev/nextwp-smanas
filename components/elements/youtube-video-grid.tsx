"use client";

import { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { YoutubeVideo } from "@/lib/youtube";

function formatDate(iso: string): string {
    try {
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(new Date(iso));
    } catch {
        return "";
    }
}

function PlayBtn({ size = "md" }: { size?: "sm" | "md" }) {
    const dim = size === "sm" ? "h-9 w-9" : "h-16 w-16";
    const icon = size === "sm" ? "h-3.5 w-3.5" : "h-7 w-7";
    return (
        <span
            className={cn(
                "flex items-center justify-center rounded-full bg-red-600 shadow-xl",
                "ring-0 ring-red-400/40 transition-all duration-300 group-hover:ring-8",
                dim,
            )}
        >
            <svg viewBox="0 0 24 24" fill="white" className={cn("translate-x-0.5", icon)} aria-hidden="true">
                <path d="M8 5v14l11-7z" />
            </svg>
        </span>
    );
}

export function YoutubeVideoGrid({ videos }: { videos: YoutubeVideo[] }) {
    const [active, setActive] = useState(videos[0]);
    const [open, setOpen] = useState(false);


    return (
        <>
            {/* ── Playlist container ──────────────────────────────────── */}
            <div className="overflow-hidden rounded-2xl border border-site-border shadow-site md:grid md:grid-cols-[1fr_340px]">

                {/* ── Featured player (left) ───────────────────────────── */}
                {/* AspectRatio uses padding-top trick so it always sets a reliable height */}
                <div className="bg-black">
                    <button
                        onClick={() => setOpen(true)}
                        aria-label={"Putar: " + active.title}
                        className="group relative w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-site-accent"
                    >
                        <AspectRatio ratio={16 / 9}>
                            <Image
                                src={active.thumbnail}
                                alt={active.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 65vw"
                                className="object-cover brightness-75 transition-[brightness] duration-300 group-hover:brightness-90"
                            />
                            {/* Centered play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PlayBtn />
                            </div>
                            {/* Title overlay */}
                            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4 md:p-6">
                                <p className="line-clamp-2 text-base font-bold text-white md:text-xl">
                                    {active.title}
                                </p>
                                {active.publishedAt && (
                                    <p className="mt-1 text-xs text-white/60">{formatDate(active.publishedAt)}</p>
                                )}
                            </div>
                        </AspectRatio>
                    </button>
                </div>

                {/* ── Playlist sidebar (right) ─────────────────────────── */}
                {/* min-h-0 prevents sidebar from inflating row height; grid stretch gives definite height for flex-1 to scroll */}
                <div className="flex min-h-0 max-h-120 flex-col border-t border-site-border bg-white md:border-t-0 md:border-l">
                    {/* header */}
                    <div className="border-b border-site-border px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-site-muted">
                            Playlist · {videos.length} video
                        </p>
                    </div>

                    {/* scrollable list */}
                    <ul className="min-h-0 flex-1 overflow-y-auto">
                        {videos.map((video, i) => {
                            const isActive = video.id === active.id;
                            return (
                                <li key={video.id} className="border-b border-site-border/50 last:border-0">
                                    <button
                                        onClick={() => setActive(video)}
                                        className={cn(
                                            "group flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors",
                                            isActive ? "bg-site-primary/8" : "hover:bg-site-bg",
                                        )}
                                    >
                                        {/* thumbnail */}
                                        <div className="relative w-24 shrink-0 overflow-hidden rounded-lg">
                                            <AspectRatio ratio={16 / 9}>
                                                <Image
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    fill
                                                    sizes="96px"
                                                    className="object-cover"
                                                />
                                                {isActive && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                        <PlayBtn size="sm" />
                                                    </div>
                                                )}
                                            </AspectRatio>
                                        </div>

                                        {/* meta */}
                                        <div className="min-w-0 flex-1">
                                            <p
                                                className={cn(
                                                    "line-clamp-2 text-xs font-semibold leading-snug",
                                                    isActive
                                                        ? "text-site-primary"
                                                        : "text-site-text group-hover:text-site-primary",
                                                )}
                                            >
                                                {i + 1}. {video.title}
                                            </p>
                                            {video.publishedAt && (
                                                <p className="mt-1 text-[11px] text-site-muted">
                                                    {formatDate(video.publishedAt)}
                                                </p>
                                            )}
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {/* ── Dialog video player ──────────────────────────────────── */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className={cn(
                        "max-w-6xl border-0 bg-black p-0 shadow-2xl sm:rounded-2xl",
                    )}
                >
                    {/* Required for screen-reader accessibility */}
                    <DialogTitle className="sr-only">{active.title}</DialogTitle>
                    <AspectRatio ratio={16 / 9}>
                        {open && (
                            <iframe
                                src={"https://www.youtube.com/embed/" + active.id + "?autoplay=1&rel=0"}
                                title={active.title}
                                className="h-full w-full rounded-2xl"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        )}
                    </AspectRatio>
                </DialogContent>
            </Dialog>
        </>
    );
}
