import Image from "next/image";
import Link from "next/link";

const IMAGE_PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e8f4fb'/%3E%3Crect x='150' y='90' width='100' height='80' rx='8' fill='%2329abe2' opacity='.25'/%3E%3Ccircle cx='200' cy='120' r='22' fill='%2329abe2' opacity='.35'/%3E%3Cpath d='M160 170 l30-40 25 30 18-20 47 30z' fill='%2329abe2' opacity='.2'/%3E%3C/svg%3E";

interface RelatedArtikelCardProps {
    href: string;
    /** Raw HTML title */
    title: string;
    /** Plain text excerpt */
    excerpt: string;
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
                    alt={title.replace(/<[^>]+>/g, "")}
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
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {excerpt}
                </p>
                <p className="text-xs text-muted-foreground mt-auto pt-2 border-t border-border">
                    {date}
                </p>
            </div>
        </Link>
    );
}
