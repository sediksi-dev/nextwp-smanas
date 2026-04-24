import { Breadcrumb } from "@/components/ui/breadcrumb";

const steps = [
    "Registrasi akun pendaftar melalui kanal resmi sekolah",
    "Lengkapi data diri dan unggah dokumen yang diminta",
    "Verifikasi berkas oleh panitia PPDB",
    "Mengikuti tes/seleksi sesuai jalur pendaftaran",
    "Pengumuman hasil seleksi dan daftar ulang",
];

export default function InfoPendaftaranPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "PPDB", href: "/ppdb" },
                        { label: "Info Pendaftaran" },
                    ]}
                />
            </div>

            <section className="container surface section">
                <p className="eyebrow">Info Pendaftaran</p>
                <h1 className="section-title">Tahapan PPDB 2026/2027</h1>
                <p className="section-copy">Pastikan setiap tahapan dilakukan sesuai jadwal resmi.</p>
            </section>

            <section className="container surface section">
                <ol style={{ margin: 0, paddingLeft: "1.1rem", display: "grid", gap: "0.7rem" }}>
                    {steps.map((step) => (
                        <li key={step}>{step}</li>
                    ))}
                </ol>
            </section>
        </main>
    );
}
