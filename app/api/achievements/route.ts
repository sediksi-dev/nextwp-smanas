import { NextRequest, NextResponse } from "next/server";
import { getAchievementsWithImage, getAllAchievements } from "@/lib/wordpress";
import type { AchievementScope } from "@/types/wordpress";

const VALID_SCOPES: AchievementScope[] = [
    "kecamatan",
    "regional",
    "provinsi",
    "nasional",
    "internasional",
    "lainnya",
];

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    // ?with_image=true  → achievements that have a photo (for homepage section)
    if (searchParams.get("with_image") === "true") {
        const data = await getAchievementsWithImage();
        return NextResponse.json(data);
    }

    // ?year=N&scope=...&page=N&per_page=N  → full list with optional filters
    const year = searchParams.has("year") ? Number(searchParams.get("year")) : undefined;

    const rawScope = searchParams.get("scope");
    const scope =
        rawScope !== null && (VALID_SCOPES as string[]).includes(rawScope)
            ? (rawScope as AchievementScope)
            : undefined;

    const page = searchParams.has("page") ? Math.max(1, Number(searchParams.get("page"))) : undefined;
    const perPage = searchParams.has("per_page")
        ? Math.max(1, Number(searchParams.get("per_page")))
        : undefined;

    const data = await getAllAchievements(year, scope, page, perPage);
    return NextResponse.json(data);
}
