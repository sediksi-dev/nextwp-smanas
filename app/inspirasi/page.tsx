import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function InspirasiPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Inspirasi" }]} />
            </div>
            <section className="container surface section">
                <h1 className="section-title">Inspirasi</h1>
                <p className="section-copy">Ruang cerita inspiratif dari siswa, guru, dan alumni.</p>
            </section>
        </main>
    );
}
