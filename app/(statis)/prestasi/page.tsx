"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import { cn } from "@/lib/utils";
import { mockAchievements } from "@/lib/mock-data";
import PageHeading from "@/components/elements/page-heading";

const allYears = Array.from(new Set(mockAchievements.map((a) => a.year)))
    .sort((a, b) => b - a)
    .map(String);

const allCategories = Array.from(new Set(mockAchievements.map((a) => a.category))).sort();

export default function PrestasiPage() {
    const [activeYear, setActiveYear] = useState<string>("Semua");
    const [activeCategory, setActiveCategory] = useState<string>("Semua");

    const filtered = useMemo(() => {
        return mockAchievements.filter((a) => {
            const yearMatch = activeYear === "Semua" || String(a.year) === activeYear;
            const catMatch = activeCategory === "Semua" || a.category === activeCategory;
            return yearMatch && catMatch;
        });
    }, [activeYear, activeCategory]);

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Prestasi" }]}>

            {/* Page heading — plain, no card */}
            <PageHeading
                title="Prestasi & Penghargaan"
                subtitle="Pencapaian"
                description="Daftar lengkap pencapaian akademik, olahraga, seni, teknologi, dan penghargaan institusi SMA Nasional Malang dari tahun ke tahun."
            />


            {/* Filters */}
            <Section py="sm">
                <div className="flex flex-col gap-4">
                    {/* Year filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground shrink-0 w-16">Tahun</span>
                        <div className="flex flex-wrap gap-2">
                            {["Semua", ...allYears].map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setActiveYear(year)}
                                    className={cn(
                                        "px-4 py-1 rounded-full text-sm font-semibold border transition-colors",
                                        activeYear === year
                                            ? "bg-site-primary text-white border-site-primary"
                                            : "bg-white border-site-border text-site-muted hover:border-site-primary hover:text-site-primary",
                                    )}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category filter */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground shrink-0 w-16">Kategori</span>
                        <div className="flex flex-wrap gap-2">
                            {["Semua", ...allCategories].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-4 py-1 rounded-full text-sm font-semibold border transition-colors",
                                        activeCategory === cat
                                            ? "bg-site-accent text-foreground border-site-accent"
                                            : "bg-white border-site-border text-site-muted hover:border-site-accent hover:text-foreground",
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Result count */}
                    <p className="text-xs text-muted-foreground">
                        Menampilkan{" "}
                        <span className="font-bold text-foreground">{filtered.length}</span>{" "}
                        prestasi
                        {activeYear !== "Semua" && (
                            <> tahun <span className="font-bold text-foreground">{activeYear}</span></>
                        )}
                        {activeCategory !== "Semua" && (
                            <> · kategori <span className="font-bold text-foreground">{activeCategory}</span></>
                        )}
                    </p>
                </div>
            </Section>

            {/* Photo grid */}
            <Section py="sm">
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {filtered.map((achievement, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden rounded-xl group aspect-square"
                            >
                                <Image
                                    src={achievement.image}
                                    alt={achievement.title}
                                    fill
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Category badge */}
                                <div className="absolute top-2 left-2 z-10">
                                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-site-accent text-foreground">
                                        {achievement.category}
                                    </span>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                    <span className="text-[10px] font-semibold tracking-wider uppercase text-white/70 mb-0.5">
                                        {achievement.year}
                                    </span>
                                    <p className="text-sm font-semibold text-white leading-snug">
                                        {achievement.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-muted-foreground text-sm">
                            Tidak ada prestasi untuk filter yang dipilih.
                        </p>
                        <button
                            onClick={() => { setActiveYear("Semua"); setActiveCategory("Semua"); }}
                            className="mt-4 text-site-primary text-sm font-semibold hover:underline"
                        >
                            Reset filter
                        </button>
                    </div>
                )}
            </Section>
        </PageWrap>
    );
}
