import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function GuruKaryawanPage() {
    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb items={[{ label: "Beranda", href: "/" }, { label: "Guru & Karyawan" }]} />
            </div>

            <section className="container surface section">
                <h1 className="section-title">Guru dan Karyawan</h1>
                <p className="section-copy">Pilih kategori untuk melihat profil tenaga pendidik dan kependidikan.</p>
                <div className="hero-actions">
                    <Button asChild variant="secondary">
                        <Link href="/guru-karyawan/guru">Daftar Guru</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/guru-karyawan/staf">Daftar Staf</Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
