import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAGS, mediaTag, type CacheTag } from "@/lib/wordpress";

export const maxDuration = 30;

/**
 * WordPress webhook handler for content revalidation.
 *
 * The "Next.js Revalidation" plugin posts `{ contentType, contentId }` on every
 * save_post (any post type, drafts included — README.WP.md limits that to public
 * changes), term, media, user and menu change, and `contentType: "all"` from its
 * "Revalidate all" button. Only the cache tags fed by that content type are
 * invalidated, so an edit doesn't force every page on the site to be re-rendered
 * and re-written.
 *
 * JetEngine CCT and Options Pages don't trigger the plugin; their types are listed
 * so a custom hook (see README.WP.md) can target them.
 */
const TAGS_BY_CONTENT_TYPE: Record<string, CacheTag[]> = {
    all: [CACHE_TAGS.all],
    // post_type values. Publishing or trashing a post changes category counts
    // (and so `hide_empty` membership) without a term webhook.
    post: [CACHE_TAGS.posts, CACHE_TAGS.categories],
    page: [CACHE_TAGS.pages],
    ppdb: [CACHE_TAGS.ppdb],
    // Synced patterns are expanded into content.rendered.
    wp_block: [CACHE_TAGS.posts, CACHE_TAGS.pages, CACHE_TAGS.ppdb],
    // Terms. The plugin throttles webhooks within one request, so a save that creates
    // a term may deliver only the term webhook — refresh posts too. The homepage
    // config embeds category slugs.
    category: [CACHE_TAGS.categories, CACHE_TAGS.posts, CACHE_TAGS.siteConfig],
    tag: [CACHE_TAGS.tags, CACHE_TAGS.posts],
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

function tagsFor(contentType: string, contentId: unknown): CacheTag[] {
    if (contentType === "media" || contentType === "attachment") {
        // A new upload has an id no cached fetch references, so only that attachment's
        // fetches (plus raw files fetched by URL) need refreshing.
        const id = Number(contentId);
        return Number.isInteger(id) && id > 0
            ? [mediaTag(id), CACHE_TAGS.mediaFiles]
            : [CACHE_TAGS.media, CACHE_TAGS.mediaFiles];
    }
    // Unknown types (author, menu, nav_menu_item, oembed_cache, other post types…)
    // feed nothing the frontend renders, so they are acknowledged without revalidating.
    return TAGS_BY_CONTENT_TYPE[contentType] ?? [];
}

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

    const tags = tagsFor(contentType, contentId);
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
