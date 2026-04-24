"use client";

import { useState } from "react";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { mockAchievements } from "@/lib/mock-data";

const years = Array.from(new Set(mockAchievements.map((a) => a.year))).sort((a, b) => b - a).map(String);

export function PrestasiSection() {
    const [activeYear, setActiveYear] = useState(years[0]);

    const filtered = mockAchievements
        .filter((a) => String(a.year) === activeYear)
        .slice(0, 8);

    return (
        <Section>
            <p className="text-xs font-bold tracking-widest uppercase text-site-primary text-center">
                Penghargaan
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-center mb-6">
                Prestasi dan Penghargaan
            </h2>

            {/* Year filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        className={cn(
                            "px-5 py-1.5 rounded-full text-sm font-semibold border transition-colors",
                            activeYear === year
                                ? "bg-site-primary text-white border-site-primary"
                                : "border-site-border text-site-muted hover:border-site-primary hover:text-site-primary bg-white",
                        )}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Photo grid — 1:1 ratio, title on hover */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {filtered.map((achievement, index) => (
                    <div
                        key={index}
                        className="relative overflow-hidden rounded-xl group aspect-square"
                    >
                        <Image
                            src={achievement.image}
                            alt={achievement.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                            <span className="text-[10px] font-semibold tracking-wider uppercase text-white/70 mb-0.5">{achievement.category}</span>
                            <p className="text-sm font-semibold text-white leading-snug">{achievement.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-12">
                    Tidak ada prestasi untuk tahun ini.
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
        </Section>
    );
}
