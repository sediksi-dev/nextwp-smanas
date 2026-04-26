import { NextRequest, NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/wordpress";

export async function GET(_request: NextRequest) {
    const config = await getSiteConfig();
    if (config === null) {
        return NextResponse.json({ error: "Config not available" }, { status: 404 });
    }
    return NextResponse.json(config);
}
