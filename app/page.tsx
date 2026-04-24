import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="page-wrap">
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">SMA Nasional Malang</p>
            <h1 className="hero-title">SMA Swasta Favorit di Kota Malang</h1>
            <p className="hero-copy">
              Website resmi sedang dalam tahap redesign cepat. Halaman prioritas
              sedang kami implementasikan berdasarkan brief proyek.
            </p>
            <div className="hero-actions">
              <Button asChild variant="accent" size="lg">
                <Link href="/ppdb">Daftar PPDB</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/berita">Lihat Berita</Link>
              </Button>
            </div>
          </div>
          <div className="hero-panel">
            <p className="panel-kicker">Sprint 24 Jam</p>
            <ul>
              <li>Beranda + Navigasi inti</li>
              <li>PPDB lengkap</li>
              <li>Berita + Detail artikel</li>
              <li>Galeri Foto dan Video</li>
              <li>Katalog Guru dan Staf</li>
              <li>Kontak + Peta</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
