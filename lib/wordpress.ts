import { mockPosts } from "@/lib/mock/posts";
import { mockTeachers } from "@/lib/mock/teachers";
import { mockAchievements } from "@/lib/mock/achievements";
import { mockGallery } from "@/lib/mock/gallery";
import type { WpPost } from "@/types/wordpress";

const baseUrl = process.env.NEXT_PUBLIC_WP_URL;
const REVALIDATE = Number(process.env.WP_REVALIDATE_SECONDS ?? 1800);

async function wpFetch<T>(path: string): Promise<T | null> {
    if (!baseUrl) return null;

    try {
        const res = await fetch(
            `${baseUrl.replace(/\/$/,"")}/wp-json/wp/v2/${path}`,
            { next: { revalidate: REVALIDATE } },
        );
        if (!res.ok) return null;
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

// ── Posts ────────────────────────────────────────────────────────────────────

export async function getLatestPosts(limit = 6) {
    const data = await wpFetch<WpPost[]>(`posts?per_page=${limit}`);
    if (!data) {
        return mockPosts.slice(0, limit).map(toWpPost);
    }
    return data;
}

export async function getPostsByCategory(category: string, limit = 12) {
    const encoded = encodeURIComponent(category);
    const data = await wpFetch<WpPost[]>(
        `posts?categories=${encoded}&per_page=${limit}`,
    );
    if (!data) {
        return mockPosts
            .filter((p) => p.category === category)
            .slice(0, limit)
            .map(toWpPost);
    }
    return data;
}

export async function getAllPosts(page = 1, perPage = 12) {
    const data = await wpFetch<WpPost[]>(
        `posts?per_page=${perPage}&page=${page}`,
    );
    if (!data) {
        const start = (page - 1) * perPage;
        return mockPosts.slice(start, start + perPage).map(toWpPost);
    }
    return data;
}

export async function getPostBySlug(slug: string) {
    const data = await wpFetch<WpPost[]>(
        `posts?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    if (!data || data.length === 0) {
        const fallback = mockPosts.find((p) => p.slug === slug);
        if (!fallback) return null;
        return toWpPost(fallback);
    }
    return data[0];
}

// ── Teachers / Staff ─────────────────────────────────────────────────────────

export async function getTeachers() {
    const data = await wpFetch<Array<{ slug: string; [key: string]: unknown }>>(
        "guru?per_page=100",
    );
    if (!data) {
        return mockTeachers.filter((t) => t.type === "guru");
    }
    return data;
}

export async function getStaff() {
    const data = await wpFetch<Array<{ slug: string; [key: string]: unknown }>>(
        "staf?per_page=100",
    );
    if (!data) {
        return mockTeachers.filter((t) => t.type === "staf");
    }
    return data;
}

// ── Achievements ─────────────────────────────────────────────────────────────

export async function getAchievements(year?: number, category?: string) {
    const params = new URLSearchParams({ per_page: "100" });
    if (year) params.set("year", String(year));
    if (category) params.set("kategori", category);

    const data = await wpFetch<Array<{ [key: string]: unknown }>>(
        `prestasi?${params.toString()}`,
    );
    if (!data) {
        return mockAchievements.filter((a) => {
            const yearMatch = !year || a.year === year;
            const catMatch = !category || a.category === category;
            return yearMatch && catMatch;
        });
    }
    return data;
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export async function getGallery(type?: "Foto" | "Video") {
    const params = new URLSearchParams({ per_page: "100" });
    if (type) params.set("tipe", type);

    const data = await wpFetch<Array<{ [key: string]: unknown }>>(
        `galeri?${params.toString()}`,
    );
    if (!data) {
        return type ? mockGallery.filter((g) => g.type === type) : mockGallery;
    }
    return data;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toWpPost(item: (typeof mockPosts)[number]): WpPost {
    return {
        id: item.id,
        slug: item.slug,
        date: item.date,
        title: { rendered: item.title },
        excerpt: { rendered: item.excerpt },
        content: { rendered: item.content },
    } satisfies WpPost;
}
