import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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
