import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";

export const metadata = {
    title: "PPDB",
    description: "Informasi Penerimaan Peserta Didik Baru (PPDB) SMA Nasional Malang: jadwal, persyaratan, dan hasil seleksi.",
};

const ppdbMenus = [
    {
        title: "Info Pendaftaran",
        href: "/ppdb/info-pendaftaran",
        description: "Tahapan, jadwal, dan alur pendaftaran siswa baru.",
    },
    {
        title: "Persyaratan",
        href: "/ppdb/persyaratan",
        description: "Dokumen wajib dan ketentuan administrasi calon siswa.",
    },
    {
        title: "Hasil Seleksi",
        href: "/ppdb/hasil-seleksi",
        description: "Informasi pengumuman hasil seleksi sesuai jadwal resmi.",
    },
];

export default function PpdbPage() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "PPDB" }]}>
            <Section py="sm">
                <p className="eyebrow">Penerimaan Peserta Didik Baru</p>
                <h1 className="section-title">PPDB SMA Nasional Malang</h1>
                <p className="section-copy">
                    Akses cepat untuk seluruh informasi PPDB tahun ajaran terbaru.
                </p>
            </Section>

            <section className="container grid-3">
                {ppdbMenus.map((menu) => (
                    <Card key={menu.href}>
                        <CardHeader>
                            <CardTitle>{menu.title}</CardTitle>
                            <CardDescription>{menu.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild variant="secondary" size="sm">
                                <Link href={menu.href}>Buka Halaman</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </PageWrap>
    );
}
