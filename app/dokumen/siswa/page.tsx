import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function DokumenSiswaPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "Dokumen Siswa" },
                    ]}
                />
            </div>

            <section className="container surface section">
                <h1 className="section-title">Dokumen Siswa</h1>
                <p className="section-copy">Filter mata pelajaran dan daftar file akan dihubungkan dari CMS.</p>
            </section>
        </main>
    );
}
