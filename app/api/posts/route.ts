import { NextRequest, NextResponse } from "next/server";
import { getAllPostsPaginated, getLatestPosts } from "@/lib/wordpress";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    // ?limit=N  → lightweight preview list (homepage)
    if (searchParams.has("limit")) {
        const limit = Math.max(1, Number(searchParams.get("limit")) || 6);
        const posts = await getLatestPosts(limit);
        return NextResponse.json(posts);
    }

    // ?page=N&per_page=N&search=...  → full paginated listing
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const perPage = Math.max(1, Number(searchParams.get("per_page")) || 12);
    const search = searchParams.get("search") ?? "";

    const result = await getAllPostsPaginated(page, perPage, search);
    return NextResponse.json(result);
}
