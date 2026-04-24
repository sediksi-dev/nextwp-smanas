import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="page-wrap">
            <section className="container surface section">
                <p className="eyebrow">404</p>
                <h1 className="section-title">Halaman Tidak Ditemukan</h1>
                <p className="section-copy">
                    Konten yang Anda cari belum tersedia atau URL tidak valid.
                </p>
                <div className="hero-actions">
                    <Button asChild variant="accent">
                        <Link href="/">Kembali ke Beranda</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/ppdb">Buka PPDB</Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
