import { NextRequest, NextResponse } from "next/server";
import { getContactConfig } from "@/lib/wordpress";

export async function GET(_request: NextRequest) {
    const config = await getContactConfig();
    if (config === null) {
        return NextResponse.json({ error: "Contact config not available" }, { status: 404 });
    }
    return NextResponse.json(config);
}
