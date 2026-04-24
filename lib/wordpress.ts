import { mockPosts } from "@/lib/mock-data";
import type { WpPost } from "@/types/wordpress";

const baseUrl = process.env.NEXT_PUBLIC_WP_URL;

async function wpFetch<T>(path: string): Promise<T | null> {
    if (!baseUrl) {
        return null;
    }

    try {
        const res = await fetch(`${baseUrl.replace(/\/$/, "")}/wp-json/wp/v2/${path}`, {
            next: { revalidate: 1800 },
        });

        if (!res.ok) {
            return null;
        }

        return (await res.json()) as T;
    } catch {
        return null;
    }
}

export async function getLatestPosts(limit = 6) {
    const data = await wpFetch<WpPost[]>(`posts?per_page=${limit}`);

    if (!data) {
        return mockPosts.slice(0, limit).map((item) => ({
            id: item.id,
            slug: item.slug,
            date: item.date,
            title: { rendered: item.title },
            excerpt: { rendered: item.excerpt },
            content: { rendered: item.content },
        }));
    }

    return data;
}

export async function getPostBySlug(slug: string) {
    const data = await wpFetch<WpPost[]>(`posts?slug=${slug}&per_page=1`);

    if (!data || data.length === 0) {
        const fallback = mockPosts.find((post) => post.slug === slug);
        if (!fallback) {
            return null;
        }

        return {
            id: fallback.id,
            slug: fallback.slug,
            date: fallback.date,
            title: { rendered: fallback.title },
            excerpt: { rendered: fallback.excerpt },
            content: { rendered: fallback.content },
        } satisfies WpPost;
    }

    return data[0];
}
