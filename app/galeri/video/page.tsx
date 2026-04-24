import { mockGallery } from "@/lib/mock-data";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 7200;

export default function GaleriVideoPage() {
    const videos = mockGallery.filter((item) => item.type === "Video");

    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "Galeri", href: "/galeri" },
                        { label: "Video" },
                    ]}
                />
            </div>

            <section className="container grid-3">
                {videos.map((video) => (
                    <Card key={video.title}>
                        <CardHeader>
                            <CardTitle className="text-base">{video.title}</CardTitle>
                            <CardDescription>Embed YouTube akan terhubung dari data CMS.</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </section>
        </main>
    );
}
