import { NextRequest, NextResponse } from "next/server";
import { getCategoryBySlug, getPostsByCategoryPaginated } from "@/lib/wordpress";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    const { searchParams } = request.nextUrl;

    const category = await getCategoryBySlug(slug);
    if (category === null) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const perPage = Math.max(1, Number(searchParams.get("per_page")) || 10);
    const search = searchParams.get("search") ?? "";

    const result = await getPostsByCategoryPaginated(category.id, slug, page, perPage, search);
    return NextResponse.json(result);
}
