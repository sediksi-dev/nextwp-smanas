import Link from "next/link";
import { Suspense } from "react";
import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import { cn } from "@/lib/utils";
import { getAllAchievements } from "@/lib/wordpress";
import PageHeading from "@/components/elements/page-heading";
import type { Achievement } from "@/types/wordpress";
import { SearchAndViewControls } from "./_components/search-view-controls";
import { AchievementsView } from "./_components/achievements-view";

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
    const displayItems = viewMode === "plain"
        ? filtered
        : filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

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
                {displayItems.length > 0 ? (
                    <AchievementsView
                        achievements={displayItems}
                        viewMode={viewMode}
                        startIndex={viewMode === "plain" ? 0 : (currentPage - 1) * PER_PAGE}
                    />
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

            {/* Pagination — hidden in plain view */}
            {totalPages > 1 && viewMode !== "plain" && (
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

