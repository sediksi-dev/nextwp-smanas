import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function KontakPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Kontak" }]} />
            </div>

            <section className="container grid-3">
                <article className="card">
                    <h3>Alamat</h3>
                    <p>Jl. Bandung No.7, Penanggungan, Kec. Klojen, Kota Malang</p>
                </article>
                <article className="card">
                    <h3>Telepon</h3>
                    <p>(0341) 362457</p>
                </article>
                <article className="card">
                    <h3>Email</h3>
                    <p>info@smanasionalmalang.sch.id</p>
                </article>
            </section>

            <section className="container surface section">
                <h2 className="section-title">Peta Lokasi</h2>
                <p className="section-copy">Embed Google Maps akan dihubungkan setelah URL final dikonfirmasi.</p>
            </section>
        </main>
    );
}
