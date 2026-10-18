import { clsx, type ClassValue } from "clsx";
import he from "he";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * WordPress slugs (`sanitize_title`) only contain letters, digits, "-", "_" and
 * percent-encoded bytes. Anything else (`wp-login.php`, `.env`, …) can't exist in
 * WordPress, so callers 404 without querying it and caching the empty result.
 */
export function isWpSlug(value: string): boolean {
    // Page components receive params percent-encoded but generateMetadata receives them
    // decoded; compare the encoded form so both accept the same slugs.
    const encoded = /%[0-9a-f]{2}/i.test(value) ? value : encodeURIComponent(value);
    return /^[A-Za-z0-9_%-]{1,200}$/.test(encoded);
}

/** Parses a `?page=` search param into a positive integer, defaulting to 1. */
export function parsePageParam(value: string | undefined): number {
    const page = Number(value);
    return Number.isInteger(page) && page > 0 ? page : 1;
}

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

// utils/parseHtmlContent.ts

export function parseHtmlContent(raw: string): string {
    // 1. Decode HTML entities (&amp; -> &, dll.)
    const decoded = he.decode(raw); // [web:73]

    // 2. Bersihkan escape dan newline
    const html = decoded
        .replace(/\\'/g, "'")
        .replace(/\r?\n/g, "<br />")
        .trim();

    return html;
}
