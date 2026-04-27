import "server-only";
import type {
    Achievement,
    AchievementScope,
    SmanasContactConfig,
    SmanasProfilesConfig,
    SmanasSiteConfig,
    TeacherCategory,
    WpCategory,
    WpGalleryItem,
    WpMediaItem,
    WpPost,
    WpPpdbItem,
    WpTag,
    WpTeacher,
} from "@/types/wordpress";

const baseUrl = process.env.WP_URL;
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
    return data ?? [];
}

export async function getPostsByCategory(category: string, limit = 12) {
    const encoded = encodeURIComponent(category);
    const data = await wpFetch<WpPost[]>(
        `posts?categories=${encoded}&per_page=${limit}`,
    );
    return data ?? [];
}

export async function getAllPosts(page = 1, perPage = 12) {
    const data = await wpFetch<WpPost[]>(
        `posts?per_page=${perPage}&page=${page}`,
    );
    return data ?? [];
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
        return { posts: [], total: 0, totalPages: 0 };
    }

    return { posts: data, total, totalPages };
}

export async function getPostBySlug(slug: string) {
    const data = await wpFetch<WpPost[]>(
        `posts?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    if (data === null || data.length === 0) return null;
    return data[0];
}

// ── Categories ─────────────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<WpCategory[]> {
    const data = await wpFetch<WpCategory[]>("categories?per_page=100&hide_empty=true");
    return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<WpCategory | null> {
    const data = await wpFetch<WpCategory[]>(
        `categories?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    if (data === null || data.length === 0) return null;
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
        return { posts: [], total: 0, totalPages: 0 };
    }

    return { posts: data, total, totalPages };
}

// ── Achievements ───────────────────────────────────────────────────────────────────────────

export async function getAchievementsWithImage() {
    const data = await wpFetch<Achievement[]>("prestasi-with-image", "smanas/v1");
    if (data === null || data.length === 0) return [];

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
    return data ?? [];
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

export async function getGalleryItemsPreview(limit = 6): Promise<WpGalleryItem[]> {
    const data = await wpFetch<WpGalleryItem[]>(`gallery?_limit=${limit}`, "jet-cct");
    return data ?? [];
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
        return { items: [], total: 0, totalPages: 0 };
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
    return data;
}

// ── Teachers ───────────────────────────────────────────────────────────────────────────────

export async function getTeachers(category?: TeacherCategory, limit = 100): Promise<WpTeacher[]> {
    const params = new URLSearchParams({ _limit: String(limit) });
    if (category) params.set("category", category);
    const data = await wpFetch<WpTeacher[]>(`teachers?${params.toString()}`, "jet-cct");
    return data ?? [];
}

export async function getTeacherById(id: string | number): Promise<WpTeacher | null> {
    const data = await wpFetch<WpTeacher>(`teachers/${id}`, "jet-cct");
    return data;
}

// ── Site Config ───────────────────────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SmanasSiteConfig | null> {
    return wpFetch<SmanasSiteConfig>("configs", "smanas/v1");
}

// ── Profiles Config ───────────────────────────────────────────────────────────────────────────

export async function getProfilesConfig() {
    return wpFetch<SmanasProfilesConfig>("profiles", "smanas/v1");
}

// ── PPDB (custom post type) ──────────────────────────────────────────────────────────────────────

export async function getPpdbById(id: number): Promise<WpPpdbItem | null> {
    const data = await wpFetch<WpPpdbItem>(`ppdb/${id}`);
    return data;
}

export async function getPpdbList(limit = 10): Promise<WpPpdbItem[]> {
    const data = await wpFetch<WpPpdbItem[]>(`ppdb?per_page=${limit}&orderby=date&order=desc`);
    return data ?? [];
}

export async function getPpdbBySlug(slug: string): Promise<WpPpdbItem | null> {
    const data = await wpFetch<WpPpdbItem[]>(`ppdb?slug=${encodeURIComponent(slug)}&per_page=1`);
    if (data === null || data.length === 0) return null;
    return data[0];
}

/**
 * Fetch a single post or page by numeric ID.
 * Tries wp/v2/posts first, then wp/v2/pages.
 * Used to resolve `meta.related_content` IDs.
 */
export async function getPostOrPageById(id: number): Promise<{ slug: string; title: string; type: "post" | "page" } | null> {
    const post = await wpFetch<WpPost>(`posts/${id}`);
    if (post) return { slug: post.slug, title: post.title.rendered, type: "post" };
    const page = await wpFetch<WpPost>(`pages/${id}`);
    if (page) return { slug: page.slug, title: page.title.rendered, type: "page" };
    return null;
}

// ── Contact Config ────────────────────────────────────────────────────────────────────────────

export async function getContactConfig(): Promise<SmanasContactConfig | null> {
    return wpFetch<SmanasContactConfig>("contact", "smanas/v1");
}

// ── Pages (post_type=page) ─────────────────────────────────────────────────────────────────────

export async function getPageBySlug(slug: string): Promise<WpPost | null> {
    const data = await wpFetch<WpPost[]>(
        `pages?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    if (data === null || data.length === 0) return null;
    return data[0];
}

// ── Attachments ────────────────────────────────────────────────────────────────────────────────

export async function getMediaById(id: number) {
    const data = await wpFetch<WpMediaItem>(`media/${id}`);
    if (data === null) {
        return null;
    }
    return data;
}

// ── Tags ────────────────────────────────────────────────────────────────────────────────────

export async function getTagsByIds(ids: number[]): Promise<WpTag[]> {
    if (ids.length === 0) return [];
    const data = await wpFetch<WpTag[]>(`tags?include=${ids.join(",")}&per_page=100`);
    return data ?? [];
}

// ── Adjacent posts ────────────────────────────────────────────────────────────────────────────

/** Get the next newer post relative to the given ISO date string */
export async function getNextPost(date: string): Promise<WpPost | null> {
    const data = await wpFetch<WpPost[]>(
        `posts?after=${encodeURIComponent(date)}&per_page=1&order=asc`,
    );
    if (data === null || data.length === 0) return null;
    return data[0];
}

/** Get the previous older post relative to the given ISO date string */
export async function getPrevPost(date: string): Promise<WpPost | null> {
    const data = await wpFetch<WpPost[]>(
        `posts?before=${encodeURIComponent(date)}&per_page=1&order=desc`,
    );
    if (data === null || data.length === 0) return null;
    return data[0];
}


