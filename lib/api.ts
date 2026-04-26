/**
 * lib/api.ts — Client-side data library
 *
 * Mirrors lib/wordpress.ts but calls the internal Next.js API routes (/api/*)
 * instead of fetching WordPress directly.
 *
 * Use this in "use client" components.
 * Server components should continue to import from lib/wordpress.ts directly.
 */

import { parseGalleryPhotos } from "@/lib/utils";
import type {
    Achievement,
    AchievementScope,
    SmanasSiteConfig,
    TeacherCategory,
    WpCategory,
    WpGalleryItem,
    WpMediaItem,
    WpPost,
    WpTeacher,
} from "@/types/wordpress";

// Re-export the pure utility so callers only need one import
export { parseGalleryPhotos };

async function apiFetch<T>(path: string): Promise<T | null> {
    try {
        const res = await fetch(path);
        if (!res.ok) return null;
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

// ── Posts ────────────────────────────────────────────────────────────────────

export async function getLatestPosts(limit = 6): Promise<WpPost[]> {
    return (await apiFetch<WpPost[]>(`/api/posts?limit=${limit}`)) ?? [];
}

export async function getAllPostsPaginated(
    page = 1,
    perPage = 12,
    search = "",
): Promise<{ posts: WpPost[]; total: number; totalPages: number }> {
    const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
    });
    if (search) params.set("search", search);
    const result = await apiFetch<{ posts: WpPost[]; total: number; totalPages: number }>(
        `/api/posts?${params.toString()}`,
    );
    return result ?? { posts: [], total: 0, totalPages: 0 };
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
    return apiFetch<WpPost>(`/api/posts/${encodeURIComponent(slug)}`);
}

// ── Categories ────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<WpCategory[]> {
    return (await apiFetch<WpCategory[]>("/api/categories")) ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<WpCategory | null> {
    return apiFetch<WpCategory>(`/api/categories/${encodeURIComponent(slug)}`);
}

export async function getPostsByCategoryPaginated(
    _categoryId: number,
    categorySlug: string,
    page = 1,
    perPage = 10,
    search = "",
): Promise<{ posts: WpPost[]; total: number; totalPages: number }> {
    const params = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
    });
    if (search) params.set("search", search);
    const result = await apiFetch<{ posts: WpPost[]; total: number; totalPages: number }>(
        `/api/categories/${encodeURIComponent(categorySlug)}/posts?${params.toString()}`,
    );
    return result ?? { posts: [], total: 0, totalPages: 0 };
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export async function getGalleryItemsPreview(limit = 6): Promise<WpGalleryItem[]> {
    return (
        (await apiFetch<WpGalleryItem[]>(`/api/gallery?preview=true&limit=${limit}`)) ?? []
    );
}

export async function getGalleryItemsPaginated(
    page = 1,
    perPage = 12,
): Promise<{ items: WpGalleryItem[]; total: number; totalPages: number }> {
    const params = new URLSearchParams({ page: String(page), per_page: String(perPage) });
    const result = await apiFetch<{ items: WpGalleryItem[]; total: number; totalPages: number }>(
        `/api/gallery?${params.toString()}`,
    );
    return result ?? { items: [], total: 0, totalPages: 0 };
}

export async function getGalleryItemById(id: string | number): Promise<WpGalleryItem | null> {
    return apiFetch<WpGalleryItem>(`/api/gallery/${encodeURIComponent(String(id))}`);
}

// ── Teachers ──────────────────────────────────────────────────────────────────

export async function getTeachers(
    category?: TeacherCategory,
    limit = 100,
): Promise<WpTeacher[]> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (category) params.set("category", category);
    return (await apiFetch<WpTeacher[]>(`/api/teachers?${params.toString()}`)) ?? [];
}

export async function getTeacherById(id: string | number): Promise<WpTeacher | null> {
    return apiFetch<WpTeacher>(`/api/teachers/${encodeURIComponent(String(id))}`);
}

// ── Achievements ──────────────────────────────────────────────────────────────

export async function getAchievementsWithImage(): Promise<Achievement[]> {
    return (await apiFetch<Achievement[]>("/api/achievements?with_image=true")) ?? [];
}

export async function getAllAchievements(
    year?: number,
    scope?: AchievementScope,
    page?: number,
    per_page?: number,
): Promise<Achievement[]> {
    const params = new URLSearchParams();
    if (year !== undefined) params.set("year", String(year));
    if (scope !== undefined) params.set("scope", scope);
    if (page !== undefined) params.set("page", String(page));
    if (per_page !== undefined) params.set("per_page", String(per_page));
    const query = params.toString();
    return (await apiFetch<Achievement[]>(`/api/achievements${query ? `?${query}` : ""}`)) ?? [];
}

// ── Config & Media ────────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SmanasSiteConfig | null> {
    return apiFetch<SmanasSiteConfig>("/api/config");
}

export async function getMediaById(id: number): Promise<WpMediaItem | null> {
    return apiFetch<WpMediaItem>(`/api/media/${id}`);
}
