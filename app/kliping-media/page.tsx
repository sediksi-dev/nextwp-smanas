import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function KlipingMediaPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Kliping Media" }]} />
            </div>
            <section className="container surface section">
                <h1 className="section-title">Kliping Media</h1>
                <p className="section-copy">Kumpulan pemberitaan SMANAS dari media eksternal.</p>
            </section>
        </main>
    );
}
