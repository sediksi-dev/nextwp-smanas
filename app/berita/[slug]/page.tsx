import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getLatestPosts, getPostBySlug } from "@/lib/wordpress";

export const revalidate = 1800;

export async function generateStaticParams() {
    const posts = await getLatestPosts(12);
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BeritaDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "Berita", href: "/berita" },
                        { label: post.title.rendered },
                    ]}
                />
            </div>

            <article className="container surface section">
                <p className="eyebrow">Berita</p>
                <h1 className="section-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <p className="section-copy">{new Date(post.date).toLocaleDateString("id-ID")}</p>
                <div
                    style={{ marginTop: "1rem", lineHeight: 1.8 }}
                    dangerouslySetInnerHTML={{ __html: post.content?.rendered ?? "Konten belum tersedia." }}
                />
            </article>
        </main>
    );
}
