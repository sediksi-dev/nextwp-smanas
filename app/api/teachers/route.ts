import { NextRequest, NextResponse } from "next/server";
import { getTeachers } from "@/lib/wordpress";
import type { TeacherCategory } from "@/types/wordpress";

const VALID_CATEGORIES: TeacherCategory[] = ["kepsek", "wakasek", "guru", "staf"];

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    const rawCategory = searchParams.get("category");
    const category =
        rawCategory !== null && (VALID_CATEGORIES as string[]).includes(rawCategory)
            ? (rawCategory as TeacherCategory)
            : undefined;

    const limit = Math.max(1, Number(searchParams.get("limit")) || 100);

    const teachers = await getTeachers(category, limit);
    return NextResponse.json(teachers);
}
