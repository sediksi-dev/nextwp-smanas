import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function ProfilSekolahPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Profil Sekolah" }]} />
            </div>

            <section className="container surface section">
                <p className="eyebrow">Tentang Kami</p>
                <h1 className="section-title">Profil SMA Nasional Malang</h1>
                <p className="section-copy">
                    Halaman ini disiapkan untuk memuat sejarah, makna lambang, komite, dan mars sekolah.
                </p>
            </section>
        </main>
    );
}
