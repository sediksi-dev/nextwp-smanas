import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const IMAGE_PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e8f4fb'/%3E%3Crect x='150' y='90' width='100' height='80' rx='8' fill='%2329abe2' opacity='.25'/%3E%3Ccircle cx='200' cy='120' r='22' fill='%2329abe2' opacity='.35'/%3E%3Cpath d='M160 170 l30-40 25 30 18-20 47 30z' fill='%2329abe2' opacity='.2'/%3E%3C/svg%3E";

interface PostGridCardProps {
    /** Raw HTML title string */
    title: string;
    /** Raw HTML excerpt string */
    excerpt: string;
    href: string;
    imageUrl?: string;
    date: string;
    categoryName?: string;
}

export function PostGridCard({
    title,
    excerpt,
    href,
    imageUrl,
    date,
    categoryName,
}: PostGridCardProps) {
    return (
        <article className="surface flex flex-col overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={imageUrl ?? IMAGE_PLACEHOLDER}
                    alt={title.replace(/<[^>]+>/g, "")}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-2">
                    {categoryName && (
                        <Badge variant="secondary" className="text-xs">
                            {categoryName}
                        </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{date}</span>
                </div>
                <h2
                    className="font-bold leading-snug"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <div
                    className="text-sm text-muted-foreground line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                />
                <Button asChild variant="link" size="sm" className="mt-auto self-start px-0">
                    <Link href={href}>Baca selengkapnya &rarr;</Link>
                </Button>
            </div>
        </article>
    );
}
