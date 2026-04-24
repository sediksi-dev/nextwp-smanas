import { Breadcrumb } from "@/components/ui/breadcrumb";

const requirements = [
    "Fotokopi ijazah/SKL SMP sederajat",
    "Fotokopi Kartu Keluarga",
    "Fotokopi Akta Kelahiran",
    "Pas foto terbaru ukuran 3x4",
    "Formulir pendaftaran yang telah diisi lengkap",
];

export default function PersyaratanPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "PPDB", href: "/ppdb" },
                        { label: "Persyaratan" },
                    ]}
                />
            </div>

            <section className="container surface section">
                <p className="eyebrow">Persyaratan</p>
                <h1 className="section-title">Dokumen Wajib PPDB</h1>
            </section>

            <section className="container grid-3">
                {requirements.map((item) => (
                    <article className="card" key={item}>
                        <h3>{item}</h3>
                    </article>
                ))}
            </section>
        </main>
    );
}
