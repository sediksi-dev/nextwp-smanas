import * as XLSX from "xlsx";

type Row = (string | number | boolean | null | undefined)[];

export async function fetchXlsx(url: string): Promise<Row[] | null> {
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
