import { NextRequest, NextResponse } from "next/server";
import { getCategories } from "@/lib/wordpress";

export async function GET(_request: NextRequest) {
    const categories = await getCategories();
    return NextResponse.json(categories);
}
