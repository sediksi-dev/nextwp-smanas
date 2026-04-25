import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import { cn } from "@/lib/utils";
import { getAllAchievements } from "@/lib/wordpress";
import PageHeading from "@/components/elements/page-heading";
import type { Achievement } from "@/types/wordpress";
import { SearchAndViewControls } from "./_components/search-view-controls";

const SCOPE_LABELS: Record<string, string> = {
    nasional: "Nasional",
    provinsi: "Provinsi",
    regional: "Regional",
    kecamatan: "Kecamatan",
    lainnya: "Lainnya",
};

const SCOPE_ORDER = ["nasional", "provinsi", "regional", "kecamatan", "lainnya"];

const PER_PAGE = 24;

type ViewMode = "grid" | "list" | "plain";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ tahun?: string; scope?: string; q?: string }>;
}) {
    const { tahun, scope, q } = await searchParams;
    const parts = ["Prestasi & Penghargaan"];
    if (tahun) parts.push(tahun);
    if (scope) parts.push(SCOPE_LABELS[scope] ?? scope);
    if (q) parts.push(`"${q}"`);
    return {
        title: `${parts.join(" — ")} | SMA Nasional Malang`,
        description:
            "Daftar lengkap pencapaian akademik, olahraga, seni, teknologi, dan penghargaan institusi SMA Nasional Malang.",
    };
}

export default async function PrestasiPage({
    searchParams,
}: {
    searchParams: Promise<{ tahun?: string; scope?: string; page?: string; q?: string; view?: string }>;
}) {
    const { tahun = "", scope = "", page = "1", q = "", view = "grid" } = await searchParams;
    const currentPage = Math.max(1, Number(page) || 1);
    const viewMode = (["grid", "list", "plain"].includes(view) ? view : "grid") as ViewMode;

    const allData = (await getAllAchievements()) as Achievement[];

    const allYears = Array.from(new Set(allData.map((a) => String(a.year)))).sort(
        (a, b) => Number(b) - Number(a)
    );
    const availableScopes = SCOPE_ORDER.filter((s) =>
        allData.some((a) => a.scope === s)
    );

    const searchQuery = q.toLowerCase().trim();

    const filtered = allData.filter((a) => {
        const yearMatch = !tahun || String(a.year) === tahun;
        const scopeMatch = !scope || a.scope === scope;
        const searchMatch =
            !searchQuery ||
            a.title.toLowerCase().includes(searchQuery) ||
            (a.awardee ?? "").toLowerCase().includes(searchQuery) ||
            (a.host ?? "").toLowerCase().includes(searchQuery);
        return yearMatch && scopeMatch && searchMatch;
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    function filterHref(nextTahun: string, nextScope: string, nextPage = "1") {
        const params = new URLSearchParams();
        if (nextTahun) params.set("tahun", nextTahun);
        if (nextScope) params.set("scope", nextScope);
        if (nextPage !== "1") params.set("page", nextPage);
        if (q) params.set("q", q);
        if (view && view !== "grid") params.set("view", view);
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
                    {/* Search + View toggle */}
                    <Suspense>
                        <SearchAndViewControls defaultSearch={q} defaultView={viewMode} />
                    </Suspense>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground shrink-0 w-16">Tahun</span>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={filterHref("", scope)}
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
                                    href={filterHref(year, scope)}
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
                        <span className="text-xs font-semibold text-muted-foreground shrink-0 w-16">Lingkup</span>
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={filterHref(tahun, "")}
                                className={cn(
                                    "px-4 py-1 rounded-full text-sm font-semibold border transition-colors",
                                    !scope
                                        ? "bg-site-accent text-foreground border-site-accent"
                                        : "bg-white border-site-border text-site-muted hover:border-site-accent hover:text-foreground",
                                )}
                            >
                                Semua
                            </Link>
                            {availableScopes.map((s) => (
                                <Link
                                    key={s}
                                    href={filterHref(tahun, s)}
                                    className={cn(
                                        "px-4 py-1 rounded-full text-sm font-semibold border transition-colors",
                                        scope === s
                                            ? "bg-site-accent text-foreground border-site-accent"
                                            : "bg-white border-site-border text-site-muted hover:border-site-accent hover:text-foreground",
                                    )}
                                >
                                    {SCOPE_LABELS[s] ?? s}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Menampilkan{" "}
                        <span className="font-bold text-foreground">{filtered.length}</span>{" "}
                        prestasi
                        {tahun && <> tahun <span className="font-bold text-foreground">{tahun}</span></>}
                        {scope && <> &middot; lingkup <span className="font-bold text-foreground">{SCOPE_LABELS[scope] ?? scope}</span></>}
                        {searchQuery && <> &middot; pencarian <span className="font-bold text-foreground">&ldquo;{q}&rdquo;</span></>}
                    </p>
                </div>
            </Section>

            {/* Results */}
            <Section py="sm">
                {paginated.length > 0 ? (
                    <>
                        {/* Grid view */}
                        {viewMode === "grid" && (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {paginated.map((achievement, index) =>
                                    achievement.image ? (
                                        <div key={index} className="relative overflow-hidden rounded-xl group aspect-square">
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
                                                <span className="text-xs font-semibold tracking-wider uppercase text-white/70 mb-0.5">{achievement.year}</span>
                                                <p className="text-sm font-semibold text-white leading-snug">{achievement.title}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={index} className="rounded-xl border border-site-border bg-white p-4 flex flex-col justify-between aspect-square">
                                            <span className="inline-block self-start px-2 py-0.5 rounded-full text-xs font-bold bg-site-accent text-foreground">
                                                {SCOPE_LABELS[achievement.scope] ?? achievement.scope}
                                            </span>
                                            <p className="text-sm font-semibold text-site-foreground leading-snug flex-1 py-2">{achievement.title}</p>
                                            <div className="text-xs text-site-muted space-y-0.5">
                                                {achievement.awardee && <p>{achievement.awardee}</p>}
                                                <p className="font-medium">{achievement.year}</p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* List view */}
                        {viewMode === "list" && (
                            <div className="flex flex-col divide-y divide-site-border border border-site-border rounded-xl overflow-hidden">
                                {paginated.map((achievement, index) => (
                                    <div key={index} className="flex items-center gap-4 bg-white px-4 py-3 hover:bg-gray-50 transition-colors">
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
                                            <p className="text-sm font-semibold text-site-foreground leading-snug line-clamp-2">{achievement.title}</p>
                                            <div className="flex flex-wrap gap-2 mt-1 text-xs text-site-muted">
                                                <span className="px-1.5 py-0.5 rounded bg-site-accent/20 text-foreground font-medium">
                                                    {SCOPE_LABELS[achievement.scope] ?? achievement.scope}
                                                </span>
                                                {achievement.awardee && <span>{achievement.awardee}</span>}
                                                {achievement.host && <span className="truncate">{achievement.host}</span>}
                                            </div>
                                        </div>
                                        <span className="text-xs font-semibold text-site-muted shrink-0">{achievement.year}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Plain view */}
                        {viewMode === "plain" && (
                            <ol className="space-y-1 text-sm">
                                {paginated.map((achievement, index) => (
                                    <li key={index} className="flex gap-3 py-1 border-b border-site-border/50 last:border-0">
                                        <span className="text-site-muted shrink-0 w-6 text-right">{(currentPage - 1) * PER_PAGE + index + 1}.</span>
                                        <span className="flex-1">
                                            {achievement.title}
                                            {achievement.awardee && (
                                                <span className="text-site-muted"> — {achievement.awardee}</span>
                                            )}
                                        </span>
                                        <span className="text-site-muted shrink-0">{SCOPE_LABELS[achievement.scope] ?? achievement.scope}, {achievement.year}</span>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-muted-foreground text-sm">
                            {searchQuery
                                ? `Tidak ada hasil untuk "${q}".`
                                : "Tidak ada prestasi untuk filter yang dipilih."}
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

            {/* Pagination */}
            {totalPages > 1 && (
                <Section py="sm">
                    <div className="flex justify-center gap-2 flex-wrap">
                        {currentPage > 1 && (
                            <Link
                                href={filterHref(tahun, scope, String(currentPage - 1))}
                                className="px-4 py-1.5 rounded-full text-sm font-semibold border border-site-border text-site-muted hover:border-site-primary hover:text-site-primary transition-colors"
                            >
                                ← Sebelumnya
                            </Link>
                        )}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <Link
                                key={p}
                                href={filterHref(tahun, scope, String(p))}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors",
                                    p === currentPage
                                        ? "bg-site-primary text-white border-site-primary"
                                        : "border-site-border text-site-muted hover:border-site-primary hover:text-site-primary",
                                )}
                            >
                                {p}
                            </Link>
                        ))}
                        {currentPage < totalPages && (
                            <Link
                                href={filterHref(tahun, scope, String(currentPage + 1))}
                                className="px-4 py-1.5 rounded-full text-sm font-semibold border border-site-border text-site-muted hover:border-site-primary hover:text-site-primary transition-colors"
                            >
                                Selanjutnya →
                            </Link>
                        )}
                    </div>
                </Section>
            )}
        </PageWrap>
    );
}

