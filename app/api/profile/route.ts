import { NextRequest, NextResponse } from "next/server";
import { getProfilesConfig } from "@/lib/wordpress";

export async function GET(_request: NextRequest) {
    const config = await getProfilesConfig();
    if (config === null) {
        return NextResponse.json({ error: "Profiles config not available" }, { status: 404 });
    }
    return NextResponse.json(config);
}
