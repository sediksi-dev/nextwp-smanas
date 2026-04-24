import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function HasilSeleksiPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "PPDB", href: "/ppdb" },
                        { label: "Hasil Seleksi" },
                    ]}
                />
            </div>

            <section className="container surface section">
                <p className="eyebrow">Hasil Seleksi</p>
                <h1 className="section-title">Pengumuman PPDB</h1>
                <p className="section-copy">
                    Hasil seleksi akan dipublikasikan sesuai jadwal resmi panitia. Silakan cek berkala.
                </p>
            </section>

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
        </main>
    );
}
