import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";

export default function DokumenGuruPage() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Dokumen Guru" }]}>
            <Section py="sm">
                <h1 className="section-title">Dokumen Guru</h1>
                <p className="section-copy">Daftar dokumen internal akan diproteksi di layer server-side fetch.</p>
            </Section>
        </PageWrap>
    );
}
