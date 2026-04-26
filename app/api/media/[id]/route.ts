import { NextRequest, NextResponse } from "next/server";
import { getMediaById } from "@/lib/wordpress";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const numId = Number(id);
    if (!Number.isInteger(numId) || numId < 1) {
        return NextResponse.json({ error: "Invalid media ID" }, { status: 400 });
    }
    const media = await getMediaById(numId);
    if (media === null) {
        return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }
    return NextResponse.json(media);
}
