import { mockPosts } from "@/lib/mock/posts";
import { mockTeachers, type StaffMember } from "@/lib/mock/teachers";
import { mockAchievements } from "@/lib/mock/achievements";
import { mockGallery, type GalleryPhoto } from "@/lib/mock/gallery";
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

async function wpFetchWithMeta<T>(
    path: string,
    namespace: string = "wp/v2",
): Promise<{ data: T | null; total: number; totalPages: number }> {
    if (!baseUrl) return { data: null, total: 0, totalPages: 0 };

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
        if (!res.ok) return { data: null, total: 0, totalPages: 0 };
        const total = Number(res.headers.get("X-WP-Total") ?? 0);
        const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 0);
        const data = (await res.json()) as T;
        return { data, total, totalPages };
    } catch {
        return { data: null, total: 0, totalPages: 0 };
    }
}

// ── Posts ────────────────────────────────────────────────────────────────────────────

export async function getLatestPosts(limit = 6) {
    const data = await wpFetch<WpPost[]>(`posts?per_page=${limit}`);
    if (data === null) {
        return mockPosts.slice(0, limit).map(toWpPost);
    }
    return data;
}

export async function getPostsByCategory(category: string, limit = 12) {
    const encoded = encodeURIComponent(category);
    const data = await wpFetch<WpPost[]>(
        `posts?categories=${encoded}&per_page=${limit}`,
    );
    if (data === null) {
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
    if (data === null) {
        const start = (page - 1) * perPage;
        return mockPosts.slice(start, start + perPage).map(toWpPost);
    }
    return data;
}

export async function getAllPostsPaginated(
    page = 1,
    perPage = 12,
    search = "",
): Promise<{ posts: WpPost[]; total: number; totalPages: number }> {
    const params = new URLSearchParams({
        per_page: String(perPage),
        page: String(page),
    });
    if (search) params.set("search", search);

    const { data, total, totalPages } = await wpFetchWithMeta<WpPost[]>(
        `posts?${params.toString()}`,
    );

    if (data === null) {
        const searchLower = search.toLowerCase();
        const filtered = mockPosts
            .map(toWpPost)
            .filter(
                (p) =>
                    searchLower.length === 0 ||
                    p.title.rendered.toLowerCase().includes(searchLower) ||
                    p.excerpt.rendered.toLowerCase().includes(searchLower),
            );
        const mockTotal = filtered.length;
        const mockTotalPages = Math.max(1, Math.ceil(mockTotal / perPage));
        const start = (page - 1) * perPage;
        return { posts: filtered.slice(start, start + perPage), total: mockTotal, totalPages: mockTotalPages };
    }

    return { posts: data, total, totalPages };
}

export async function getPostBySlug(slug: string) {
    const data = await wpFetch<WpPost[]>(
        `posts?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    if (data === null || data.length === 0) {
        const fallback = mockPosts.find((p) => p.slug === slug);
        if (fallback === undefined) return null;
        return toWpPost(fallback);
    }
    return data[0];
}

// ── Categories ─────────────────────────────────────────────────────────────────────────

/** Mock categories derived from mockPosts */
const MOCK_CATEGORIES: WpCategory[] = Array.from(
    new Map(
        mockPosts.map((p, i) => [
            p.category,
            {
                id: i + 1,
                count: mockPosts.filter((x) => x.category === p.category).length,
                description: "",
                link: `/category/${p.category.toLowerCase().replace(/\s+/g, "-")}`,
                name: p.category,
                slug: p.category.toLowerCase().replace(/\s+/g, "-"),
                taxonomy: "category",
                parent: 0,
            } satisfies WpCategory,
        ]),
    ).values(),
);

export async function getCategories(): Promise<WpCategory[]> {
    const data = await wpFetch<WpCategory[]>("categories?per_page=100&hide_empty=true");
    if (data === null || data.length === 0) return MOCK_CATEGORIES;
    return data;
}

export async function getCategoryBySlug(slug: string): Promise<WpCategory | null> {
    const data = await wpFetch<WpCategory[]>(
        `categories?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    if (data === null || data.length === 0) {
        return MOCK_CATEGORIES.find((c) => c.slug === slug) ?? null;
    }
    return data[0];
}

export async function getPostsByCategoryPaginated(
    categoryId: number,
    categorySlug: string,
    page = 1,
    perPage = 10,
    search = "",
): Promise<{ posts: WpPost[]; total: number; totalPages: number }> {
    const params = new URLSearchParams({
        categories: String(categoryId),
        per_page: String(perPage),
        page: String(page),
    });
    if (search) params.set("search", search);

    const { data, total, totalPages } = await wpFetchWithMeta<WpPost[]>(
        `posts?${params.toString()}`,
    );

    if (data === null) {
        const searchLower = search.toLowerCase();
        const filtered = mockPosts
            .filter((p) => p.category.toLowerCase().replace(/\s+/g, "-") === categorySlug)
            .filter(
                (p) =>
                    searchLower.length === 0 ||
                    p.title.toLowerCase().includes(searchLower) ||
                    p.excerpt.toLowerCase().includes(searchLower),
            );
        const mockTotal = filtered.length;
        const mockTotalPages = Math.max(1, Math.ceil(mockTotal / perPage));
        const start = (page - 1) * perPage;
        const posts = filtered.slice(start, start + perPage).map(toWpPost);
        return { posts, total: mockTotal, totalPages: mockTotalPages };
    }

    return { posts: data, total, totalPages };
}

// ── Achievements ───────────────────────────────────────────────────────────────────────────

export async function getAchievementsWithImage() {
    const data = await wpFetch<Achievement[]>("prestasi-with-image", "smanas/v1");
    if (data === null || data.length === 0) {
        const fallback = mockAchievements.filter((a) => a.image).map((a) => ({
            _ID: Number(a._ID),
            title: a.title,
            scope: a.scope,
            year: Number(a.year),
            awardee: a.awardee,
            image: a.image!,
            host: a.host,
        })) as Achievement[];
        return fallback;
    }

    data.sort((a, b) => {
        if (b.year !== a.year) {
            return b.year - a.year;
        }
        return b._ID - a._ID;
    });

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
    if (data === null) {
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

// ── Gallery ───────────────────────────────────────────────────────────────────────────────

/**
 * Parses the raw gallery_photos string from the API into an array of clean URLs.
 * Handles plain URLs and markdown link format: [text](url)
 */
export function parseGalleryPhotos(raw: string): string[] {
    if (raw.length === 0) return [];
    return raw
        .split(",")
        .map((part) => {
            const trimmed = part.trim();
            // Strip markdown link format: [text](url) → url
            const parenIdx = trimmed.indexOf("](");
            if (parenIdx !== -1) {
                const urlStart = parenIdx + 2;
                const urlEnd = trimmed.lastIndexOf(")");
                if (urlEnd > urlStart) return trimmed.slice(urlStart, urlEnd);
            }
            return trimmed;
        })
        .filter((url) => url.startsWith("http"));
}

function toWpGalleryItem(item: GalleryPhoto, id: number): WpGalleryItem {
    return {
        _ID: String(id),
        gallery_title: item.title,
        gallery_description: item.caption ?? "",
        gallery_photos: item.image,
        cct_status: "publish",
        cct_author_id: "1",
        cct_created: "",
        cct_modified: "",
        cct_slug: "gallery",
    };
}

export async function getGalleryItemsPreview(limit = 6): Promise<WpGalleryItem[]> {
    const data = await wpFetch<WpGalleryItem[]>(`gallery?_limit=${limit}`, "jet-cct");
    if (data === null || data.length === 0) {
        return mockGallery
            .filter((g): g is GalleryPhoto => g.type === "Foto")
            .slice(0, limit)
            .map((g, i) => toWpGalleryItem(g, i + 1));
    }
    return data;
}

export async function getGalleryItemsPaginated(
    page = 1,
    perPage = 12,
): Promise<{ items: WpGalleryItem[]; total: number; totalPages: number }> {
    // Overfetch by 1 to reliably detect the last page without relying on headers
    const fetchLimit = perPage + 1;
    const params = new URLSearchParams({
        _limit: String(fetchLimit),
        _page: String(page),
    });
    const { data, total, totalPages } = await wpFetchWithMeta<WpGalleryItem[]>(
        `gallery?${params.toString()}`,
        "jet-cct",
    );
    if (data === null) {
        const allPhotos = mockGallery
            .filter((g): g is GalleryPhoto => g.type === "Foto")
            .map((g, i) => toWpGalleryItem(g, i + 1));
        const mockTotal = allPhotos.length;
        const mockTotalPages = Math.max(1, Math.ceil(mockTotal / perPage));
        const start = (page - 1) * perPage;
        return { items: allPhotos.slice(start, start + perPage), total: mockTotal, totalPages: mockTotalPages };
    }
    // Use real header totals if available
    if (totalPages > 0) {
        return { items: data.slice(0, perPage), total, totalPages };
    }
    // Detect last page via overfetch: got more than perPage → there is a next page
    const hasMore = data.length > perPage;
    const items = data.slice(0, perPage);
    const effectiveTotalPages = hasMore ? page + 1 : page;
    const effectiveTotal = hasMore
        ? effectiveTotalPages * perPage
        : (page - 1) * perPage + items.length;
    return { items, total: effectiveTotal, totalPages: effectiveTotalPages };
}

export async function getGalleryItemById(id: string | number): Promise<WpGalleryItem | null> {
    const data = await wpFetch<WpGalleryItem>(`gallery/${id}`, "jet-cct");
    if (data === null) {
        const photos = mockGallery.filter((g): g is GalleryPhoto => g.type === "Foto");
        const found = photos[Number(id) - 1];
        if (found === undefined) return null;
        return toWpGalleryItem(found, Number(id));
    }
    return data;
}

// ── Teachers ───────────────────────────────────────────────────────────────────────────────

function inferMockCategory(t: StaffMember): TeacherCategory {
    const j = t.jabatan.toLowerCase();
    if (j.includes("kepala sekolah")) return "kepsek";
    if (j.includes("wakasek") || j.includes("wakil")) return "wakasek";
    if (t.type === "guru") return "guru";
    return "staf";
}

function toWpTeacher(t: StaffMember, id: number): WpTeacher {
    return {
        _ID: String(id),
        name: t.name,
        role: t.jabatan,
        category: inferMockCategory(t),
        motto: t.motto,
        birthplace: t.birthPlace,
        birthdate: t.birthDate,
        email: t.email,
        photo: t.photo,
        nuptk: t.nuptk,
        cct_status: "publish",
        cct_author_id: "1",
        cct_created: "",
        cct_modified: "",
        cct_slug: "teachers",
    };
}

export async function getTeachers(category?: TeacherCategory, limit = 100): Promise<WpTeacher[]> {
    const params = new URLSearchParams({ _limit: String(limit) });
    if (category) params.set("category", category);
    const data = await wpFetch<WpTeacher[]>(`teachers?${params.toString()}`, "jet-cct");
    if (data === null || data.length === 0) {
        return mockTeachers
            .map((t, i) => toWpTeacher(t, i + 1))
            .filter((t) => category === undefined || t.category === category);
    }
    return data;
}

export async function getTeacherById(id: string | number): Promise<WpTeacher | null> {
    const data = await wpFetch<WpTeacher>(`teachers/${id}`, "jet-cct");
    if (data === null) {
        const idx = Number(id) - 1;
        const found = mockTeachers[idx];
        if (found === undefined) return null;
        return toWpTeacher(found, Number(id));
    }
    return data;
}

// ── Site Config ───────────────────────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SmanasSiteConfig | null> {
    return wpFetch<SmanasSiteConfig>("config", "smanas/v1");
}

// ── Attachments ────────────────────────────────────────────────────────────────────────────────

export async function getMediaById(id: number) {
    const data = await wpFetch<WpMediaItem>(`media/${id}`);
    if (data === null) {
        return null;
    }
    return data;
}

// ── Helpers ─────────────────────────────────────────────────────────────────────────────────

function toWpPost(item: (typeof mockPosts)[number]): WpPost {
    return {
        id: item.id,
        slug: item.slug,
        date: item.date,
        title: { rendered: item.title },
        excerpt: { rendered: item.excerpt, protected: false },
        content: { rendered: item.content, protected: false },
        date_gmt: "",
        guid: { rendered: "" },
        modified: "",
        modified_gmt: "",
        status: "publish",
        type: "post",
        link: "",
        author: 0,
        featured_media: 0,
        comment_status: "open",
        ping_status: "open",
        sticky: false,
        template: "",
        format: "",
        meta: {
            footnotes: "",
        },
        categories: [],
        tags: [],
        class_list: [],
    } satisfies WpPost;
}
