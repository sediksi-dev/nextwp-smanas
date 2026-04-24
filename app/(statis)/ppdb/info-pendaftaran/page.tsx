import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";

const steps = [
    "Registrasi akun pendaftar melalui kanal resmi sekolah",
    "Lengkapi data diri dan unggah dokumen yang diminta",
    "Verifikasi berkas oleh panitia PPDB",
    "Mengikuti tes/seleksi sesuai jalur pendaftaran",
    "Pengumuman hasil seleksi dan daftar ulang",
];

export default function InfoPendaftaranPage() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "PPDB", href: "/ppdb" }, { label: "Info Pendaftaran" }]}>
            <Section py="sm">
                <p className="eyebrow">Info Pendaftaran</p>
                <h1 className="section-title">Tahapan PPDB 2026/2027</h1>
                <p className="section-copy">Pastikan setiap tahapan dilakukan sesuai jadwal resmi.</p>
            </Section>

            <section className="container surface section">
                <ol style={{ margin: 0, paddingLeft: "1.1rem", display: "grid", gap: "0.7rem" }}>
                    {steps.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </section>
        </PageWrap>
    );
}
