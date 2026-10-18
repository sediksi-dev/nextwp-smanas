import * as XLSX from "xlsx";
import { CACHE_TAGS, WP_REVALIDATE_SECONDS } from "@/lib/wordpress";

type Row = (string | number | boolean | null | undefined)[];

export async function fetchXlsx(url: string): Promise<Row[] | null> {
    try {
        const res = await fetch(url, {
            next: { revalidate: WP_REVALIDATE_SECONDS, tags: [CACHE_TAGS.all, CACHE_TAGS.ppdb] },
        });
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
