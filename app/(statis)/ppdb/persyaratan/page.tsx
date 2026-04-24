import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";

const requirements = [
    "Fotokopi ijazah/SKL SMP sederajat",
    "Fotokopi Kartu Keluarga",
    "Fotokopi Akta Kelahiran",
    "Pas foto terbaru ukuran 3x4",
    "Formulir pendaftaran yang telah diisi lengkap",
];

export default function PersyaratanPage() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "PPDB", href: "/ppdb" }, { label: "Persyaratan" }]}>
            <Section py="sm">
                <p className="eyebrow">Persyaratan</p>
                <h1 className="section-title">Dokumen Wajib PPDB</h1>
            </Section>

            <section className="container grid-3">
                {requirements.map((item) => (
                    <article className="card" key={item}>
                        <h3>{item}</h3>
                    </article>
                ))}
            </section>
        </PageWrap>
    );
}
