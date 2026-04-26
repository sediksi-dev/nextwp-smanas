import { NextRequest, NextResponse } from "next/server";
import { getCategoryBySlug } from "@/lib/wordpress";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);
    if (category === null) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category);
}
