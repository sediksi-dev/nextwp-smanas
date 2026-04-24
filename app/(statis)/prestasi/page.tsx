import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import { cn } from "@/lib/utils";
import { mockAchievements } from "@/lib/mock/achievements";
import PageHeading from "@/components/elements/page-heading";

const allYears = Array.from(new Set(mockAchievements.map((a) => a.year)))
    .sort((a, b) => b - a)
    .map(String);

const allCategories = Array.from(
    new Set(mockAchievements.map((a) => a.category))
).sort();

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ tahun?: string; kategori?: string }>;
}) {
    const { tahun, kategori } = await searchParams;
    const parts = ["Prestasi & Penghargaan"];
    if (tahun) parts.push(tahun);
    if (kategori) parts.push(kategori);
    return {
        title: `${parts.join(" — ")} | SMA Nasional Malang`,
        description:
            "Daftar lengkap pencapaian akademik, olahraga, seni, teknologi, dan penghargaan institusi SMA Nasional Malang.",
    };
}

export default async function PrestasiPage({
    searchParams,
}: {
    searchParams: Promise<{ tahun?: string; kategori?: string }>;
}) {
    const { tahun = "", kategori = "" } = await searchParams;

    const filtered = mockAchievements.filter((a) => {
        const yearMatch = !tahun || String(a.year) === tahun;
        const catMatch = !kategori || a.category === kategori;
        return yearMatch && catMatch;
    });

    function filterHref(nextTahun: string, nextKategori: string) {
        const params = new URLSearchParams();
        if (nextTahun) params.set("tahun", nextTahun);
        if (nextKategori) params.set("kategori", nextKategori);
        const qs = params.toString();
        return qs ? `/prestasi?${qs}` : "/prestasi";
    }

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Prestasi" }]}>

            <PageHeading
                title="Prestasi & Penghargaan"
                subtitle="Pencapaian"
                description="Daftar lengkap pencapaian akademik, olahraga, seni, teknologi, dan penghargaan institusi SMA Nasional Malang dari tahun ke tahun."
            />

            {/* Filters */}
            <Section py="sm">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground shrink-0 w-16">Tahun</span>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={filterHref("", kategori)}
                                className={cn(
                                    "px-4 py-1 rounded-full text-sm font-semibold border transition-colors",
                                    !tahun
                                        ? "bg-site-primary text-white border-site-primary"
                                        : "bg-white border-site-border text-site-muted hover:border-site-primary hover:text-site-primary",
                                )}
                            >
                                Semua
                            </Link>
                            {allYears.map((year) => (
                                <Link
                                    key={year}
                                    href={filterHref(year, kategori)}
                                    className={cn(
                                        "px-4 py-1 rounded-full text-sm font-semibold border transition-colors",
                                        tahun === year
                                            ? "bg-site-primary text-white border-site-primary"
                                            : "bg-white border-site-border text-site-muted hover:border-site-primary hover:text-site-primary",
                                    )}
                                >
                                    {year}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground shrink-0 w-16">Kategori</span>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={filterHref(tahun, "")}
                                className={cn(
                                    "px-4 py-1 rounded-full text-sm font-semibold border transition-colors",
                                    !kategori
                                        ? "bg-site-accent text-foreground border-site-accent"
                                        : "bg-white border-site-border text-site-muted hover:border-site-accent hover:text-foreground",
                                )}
                            >
                                Semua
                            </Link>
                            {allCategories.map((cat) => (
                                <Link
                                    key={cat}
                                    href={filterHref(tahun, cat)}
                                    className={cn(
                                        "px-4 py-1 rounded-full text-sm font-semibold border transition-colors",
                                        kategori === cat
                                            ? "bg-site-accent text-foreground border-site-accent"
                                            : "bg-white border-site-border text-site-muted hover:border-site-accent hover:text-foreground",
                                    )}
                                >
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Menampilkan{" "}
                        <span className="font-bold text-foreground">{filtered.length}</span>{" "}
                        prestasi
                        {tahun && (
                            <> tahun <span className="font-bold text-foreground">{tahun}</span></>
                        )}
                        {kategori && (
                            <> &middot; kategori <span className="font-bold text-foreground">{kategori}</span></>
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
                                <div className="absolute top-2 left-2 z-10">
                                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-site-accent text-foreground">
                                        {achievement.category}
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
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-muted-foreground text-sm">
                            Tidak ada prestasi untuk filter yang dipilih.
                        </p>
                        <Link
                            href="/prestasi"
                            className="mt-4 inline-block text-site-primary text-sm font-semibold hover:underline"
                        >
                            Reset filter
                        </Link>
                    </div>
                )}
            </Section>
        </PageWrap>
    );
}
