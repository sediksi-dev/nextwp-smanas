import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Inline SVG placeholder — no extra file needed */
const IMAGE_PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e8f4fb'/%3E%3Crect x='150' y='90' width='100' height='80' rx='8' fill='%2329abe2' opacity='.25'/%3E%3Ccircle cx='200' cy='120' r='22' fill='%2329abe2' opacity='.35'/%3E%3Cpath d='M160 170 l30-40 25 30 18-20 47 30z' fill='%2329abe2' opacity='.2'/%3E%3C/svg%3E";

export type PostCardBaseProps = {
    title: string;
    excerpt: string;
    href: string;
    date?: string;
    category?: string;
};

export type PostCardListProps = PostCardBaseProps & {
    image?: string;
};

export type PostCardDateProps = PostCardBaseProps & {
    /** ISO date string or formatted — only used for big-date display */
    dateISO?: string;
};

/* ── PostCardList ────────────────────────────────────────────────
   Compact horizontal card: small thumbnail (optional) on the left,
   title + excerpt on the right. Perfect for sidebar-style lists.
──────────────────────────────────────────────────────────────── */
export function PostCardList({
    title,
    excerpt,
    image,
    href,
    date,
    category,
}: PostCardListProps) {
    const src = image || IMAGE_PLACEHOLDER;

    return (
        <Link href={href} className="flex gap-3 group">
            <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-site-bg">
                <Image
                    src={src}
                    alt={title}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-col justify-center gap-1 min-w-0">
                {category && (
                    <span className="text-xs font-bold tracking-wider uppercase text-site-primary">
                        {category}
                    </span>
                )}
                {date && <p className="text-xs text-muted-foreground">{date}</p>}
                <p className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">{excerpt}</p>
            </div>
        </Link>
    );
}

/* ── PostCardListPlain ───────────────────────────────────────────
   Same as PostCardList but forces no image — purely text-based.
   Useful for text-only feeds (e.g., inspirasi, pengumuman).
──────────────────────────────────────────────────────────────── */
export function PostCardListPlain({
    title,
    excerpt,
    href,
    date,
    category,
}: PostCardBaseProps) {
    return (
        <Link href={href} className="group flex flex-col gap-1">
            {category && (
                <span className="text-xs font-bold tracking-wider uppercase text-site-primary">
                    {category}
                </span>
            )}
            {date && <p className="text-xs text-muted-foreground">{date}</p>}
            <p className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">{excerpt}</p>
        </Link>
    );
}

/* ── PostCardDate ────────────────────────────────────────────────
   Large date block on the left (day + month), title + excerpt on
   the right. Good for event/agenda listings.
──────────────────────────────────────────────────────────────── */
export function PostCardDate({
    title,
    excerpt,
    href,
    date,
    dateISO,
    category,
}: PostCardDateProps) {
    let day: string | undefined;
    let month: string | undefined;

    if (dateISO) {
        const d = new Date(dateISO);
        day = d.toLocaleDateString("id-ID", { day: "2-digit" });
        month = d.toLocaleDateString("id-ID", { month: "short" });
    } else if (date) {
        // fallback: use formatted string as-is in the day slot
        day = date;
    }

    return (
        <Link href={href} className="flex gap-4 group items-start">
            {/* Big date block */}
            <div className="shrink-0 w-14 rounded-xl overflow-hidden text-center border border-site-border bg-white">
                <div className="bg-site-primary py-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-white">
                        {month ?? ""}
                    </p>
                </div>
                <div className="py-2">
                    <p className="text-2xl font-extrabold leading-none text-site-primary-strong">
                        {day ?? "—"}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1 min-w-0 pt-1">
                {category && (
                    <span className="text-xs font-bold tracking-wider uppercase text-site-primary">
                        {category}
                    </span>
                )}
                <p className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">{excerpt}</p>
            </div>
        </Link>
    );
}

/* ── PostCardHorizontal ──────────────────────────────────────────
   Medium-sized landscape card: image on the left (1/3 width),
   content on the right. For featured or wider list layouts.
──────────────────────────────────────────────────────────────── */
export function PostCardHorizontal({
    title,
    excerpt,
    image,
    href,
    date,
    category,
}: PostCardListProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex rounded-xl overflow-hidden border border-site-border bg-white",
                "hover:shadow-md hover:border-site-primary/40 transition-all duration-300"
            )}
        >
            <div className="relative shrink-0 w-28 md:w-36 aspect-square overflow-hidden bg-site-bg">
                <Image
                    src={image || IMAGE_PLACEHOLDER}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 112px, 144px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-col justify-center gap-1.5 p-4 min-w-0">
                {category && (
                    <span className="text-xs font-bold tracking-wider uppercase text-site-primary">
                        {category}
                    </span>
                )}
                {date && <p className="text-xs text-muted-foreground">{date}</p>}
                <p className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">{excerpt}</p>
            </div>
        </Link>
    );
}
