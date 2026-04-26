"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { Achievement, AchievementScope } from "@/types/wordpress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SectionTitle } from "@/components/elements/section-title";

const SCOPE_LABELS: Record<string, string> = {
    kecamatan: "Kecamatan",
    regional: "Regional",
    provinsi: "Provinsi",
    nasional: "Nasional",
    internasional: "Internasional",
    lainnya: "Lainnya",
};

const scopes = ["nasional", "provinsi", "regional", "kecamatan", "lainnya"] as const;

function AchievementDialog({ achievement, onClose }: { achievement: Achievement | null; onClose: () => void }) {
    return (
        <Dialog open={!!achievement} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="max-w-md p-0 overflow-hidden">
                {achievement && (
                    <>
                        <div className="w-full">
                            <Image
                                src={achievement.image || ""}
                                alt={achievement.title}
                                width={448}
                                height={0}
                                sizes="(max-width: 768px) 100vw, 448px"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="p-5">
                            <DialogHeader>
                                <span className="text-xs font-semibold tracking-widest uppercase text-site-primary mb-1 block">
                                    {SCOPE_LABELS[achievement.scope] ?? achievement.scope}
                                </span>
                                <DialogTitle className="text-base font-bold leading-snug text-site-foreground">
                                    {achievement.title}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="mt-3 space-y-1">
                                {achievement.awardee && (
                                    <p className="text-sm text-site-muted">
                                        <span className="font-medium">Penerima:</span> {achievement.awardee}
                                    </p>
                                )}
                                {achievement.host && (
                                    <p className="text-sm text-site-muted">
                                        <span className="font-medium">Penyelenggara:</span> {achievement.host}
                                    </p>
                                )}
                                <p className="text-sm text-site-muted">
                                    <span className="font-medium">Tahun:</span> {achievement.year}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export interface PrestasiSectionProps {
    achievements: Achievement[];
    achievements_section_title: string;
    achievements_section_description?: string;
    achievements_section_eyebrow?: string;
}


export function PrestasiSection(props: PrestasiSectionProps) {
    const [activeScope, setActiveScope] = useState<AchievementScope>("regional");
    const [selected, setSelected] = useState<Achievement | null>(null);

    const filtered = props.achievements
        .filter((a) => a.scope === activeScope)
        .slice(0, 8);

    return (
        <Section py="sm">
            <SectionTitle
                variant="default"
                eyebrow={props.achievements_section_eyebrow}
                title={props.achievements_section_title}
                description={props.achievements_section_description}
                className="mb-6"
            />

            {/* Scope filter */}
            <div className="flex md:flex-wrap md:justify-center gap-2 mb-8 overflow-x-auto">
                {scopes.filter(scope => props.achievements.some(a => a.scope === scope)).map((scope) => (
                    <button
                        key={scope}
                        onClick={() => setActiveScope(scope)}
                        className={cn(
                            "px-5 py-1.5 rounded-full text-sm font-semibold border transition-colors",
                            activeScope === scope
                                ? "bg-site-primary text-white border-site-primary"
                                : "border-site-border text-site-muted hover:border-site-primary hover:text-site-primary bg-white"
                        )}
                    >
                        {SCOPE_LABELS[scope] ?? scope}
                    </button>
                ))}
            </div>

            {/* Photo grid — 1:1 ratio, title on hover */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {filtered.map((achievement, index) => (
                    <button
                        key={index}
                        onClick={() => setSelected(achievement)}
                        className="relative overflow-hidden rounded-xl group aspect-square text-left w-full"
                    >
                        <Image
                            src={achievement.image || ""}
                            alt={achievement.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                            <span className="text-xs font-semibold tracking-wider uppercase text-white/70 mb-0.5">{SCOPE_LABELS[achievement.scope] ?? achievement.scope}</span>
                            <p className="text-sm font-semibold text-white leading-snug">{achievement.title}</p>
                        </div>
                    </button>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-12">
                    Tidak ada prestasi untuk kategori ini.
                </p>
            )}

            <div className="text-center mt-8">
                <a
                    href="/prestasi"
                    className="text-site-primary font-semibold text-sm hover:underline inline-flex items-center gap-1.5"
                >
                    Daftar Lengkap Prestasi SMA Nasional Malang <span aria-hidden>»</span>
                </a>
            </div>

            {selected && (
                <AchievementDialog achievement={selected} onClose={() => setSelected(null)} />
            )}
        </Section>
    );
}
