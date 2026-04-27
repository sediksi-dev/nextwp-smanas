"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/types/wordpress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const SCOPE_LABELS: Record<string, string> = {
    nasional: "Nasional",
    provinsi: "Provinsi",
    regional: "Regional",
    kecamatan: "Kecamatan",
    internasional: "Internasional",
    lainnya: "Lainnya",
};

function AchievementDialog({
    achievement,
    onClose,
}: {
    achievement: Achievement | null;
    onClose: () => void;
}) {
    return (
        <Dialog open={!!achievement} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="max-w-md p-0 overflow-hidden">
                {achievement && (
                    <>
                        {achievement.image && (
                            <div className="w-full">
                                <Image
                                    src={achievement.image}
                                    alt={achievement.title}
                                    width={448}
                                    height={0}
                                    sizes="(max-width: 768px) 100vw, 448px"
                                    className="w-full h-auto"
                                />
                            </div>
                        )}
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

type ViewMode = "grid" | "list" | "plain";

interface AchievementsViewProps {
    achievements: Achievement[];
    viewMode: ViewMode;
    startIndex?: number;
}

export function AchievementsView({ achievements, viewMode, startIndex = 0 }: AchievementsViewProps) {
    const [selected, setSelected] = useState<Achievement | null>(null);

    return (
        <>
            {/* Grid view */}
            {viewMode === "grid" && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {achievements.map((achievement, index) =>
                        achievement.image ? (
                            <button
                                key={index}
                                onClick={() => setSelected(achievement)}
                                className="relative overflow-hidden rounded-xl group aspect-square text-left w-full"
                            >
                                <Image
                                    src={achievement.image}
                                    alt={achievement.title}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2 z-10">
                                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-site-accent text-foreground">
                                        {SCOPE_LABELS[achievement.scope] ?? achievement.scope}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                    <span className="text-xs font-semibold tracking-wider uppercase text-white/70 mb-0.5">
                                        {achievement.year}
                                    </span>
                                    <p className="text-sm font-semibold text-white leading-snug">
                                        {achievement.title}
                                    </p>
                                </div>
                            </button>
                        ) : (
                            <button
                                key={index}
                                onClick={() => setSelected(achievement)}
                                className="rounded-xl border border-site-border bg-white p-4 flex flex-col justify-between aspect-square text-left w-full hover:border-site-primary transition-colors"
                            >
                                <span className="inline-block self-start px-2 py-0.5 rounded-full text-xs font-bold bg-site-accent text-foreground">
                                    {SCOPE_LABELS[achievement.scope] ?? achievement.scope}
                                </span>
                                <p className="text-sm font-semibold text-site-foreground leading-snug flex-1 py-2">
                                    {achievement.title}
                                </p>
                                <div className="text-xs text-site-muted space-y-0.5">
                                    {achievement.awardee && <p>{achievement.awardee}</p>}
                                    <p className="font-medium">{achievement.year}</p>
                                </div>
                            </button>
                        )
                    )}
                </div>
            )}

            {/* List view */}
            {viewMode === "list" && (
                <div className="flex flex-col divide-y divide-site-border border border-site-border rounded-xl overflow-hidden">
                    {achievements.map((achievement, index) => (
                        <button
                            key={index}
                            onClick={() => setSelected(achievement)}
                            className="flex items-center gap-4 bg-white px-4 py-3 hover:bg-gray-50 transition-colors text-left w-full"
                        >
                            {achievement.image ? (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                    <Image
                                        src={achievement.image}
                                        alt={achievement.title}
                                        fill
                                        sizes="64px"
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-lg bg-site-accent/20 shrink-0 flex items-center justify-center text-site-accent text-xl font-bold">
                                    {String(achievement.year).slice(-2)}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-site-foreground leading-snug line-clamp-2">
                                    {achievement.title}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-1 text-xs text-site-muted">
                                    <span className="px-1.5 py-0.5 rounded bg-site-accent/20 text-foreground font-medium">
                                        {SCOPE_LABELS[achievement.scope] ?? achievement.scope}
                                    </span>
                                    {achievement.awardee && <span>{achievement.awardee}</span>}
                                    {achievement.host && <span className="truncate">{achievement.host}</span>}
                                </div>
                            </div>
                            <span className="text-xs font-semibold text-site-muted shrink-0">
                                {achievement.year}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Plain view — all results, no pagination */}
            {viewMode === "plain" && (
                <ol className="space-y-1 text-sm">
                    {achievements.map((achievement, index) => (
                        <li key={index} className="border-b border-site-border/50 last:border-0">
                            <button
                                onClick={() => setSelected(achievement)}
                                className="flex gap-3 py-1.5 w-full text-left hover:text-site-primary transition-colors"
                            >
                                <span className="text-site-muted shrink-0 w-6 text-right">
                                    {startIndex + index + 1}.
                                </span>
                                <span className="flex-1">
                                    {achievement.title}
                                    {achievement.awardee && (
                                        <span className="text-site-muted"> — {achievement.awardee}</span>
                                    )}
                                </span>
                                <span className="text-site-muted shrink-0">
                                    {SCOPE_LABELS[achievement.scope] ?? achievement.scope}, {achievement.year}
                                </span>
                            </button>
                        </li>
                    ))}
                </ol>
            )}

            <AchievementDialog achievement={selected} onClose={() => setSelected(null)} />
        </>
    );
}
