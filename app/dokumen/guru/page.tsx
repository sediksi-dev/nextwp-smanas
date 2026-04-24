import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function DokumenGuruPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "Dokumen Guru" },
                    ]}
                />
            </div>

            <section className="container surface section">
                <h1 className="section-title">Dokumen Guru</h1>
                <p className="section-copy">Daftar dokumen internal akan diproteksi di layer server-side fetch.</p>
            </section>
        </main>
    );
}
