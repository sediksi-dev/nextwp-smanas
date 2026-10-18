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
/**
 * Time-based fallback only. Content changes reach the cache through the
 * /api/revalidate webhook (by tag), so this just bounds staleness for content the
 * webhook can't see (JetEngine CCT & Options Pages). Every expiry re-renders and
 * re-writes each visited page — on Vercel that is billed as ISR writes — so keep it long.
 */
export const WP_REVALIDATE_SECONDS = Number(process.env.WP_REVALIDATE_SECONDS ?? 86400);
const WP_USERNAME = process.env.WP_APP_USERNAME;
const WP_PASSWORD = process.env.WP_APP_PASSWORD;

/** Cache tags attached to WordPress fetches; /api/revalidate invalidates them by content type. */
export const CACHE_TAGS = {
    all: "wordpress",
    posts: "wp-posts",
    pages: "wp-pages",
    categories: "wp-categories",
    tags: "wp-tags",
    media: "wp-media",
    ppdb: "wp-ppdb",
    gallery: "wp-gallery",
    teachers: "wp-teachers",
    achievements: "wp-achievements",
    siteConfig: "wp-site-config",
    profiles: "wp-profiles",
    contact: "wp-contact",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

type WpFetchOptions = {
    namespace?: string;
    tags: CacheTag[];
    /**
     * Bypass the Data Cache. Use for visitor-supplied queries (search): every distinct
     * query would otherwise become its own cache entry, i.e. its own cache write.
     */
    noStore?: boolean;
};

async function wpRequest(
    path: string,
    { namespace = "wp/v2", tags, noStore = false }: WpFetchOptions,
): Promise<Response | null> {
    if (!baseUrl) return null;

    const headers: HeadersInit = {};
    if (WP_USERNAME && WP_PASSWORD) {
        const auth = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString("base64");
        headers["Authorization"] = `Basic ${auth}`;
    }

    const res = await fetch(
        `${baseUrl.replace(/\/$/, "")}/wp-json/${namespace}/${path}`,
        noStore
            ? { headers, cache: "no-store" }
            : {
                headers,
                next: { revalidate: WP_REVALIDATE_SECONDS, tags: [CACHE_TAGS.all, ...tags] },
            },
    );
    return res.ok ? res : null;
}

async function wpFetch<T>(path: string, options: WpFetchOptions): Promise<T | null> {
    try {
        const res = await wpRequest(path, options);
        if (!res) return null;
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

async function wpFetchWithMeta<T>(
    path: string,
    options: WpFetchOptions,
): Promise<{ data: T | null; total: number; totalPages: number }> {
    try {
        const res = await wpRequest(path, options);
        if (!res) return { data: null, total: 0, totalPages: 0 };
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
    const data = await wpFetch<WpPost[]>(`posts?per_page=${limit}`, { tags: [CACHE_TAGS.posts] });
    return data ?? [];
}

export async function getPostsByCategory(category: string, limit = 12) {
    const encoded = encodeURIComponent(category);
    const data = await wpFetch<WpPost[]>(
        `posts?categories=${encoded}&per_page=${limit}`,
        { tags: [CACHE_TAGS.posts] },
    );
    return data ?? [];
}

export async function getAllPosts(page = 1, perPage = 12) {
    const data = await wpFetch<WpPost[]>(
        `posts?per_page=${perPage}&page=${page}`,
        { tags: [CACHE_TAGS.posts] },
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
        { tags: [CACHE_TAGS.posts], noStore: Boolean(search) },
    );

    if (data === null) {
        return { posts: [], total: 0, totalPages: 0 };
    }

    return { posts: data, total, totalPages };
}

export async function getPostBySlug(slug: string) {
    const data = await wpFetch<WpPost[]>(
        `posts?slug=${encodeURIComponent(slug)}&per_page=1`,
        { tags: [CACHE_TAGS.posts] },
    );
    if (data === null || data.length === 0) return null;
    return data[0];
}

// ── Categories ─────────────────────────────────────────────────────────────────────────

export async function getCategories(): Promise<WpCategory[]> {
    const data = await wpFetch<WpCategory[]>("categories?per_page=100&hide_empty=true", { tags: [CACHE_TAGS.categories] });
    return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<WpCategory | null> {
    const data = await wpFetch<WpCategory[]>(
        `categories?slug=${encodeURIComponent(slug)}&per_page=1`,
        { tags: [CACHE_TAGS.categories] },
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
        { tags: [CACHE_TAGS.posts], noStore: Boolean(search) },
    );

    if (data === null) {
        return { posts: [], total: 0, totalPages: 0 };
    }

    return { posts: data, total, totalPages };
}

// ── Achievements ───────────────────────────────────────────────────────────────────────────

export async function getAchievementsWithImage() {
    const data = await wpFetch<Achievement[]>("prestasi-with-image", { namespace: "smanas/v1", tags: [CACHE_TAGS.achievements] });
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

    const data = await wpFetch<Array<Achievement>>(endpoint, { namespace: "jet-cct", tags: [CACHE_TAGS.achievements] });
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
    const data = await wpFetch<WpGalleryItem[]>(`gallery?_limit=${limit}`, { namespace: "jet-cct", tags: [CACHE_TAGS.gallery] });
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
        { namespace: "jet-cct", tags: [CACHE_TAGS.gallery] },
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
    const data = await wpFetch<WpGalleryItem>(`gallery/${encodeURIComponent(id)}`, { namespace: "jet-cct", tags: [CACHE_TAGS.gallery] });
    return data;
}

// ── Teachers ───────────────────────────────────────────────────────────────────────────────

export async function getTeachers(category?: TeacherCategory, limit = 100): Promise<WpTeacher[]> {
    const params = new URLSearchParams({ _limit: String(limit) });
    if (category) params.set("category", category);
    const data = await wpFetch<WpTeacher[]>(`teachers?${params.toString()}`, { namespace: "jet-cct", tags: [CACHE_TAGS.teachers] });
    return data ?? [];
}

export async function getTeacherById(id: string | number): Promise<WpTeacher | null> {
    const data = await wpFetch<WpTeacher>(`teachers/${encodeURIComponent(id)}`, { namespace: "jet-cct", tags: [CACHE_TAGS.teachers] });
    return data;
}

// ── Site Config ───────────────────────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SmanasSiteConfig | null> {
    return wpFetch<SmanasSiteConfig>("configs", { namespace: "smanas/v1", tags: [CACHE_TAGS.siteConfig] });
}

// ── Profiles Config ───────────────────────────────────────────────────────────────────────────

export async function getProfilesConfig() {
    return wpFetch<SmanasProfilesConfig>("profiles", { namespace: "smanas/v1", tags: [CACHE_TAGS.profiles] });
}

// ── PPDB (custom post type) ──────────────────────────────────────────────────────────────────────

export async function getPpdbById(id: number): Promise<WpPpdbItem | null> {
    const data = await wpFetch<WpPpdbItem>(`ppdb/${id}`, { tags: [CACHE_TAGS.ppdb] });
    return data;
}

export async function getPpdbList(limit = 10): Promise<WpPpdbItem[]> {
    const data = await wpFetch<WpPpdbItem[]>(`ppdb?per_page=${limit}&orderby=date&order=desc`, { tags: [CACHE_TAGS.ppdb] });
    return data ?? [];
}

export async function getPpdbBySlug(slug: string): Promise<WpPpdbItem | null> {
    const data = await wpFetch<WpPpdbItem[]>(`ppdb?slug=${encodeURIComponent(slug)}&per_page=1`, { tags: [CACHE_TAGS.ppdb] });
    if (data === null || data.length === 0) return null;
    return data[0];
}

/**
 * Fetch a single post or page by numeric ID.
 * Tries wp/v2/posts first, then wp/v2/pages.
 * Used to resolve `meta.related_content` IDs.
 */
export async function getPostOrPageById(id: number): Promise<{ slug: string; title: string; type: "post" | "page" } | null> {
    const post = await wpFetch<WpPost>(`posts/${id}`, { tags: [CACHE_TAGS.posts] });
    if (post) return { slug: post.slug, title: post.title.rendered, type: "post" };
    const page = await wpFetch<WpPost>(`pages/${id}`, { tags: [CACHE_TAGS.pages] });
    if (page) return { slug: page.slug, title: page.title.rendered, type: "page" };
    return null;
}

// ── Contact Config ────────────────────────────────────────────────────────────────────────────

export async function getContactConfig(): Promise<SmanasContactConfig | null> {
    return wpFetch<SmanasContactConfig>("contact", { namespace: "smanas/v1", tags: [CACHE_TAGS.contact] });
}

// ── Pages (post_type=page) ─────────────────────────────────────────────────────────────────────

export async function getPageBySlug(slug: string): Promise<WpPost | null> {
    const data = await wpFetch<WpPost[]>(
        `pages?slug=${encodeURIComponent(slug)}&per_page=1`,
        { tags: [CACHE_TAGS.pages] },
    );
    if (data === null || data.length === 0) return null;
    return data[0];
}

// ── Attachments ────────────────────────────────────────────────────────────────────────────────

export async function getMediaById(id: number) {
    const data = await wpFetch<WpMediaItem>(`media/${id}`, { tags: [CACHE_TAGS.media] });
    if (data === null) {
        return null;
    }
    return data;
}

// ── Tags ────────────────────────────────────────────────────────────────────────────────────

export async function getTagsByIds(ids: number[]): Promise<WpTag[]> {
    if (ids.length === 0) return [];
    const data = await wpFetch<WpTag[]>(`tags?include=${ids.join(",")}&per_page=100`, { tags: [CACHE_TAGS.tags] });
    return data ?? [];
}

// ── Adjacent posts ────────────────────────────────────────────────────────────────────────────

/** Get the next newer post relative to the given ISO date string */
export async function getNextPost(date: string): Promise<WpPost | null> {
    const data = await wpFetch<WpPost[]>(
        `posts?after=${encodeURIComponent(date)}&per_page=1&order=asc`,
        { tags: [CACHE_TAGS.posts] },
    );
    if (data === null || data.length === 0) return null;
    return data[0];
}

/** Get the previous older post relative to the given ISO date string */
export async function getPrevPost(date: string): Promise<WpPost | null> {
    const data = await wpFetch<WpPost[]>(
        `posts?before=${encodeURIComponent(date)}&per_page=1&order=desc`,
        { tags: [CACHE_TAGS.posts] },
    );
    if (data === null || data.length === 0) return null;
    return data[0];
}


