import { mockPosts } from "@/lib/mock/posts";
import { mockTeachers } from "@/lib/mock/teachers";
import { mockAchievements } from "@/lib/mock/achievements";
import { mockGallery } from "@/lib/mock/gallery";
import type { Achievement, AchievementScope, SmanasSiteConfig, WpPost } from "@/types/wordpress";

const baseUrl = process.env.NEXT_PUBLIC_WP_URL;
const REVALIDATE = Number(process.env.WP_REVALIDATE_SECONDS ?? 1800);
const WP_USERNAME = process.env.WP_APP_USERNAME;
const WP_PASSWORD = process.env.WP_APP_PASSWORD;

async function wpFetch<T>(path: string, namespace: string = "wp/v2"): Promise<T | null> {
    if (!baseUrl) return null;

    try {
        const headers: HeadersInit = {};
        if (WP_USERNAME && WP_PASSWORD) {
            const auth = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString("base64");
            headers["Authorization"] = `Basic ${auth}`;
        }

        const res = await fetch(
            `${baseUrl.replace(/\/$/, "")}/wp-json/${namespace}/${path}`,
            {
                headers,
                next: { revalidate: REVALIDATE },
            },
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
    const data = await wpFetch<Array<{ slug: string;[key: string]: unknown }>>(
        "guru?per_page=100",
    );
    if (!data) {
        return mockTeachers.filter((t) => t.type === "guru");
    }
    return data;
}

export async function getStaff() {
    const data = await wpFetch<Array<{ slug: string;[key: string]: unknown }>>(
        "staf?per_page=100",
    );
    if (!data) {
        return mockTeachers.filter((t) => t.type === "staf");
    }
    return data;
}

// ── Achievements ─────────────────────────────────────────────────────────────

export async function getAchievementsWithImage() {
    const data = await wpFetch<Achievement[]>("prestasi-with-image", "smanas/v1");
    if (!data || data.length === 0) {
        const fallback = mockAchievements.filter((a) => a.image).map((a) => ({
            _ID: Number(a._ID),
            title: a.title,
            scope: a.scope,
            year: Number(a.year),
            awardee: a.awardee,
            image: a.image!,
            host: a.host,
        })) as Achievement[]; // Only return achievements that have an image for the PrestasiSection
        return fallback;
    }
    return data;
}

export async function getAllAchievements(year?: number, scope?: AchievementScope, page?: number, per_page?: number) {
    const params = new URLSearchParams();
    if (year) params.set("year", String(year));
    if (scope) params.set("scope", scope);
    if (page) params.set("page", String(page));
    if (per_page) params.set("per_page", String(per_page));

    const query = params.toString();
    const endpoint = query ? `awards?${query}` : "awards";

    const data = await wpFetch<Array<Achievement>>(endpoint, "jet-cct");
    if (!data) {
        // Filter mock data based on parameters
        let filtered = mockAchievements;
        if (year) filtered = filtered.filter(a => String(a.year) === String(year));
        if (scope) filtered = filtered.filter(a => a.scope === scope);
        if (page && per_page) {
            const start = (page - 1) * per_page;
            filtered = filtered.slice(start, start + per_page);
        } else if (per_page) {
            filtered = filtered.slice(0, per_page);
        }
        return filtered;
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

// ── Site Config ───────────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SmanasSiteConfig | null> {
    return wpFetch<SmanasSiteConfig>("config", "smanas/v1");
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


