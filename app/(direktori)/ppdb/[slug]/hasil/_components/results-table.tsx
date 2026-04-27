"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Cell = string | number | boolean | null | undefined;
type Row = Cell[];

interface Props {
    headers: Row;
    rows: Row[];
    downloadUrl?: string;
}

const PAGE_SIZE = 25;

export function ResultsTable({ headers, rows, downloadUrl }: Props) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        if (!search.trim()) return rows;
        const q = search.trim().toLowerCase();
        return rows.filter((row) =>
            row.some((cell) => String(cell ?? "").toLowerCase().includes(q)),
        );
    }, [rows, search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const pageRows = filtered.slice(start, start + PAGE_SIZE);

    function handleSearch(val: string) {
        setSearch(val);
        setPage(1);
    }

    return (
        <div className="mt-8 flex flex-col gap-4">
            {/* Search + info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                        aria-hidden
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <Input
                        type="search"
                        placeholder="Cari nama, nomor, atau keterangan…"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <p className="text-xs text-muted-foreground shrink-0">
                    {filtered.length === rows.length
                        ? `${rows.length} data`
                        : `${filtered.length} dari ${rows.length} data`}
                </p>
                {downloadUrl && (
                    <a
                        href={downloadUrl}
                        download
                        className="text-xs font-semibold text-site-primary hover:underline whitespace-nowrap shrink-0"
                    >
                        Unduh .xlsx
                    </a>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm border-collapse">
                    <thead className="sticky top-0 z-10 bg-site-primary text-white">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold whitespace-nowrap border-r border-white/20 w-10">
                                No
                            </th>
                            {headers.map((cell, ci) => (
                                <th
                                    key={ci}
                                    className="px-4 py-3 text-left font-semibold whitespace-nowrap border-r border-white/20 last:border-r-0"
                                >
                                    {String(cell ?? "")}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={headers.length + 1}
                                    className="px-4 py-10 text-center text-muted-foreground text-sm"
                                >
                                    Tidak ada data yang cocok dengan pencarian &ldquo;{search}&rdquo;
                                </td>
                            </tr>
                        ) : (
                            pageRows.map((row, ri) => (
                                <tr
                                    key={ri}
                                    className={ri % 2 === 0 ? "bg-background" : "bg-muted/40"}
                                >
                                    <td className="px-4 py-2.5 border-r border-border text-muted-foreground text-xs tabular-nums">
                                        {start + ri + 1}
                                    </td>
                                    {(row as Row).map((cell, ci) => (
                                        <td
                                            key={ci}
                                            className="px-4 py-2.5 border-r border-border last:border-r-0 whitespace-nowrap text-foreground/90"
                                        >
                                            {String(cell ?? "")}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-xs text-muted-foreground">
                        Halaman {safePage} dari {totalPages} &nbsp;·&nbsp; Menampilkan{" "}
                        {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} dari{" "}
                        {filtered.length} data
                    </p>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(1)}
                            disabled={safePage === 1}
                            aria-label="Halaman pertama"
                        >
                            «
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                            aria-label="Halaman sebelumnya"
                        >
                            ‹
                        </Button>

                        {/* Page number buttons — show up to 5 around current */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(
                                (n) =>
                                    n === 1 ||
                                    n === totalPages ||
                                    Math.abs(n - safePage) <= 2,
                            )
                            .reduce<(number | "…")[]>((acc, n, i, arr) => {
                                if (i > 0 && n - (arr[i - 1] as number) > 1) acc.push("…");
                                acc.push(n);
                                return acc;
                            }, [])
                            .map((n, i) =>
                                n === "…" ? (
                                    <span key={"ellipsis-" + i} className="px-2 text-muted-foreground text-sm">
                                        …
                                    </span>
                                ) : (
                                    <Button
                                        key={n}
                                        variant={safePage === n ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setPage(n as number)}
                                        aria-current={safePage === n ? "page" : undefined}
                                    >
                                        {n}
                                    </Button>
                                ),
                            )}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                            aria-label="Halaman berikutnya"
                        >
                            ›
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage(totalPages)}
                            disabled={safePage === totalPages}
                            aria-label="Halaman terakhir"
                        >
                            »
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
