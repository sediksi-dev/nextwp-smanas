import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";

export default function HasilSeleksiPage() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "PPDB", href: "/ppdb" }, { label: "Hasil Seleksi" }]}>
            <Section py="sm">
                <p className="eyebrow">Hasil Seleksi</p>
                <h1 className="section-title">Pengumuman PPDB</h1>
                <p className="section-copy">
                    Hasil seleksi akan dipublikasikan sesuai jadwal resmi panitia. Silakan cek berkala.
                </p>
            </Section>

            <section className="container surface section">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th align="left">No</th>
                            <th align="left">Nama</th>
                            <th align="left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Contoh Peserta</td>
                            <td>Lulus</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </PageWrap>
    );
}
