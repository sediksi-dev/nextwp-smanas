import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAGS, type CacheTag } from "@/lib/wordpress";

export const maxDuration = 30;

/**
 * WordPress webhook handler for content revalidation.
 *
 * The "Next.js Revalidation" plugin posts `{ contentType, contentId }` on every
 * save_post (any post type, drafts included), term, media, user and menu change,
 * and `contentType: "all"` from its "Revalidate all" button. Only the cache tags fed
 * by that content type are invalidated, so an edit doesn't force every page on the
 * site to be re-rendered and re-written.
 *
 * JetEngine CCT and Options Pages don't trigger the plugin; their types are listed
 * so a custom hook (see README.WP.md) can target them.
 */
const TAGS_BY_CONTENT_TYPE: Record<string, CacheTag[]> = {
    all: [CACHE_TAGS.all],
    // post_type values
    post: [CACHE_TAGS.posts],
    page: [CACHE_TAGS.pages],
    ppdb: [CACHE_TAGS.ppdb],
    attachment: [CACHE_TAGS.media],
    // plugin-specific values
    media: [CACHE_TAGS.media],
    category: [CACHE_TAGS.categories],
    tag: [CACHE_TAGS.tags],
    // JetEngine CCT & Options Pages (custom hook)
    gallery: [CACHE_TAGS.gallery],
    teachers: [CACHE_TAGS.teachers],
    awards: [CACHE_TAGS.achievements],
    frontend: [CACHE_TAGS.siteConfig],
    frontpage_config: [CACHE_TAGS.siteConfig],
    slider_settings: [CACHE_TAGS.siteConfig],
    profile_config: [CACHE_TAGS.profiles],
    contact_config: [CACHE_TAGS.contact],
};

export async function POST(request: NextRequest) {
    const expectedSecret = process.env.WORDPRESS_WEBHOOK_SECRET;
    const secret = request.headers.get("x-webhook-secret");
    if (!expectedSecret || secret !== expectedSecret) {
        return NextResponse.json({ message: "Invalid webhook secret" }, { status: 401 });
    }

    let contentType: unknown;
    let contentId: unknown;
    try {
        ({ contentType, contentId } = await request.json());
    } catch {
        return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    if (typeof contentType !== "string" || !contentType) {
        return NextResponse.json({ message: "Missing content type" }, { status: 400 });
    }

    // Unknown types (author, menu, nav_menu_item, oembed_cache, other post types…)
    // feed nothing the frontend renders, so they are acknowledged without revalidating.
    const tags = TAGS_BY_CONTENT_TYPE[contentType] ?? [];
    for (const tag of tags) {
        revalidateTag(tag, { expire: 0 });
    }

    console.log(
        `Revalidate webhook: ${contentType}${contentId ? ` (ID: ${contentId})` : ""} → ${tags.length ? tags.join(", ") : "skipped"}`,
    );

    return NextResponse.json({
        revalidated: tags.length > 0,
        tags,
        timestamp: new Date().toISOString(),
    });
}
