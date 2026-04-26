import { NextRequest, NextResponse } from "next/server";
import { getPpdbList } from "@/lib/wordpress";

export async function GET(request: NextRequest) {
    const limit = Math.max(1, Number(request.nextUrl.searchParams.get("limit") ?? 10));
    const items = await getPpdbList(limit);
    return NextResponse.json(items);
}
