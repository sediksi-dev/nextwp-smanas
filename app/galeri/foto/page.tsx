import { mockGallery } from "@/lib/mock-data";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const revalidate = 7200;

export default function GaleriFotoPage() {
    const photos = mockGallery.filter((item) => item.type === "Foto");

    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "Galeri", href: "/galeri" },
                        { label: "Foto" },
                    ]}
                />
            </div>

            <section className="container grid-3">
                {photos.map((photo) => (
                    <Card key={photo.title}>
                        <CardHeader>
                            <CardTitle className="text-base">{photo.title}</CardTitle>
                            <CardDescription>Album foto kegiatan sekolah.</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </section>
        </main>
    );
}
