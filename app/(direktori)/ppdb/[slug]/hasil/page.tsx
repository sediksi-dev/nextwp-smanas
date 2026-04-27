import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as XLSX from "xlsx";

import { getPpdbBySlug } from "@/lib/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ResultsTable } from "./_components/results-table";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const item = await getPpdbBySlug(slug);
    if (!item) return { title: "Hasil Seleksi | SMA Nasional Malang" };
    return {
        title: `Hasil Seleksi PPDB ${item.meta.year_open} | SMA Nasional Malang`,
        description: `Daftar hasil seleksi Penerimaan Peserta Didik Baru tahun ${item.meta.year_open} SMA Nasional Malang.`,
    };
}

type Row = (string | number | boolean | null | undefined)[];

async function fetchXlsx(url: string): Promise<Row[] | null> {
    try {
        const res = await fetch(url, { next: { revalidate: 1800 } });
        if (!res.ok) return null;
        const buffer = await res.arrayBuffer();
        const wb = XLSX.read(buffer, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Row>(ws, { header: 1, defval: "" });
        return rows as Row[];
    } catch {
        return null;
    }
}

export default async function PpdbHasilPage({ params }: Props) {
    const { slug } = await params;
    const item = await getPpdbBySlug(slug);
    if (!item) notFound();

    const { admission_results, year_open } = item.meta;
    const title = item.title.rendered;

    const rows = admission_results ? await fetchXlsx(admission_results) : null;
    const [headerRow, ...dataRows] = rows ?? [];

    const hasData = rows && rows.length > 1;

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "PPDB", href: "/ppdb" },
                { label: title, href: `/ppdb/${slug}` },
                { label: "Hasil Seleksi" },
            ]}
        >
            <Section py="sm">
                <div className="flex items-center gap-2 mb-3">
                    <span className="block w-5 h-0.5 bg-site-accent" />
                    <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                        Tahun Ajaran {year_open}/{Number(year_open) + 1}
                    </p>
                </div>
                <h1
                    className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight mb-2"
                    dangerouslySetInnerHTML={{ __html: `Hasil Seleksi — ${title}` }}
                />

                {hasData ? (
                    <ResultsTable
                        headers={headerRow as Row}
                        rows={dataRows as Row[]}
                        downloadUrl={admission_results || undefined}
                    />
                ) : (
                    <div className="mt-8 surface rounded-2xl p-10 flex flex-col items-center gap-4 text-center max-w-lg mx-auto">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-muted-foreground/50" aria-hidden>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" x2="8" y1="13" y2="13" />
                            <line x1="16" x2="8" y1="17" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        <div>
                            <p className="font-bold text-foreground text-lg">Hasil Belum Tersedia</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Hasil seleksi untuk PPDB {year_open} belum dipublikasikan atau sedang dipersiapkan.
                                Pantau terus halaman ini.
                            </p>
                        </div>
                        <Button asChild variant="outline">
                            <Link href={`/ppdb/${slug}`}>Kembali ke Detail PPDB</Link>
                        </Button>
                    </div>
                )}
            </Section>
        </PageWrap>
    );
}
