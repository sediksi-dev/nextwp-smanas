import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";

export default function DokumenSiswaPage() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Dokumen Siswa" }]}>
            <Section py="sm">
                <h1 className="section-title">Dokumen Siswa</h1>
                <p className="section-copy">Filter mata pelajaran dan daftar file akan dihubungkan dari CMS.</p>
            </Section>
        </PageWrap>
    );
}
