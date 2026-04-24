import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWrap } from "@/components/layout/page-wrap";

export default function GaleriPage() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Galeri" }]}>
            <section className="container grid-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Galeri Foto</CardTitle>
                        <CardDescription>Kumpulan dokumentasi kegiatan sekolah.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="secondary" size="sm">
                            <Link href="/galeri/foto">Buka Foto</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Galeri Video</CardTitle>
                        <CardDescription>Video profil dan kegiatan dengan embed YouTube.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant="secondary" size="sm">
                            <Link href="/galeri/video">Buka Video</Link>
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </PageWrap>
    );
}
