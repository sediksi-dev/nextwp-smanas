import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getLatestPosts } from "@/lib/wordpress";

export const revalidate = 1800;

export default async function BeritaPage() {
    const posts = await getLatestPosts(9);

    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Berita" }]} />
            </div>

            <section className="container surface section">
                <h1 className="section-title">Berita dan Informasi Terbaru</h1>
                <p className="section-copy">Konten otomatis mengambil dari WordPress REST API dengan fallback aman.</p>
            </section>

            <section className="container grid-3">
                {posts.map((post) => (
                    <Card key={post.id} className="flex flex-col">
                        <CardHeader>
                            <Badge variant="secondary" className="w-fit">
                                {new Date(post.date).toLocaleDateString("id-ID")}
                            </Badge>
                            <CardTitle className="mt-2 text-base">{post.title.rendered}</CardTitle>
                            <CardDescription
                                dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered ?? "Tidak ada ringkasan" }}
                            />
                        </CardHeader>
                        <CardFooter className="mt-auto">
                            <Button asChild variant="secondary" size="sm">
                                <Link href={`/berita/${post.slug}`}>Baca Detail</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </main>
    );
}
