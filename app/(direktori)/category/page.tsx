import type { Metadata } from "next";
import Link from "next/link";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { Section } from "@/components/layout/section";
import { getCategories } from "@/lib/wordpress";

export const metadata: Metadata = {
    title: "Kategori Artikel | SMA Nasional Malang",
    description: "Jelajahi artikel berdasarkan kategori — Berita, Agenda, Inspirasi, dan lainnya.",
};

export default async function CategoryIndexPage() {
    const categories = await getCategories();

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "Kategori" },
            ]}
        >
            <PageHeading
                title="Kategori Artikel"
                subtitle="Jelajahi"
                description="Pilih kategori untuk melihat daftar artikel yang relevan."
            />

            <Section py="sm">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/category/${cat.slug}`}
                            className="group surface flex flex-col gap-2 p-5 rounded-xl border border-border hover:border-site-primary transition-colors"
                        >
                            <span className="text-base font-bold text-foreground group-hover:text-site-primary transition-colors line-clamp-2">
                                {cat.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {cat.count} artikel
                            </span>
                        </Link>
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
