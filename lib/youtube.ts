/** YouTube RSS feed utilities — no API key required. */

export interface YoutubeVideo {
    id: string;
    title: string;
    url: string;
    /** `https://img.youtube.com/vi/{id}/hqdefault.jpg` — already in next.config remotePatterns */
    thumbnail: string;
    publishedAt: string;
}

const CHANNEL_ID = "UCNGkr7r-39mCt897G7HB2nA";

function between(src: string, open: string, close: string): string {
    const start = src.indexOf(open);
    if (start === -1) return "";
    const end = src.indexOf(close, start + open.length);
    if (end === -1) return "";
    return src.slice(start + open.length, end);
}

function decodeXmlEntities(str: string): string {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
}

/**
 * Fetches the latest videos from the school YouTube channel via public RSS feed.
 * Results are cached and revalidated every 6 hours via Next.js fetch cache.
 * @param limit   Number of videos to return (default 6)
 * @param channelId  Override the default channel ID (configured in app/page.tsx)
 */
export async function getYoutubeVideos(limit = 6, channelId?: string): Promise<YoutubeVideo[]> {
    const id = channelId ?? CHANNEL_ID;
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
    try {
        const res = await fetch(rssUrl, {
            // The homepage re-renders (an ISR write) whenever this expires.
            next: { revalidate: 21600 },
        });
        if (!res.ok) return [];

        const xml = await res.text();
        const entries = xml.split("<entry>").slice(1);

        return entries.slice(0, limit).flatMap((entry): YoutubeVideo[] => {
            const id = between(entry, "<yt:videoId>", "</yt:videoId>");
            const title = decodeXmlEntities(between(entry, "<title>", "</title>"));
            const publishedAt = between(entry, "<published>", "</published>");
            if (!id) return [];
            return [{
                id,
                title,
                url: `https://www.youtube.com/watch?v=${id}`,
                thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
                publishedAt,
            }];
        });
    } catch {
        return [];
    }
}
