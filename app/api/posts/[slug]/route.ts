import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/wordpress";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (post === null) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
}
