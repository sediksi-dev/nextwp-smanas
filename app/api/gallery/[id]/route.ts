import { NextRequest, NextResponse } from "next/server";
import { getGalleryItemById } from "@/lib/wordpress";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const item = await getGalleryItemById(id);
    if (item === null) {
        return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }
    return NextResponse.json(item);
}
