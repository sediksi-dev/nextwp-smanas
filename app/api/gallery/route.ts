import { NextRequest, NextResponse } from "next/server";
import { getGalleryItemsPaginated, getGalleryItemsPreview } from "@/lib/wordpress";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    // ?preview=true&limit=N  → preview grid (homepage / section)
    if (searchParams.get("preview") === "true") {
        const limit = Math.max(1, Number(searchParams.get("limit")) || 6);
        const items = await getGalleryItemsPreview(limit);
        return NextResponse.json(items);
    }

    // ?page=N&per_page=N  → full paginated gallery
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const perPage = Math.max(1, Number(searchParams.get("per_page")) || 12);
    const result = await getGalleryItemsPaginated(page, perPage);
    return NextResponse.json(result);
}
