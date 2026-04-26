import { NextRequest, NextResponse } from "next/server";
import { getPpdbBySlug } from "@/lib/wordpress";

interface Context {
    params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, { params }: Context) {
    const { slug } = await params;
    const item = await getPpdbBySlug(slug);
    if (!item) {
        return NextResponse.json({ error: "PPDB entry not found" }, { status: 404 });
    }
    return NextResponse.json(item);
}
