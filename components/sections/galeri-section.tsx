"use client";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { mockGallery } from "@/lib/mock-data";
import { SectionTitle } from "@/components/elements/section-title";

const FILTERS = ["Semua", "Foto", "Video"] as const;
type Filter = typeof FILTERS[number];

export function GaleriSection() {
    const [active, setActive] = useState<Filter>("Semua");
    const filtered = active === "Semua" ? mockGallery : mockGallery.filter(g => g.type === active);

    return (
        <Section className="bg-site-bg">
            <SectionTitle
                variant="underline"
                eyebrow="Dokumentasi"
                title="Galeri Sekolah"
                description="Momen dan kenangan berharga dalam berbagai kegiatan di SMA Nasional Malang."
            />

            {/* Filter tabs */}
            <div className="flex justify-center gap-2 mb-8">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setActive(f)}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                            active === f
                                ? "bg-site-primary text-white"
                                : "bg-white border border-site-border text-site-muted hover:border-site-primary hover:text-site-primary"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filtered.map((item) => (
                    <Link
                        key={item.title}
                        href="/galeri"
                        className="group relative overflow-hidden rounded-xl"
                    >
                        <AspectRatio ratio={4 / 3}>
                            <Image
                                src={item.type === "Video" ? `https://img.youtube.com/vi/${item.youtubeId}/mqdefault.jpg` : item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Video play button */}
                            {item.type === "Video" && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:bg-site-primary/80 transition-colors">
                                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                    </div>
                                </div>
                            )}

                            {/* Title overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                <span className="text-xs font-semibold tracking-wider uppercase text-white/70 mb-0.5 block">{item.type}</span>
                                <p className="text-sm font-semibold text-white leading-tight">{item.title}</p>
                            </div>
                        </AspectRatio>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-10">
                <Button asChild variant="outline">
                    <Link href="/galeri">Lihat Semua Galeri</Link>
                </Button>
            </div>
        </Section>
    );
}
