import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function AgendaPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Agenda" }]} />
            </div>
            <section className="container surface section">
                <h1 className="section-title">Agenda Sekolah</h1>
                <p className="section-copy">Halaman agenda siap untuk diisi konten berkala.</p>
            </section>
        </main>
    );
}
