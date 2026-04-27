import Image from "next/image";
import Link from "next/link";

const IMAGE_PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23e8f4fb'/%3E%3Crect x='300' y='135' width='200' height='160' rx='16' fill='%2329abe2' opacity='.2'/%3E%3Ccircle cx='400' cy='195' r='44' fill='%2329abe2' opacity='.3'/%3E%3Cpath d='M310 315 l60-80 50 60 36-40 94 60z' fill='%2329abe2' opacity='.15'/%3E%3C/svg%3E";

interface RelatedArtikelCardProps {
    href: string;
    title: string; // raw HTML
    excerpt: string; // plain text
    date: string;
    imageUrl?: string | null;
    categoryName?: string;
}

export function RelatedArtikelCard({
    href,
    title,
    excerpt,
    date,
    imageUrl,
    categoryName,
}: RelatedArtikelCardProps) {
    return (
        <Link href={href} className="surface flex flex-col overflow-hidden group">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={imageUrl ?? IMAGE_PLACEHOLDER}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                />
            </div>
            <div className="flex flex-col gap-1.5 p-4 flex-1">
                {categoryName && (
                    <span className="text-xs font-bold tracking-wider uppercase text-site-primary">
                        {categoryName}
                    </span>
                )}
                <h3
                    className="font-bold text-sm leading-snug group-hover:text-site-primary transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{excerpt}</p>
                <p className="text-xs text-muted-foreground mt-auto pt-2 border-t border-border">
                    {date}
                </p>
            </div>
        </Link>
    );
}
