# Website Redesign Brief

## SMA Nasional Malang (SMANAS)

|                   |                          |
| ----------------- | ------------------------ |
| **Versi**         | 2.2                      |
| **Tanggal**       | April 2026               |
| **Dokumen untuk** | Tim Desainer / Developer |

---

## 1. Gambaran Umum Proyek

| Atribut             | Detail                                                        |
| ------------------- | ------------------------------------------------------------- |
| **Nama Klien**      | SMA Nasional Malang (SMANAS)                                  |
| **Tipe Proyek**     | Redesign Website Sekolah                                      |
| **Website Lama**    | https://dash.smanasionalmalang.sch.id                         |
| **Stack Lama**      | WordPress + Pods Framework (content) + Elementor (frontend)   |
| **Arsitektur Baru** | WordPress Headless + JetEngine (content) + Next.js (frontend) |
| **Status Konten**   | Migrasi konten lama + pembaruan konten                        |

---

## 2. Latar Belakang & Tujuan Redesign

### Masalah pada Website Saat Ini

| #   | Masalah                                                                   | Dampak                          |
| --- | ------------------------------------------------------------------------- | ------------------------------- |
| 1   | Desain visual usang — tampilan biru polos, tipografi monoton, layout kaku | Kesan tidak profesional         |
| 2   | Konten stale — artikel terakhir dipublikasikan tahun 2021                 | Informasi tidak kredibel        |
| 3   | Halaman rusak — Galeri > Video mengarah ke 404                            | Pengalaman pengguna buruk       |
| 4   | Navigasi terlalu padat — 8 item di navbar utama                           | Sulit dinavigasi                |
| 5   | Tidak mobile-first                                                        | Tidak nyaman di smartphone      |
| 6   | Tidak ada CTA yang jelas untuk PPDB                                       | Calon siswa kesulitan mendaftar |
| 7   | Tidak ada fitur pencarian konten                                          | Konten sulit ditemukan          |
| 8   | Footer minimalis dan tidak terorganisir                                   | Informasi penting sulit diakses |

### Tujuan Redesign

1. Meningkatkan kesan **profesional dan modern** sekolah
2. Mempermudah **calon siswa & orang tua** menemukan info PPDB
3. Membuat **pengelolaan konten lebih mudah** bagi admin/guru
4. Memperbaiki **struktur navigasi** agar lebih intuitif
5. Memastikan website **responsif di semua perangkat**

---

## 3. Target Pengguna (User Persona)

| Persona                            | Kebutuhan Utama                                | Halaman yang Sering Dikunjungi     |
| ---------------------------------- | ---------------------------------------------- | ---------------------------------- |
| **Calon Siswa Baru** (SMP kelas 9) | Info PPDB, profil sekolah, prestasi, ekskul    | Beranda, PPDB, Prestasi, Ekskul    |
| **Orang Tua Calon Siswa**          | Kredibilitas sekolah, fasilitas, kontak, biaya | Profil, Prestasi, Kontak, PPDB     |
| **Siswa Aktif**                    | Dokumen (soal, RPP), info agenda, karya siswa  | Dokumen Siswa, Agenda, Karya Siswa |
| **Guru & Staf**                    | Dokumen guru, upload karya, informasi rapat    | Dokumen Guru, Agenda, Karya Guru   |
| **Masyarakat Umum / Media**        | Berita terbaru, kliping media, prestasi        | Berita, Prestasi, Kontak           |

---

## 4. Sitemap Baru

```
Beranda (/)
├── PPDB (/ppdb/)
│   ├── Info Pendaftaran (/ppdb/info-pendaftaran/)
│   ├── Persyaratan (/ppdb/persyaratan/)              ← BARU
│   ├── Hasil Seleksi (/ppdb/hasil-seleksi/)
│   └── Arsip PPDB (/ppdb/arsip/)
│
├── Tentang Kami
│   ├── Profil Sekolah (/profil-sekolah/)
│   │   └── [tab: Sejarah, Makna Lambang, Komite, Mars Sekolah]
│   ├── Visi & Misi (/visi-misi/)
│   └── Struktur Organisasi (/struktur-sekolah/)
│
├── Akademik                                           ← RESTRUKTURISASI
│   ├── Guru & Karyawan (/guru-karyawan/)
│   │   ├── Daftar Guru (/guru-karyawan/guru/)
│   │   └── Staf/Karyawan (/guru-karyawan/staf/)
│   ├── Ekstrakurikuler (/ekskul/)
│   └── Dokumen (/dokumen/)
│       ├── Dokumen Siswa (/dokumen/siswa/)
│       └── Dokumen Guru (/dokumen/guru/)
│
├── Prestasi (/prestasi-sekolah/)
│
├── Info & Berita                                      ← DIGABUNG & DISEDERHANAKAN
│   ├── Berita (/berita/)
│   ├── Agenda (/agenda/)
│   ├── Inspirasi (/inspirasi/)
│   ├── Kliping Media (/kliping-media/)
│   └── Karya [Siswa & Guru] (/karya/)
│
├── Galeri (/galeri/)
│   ├── Foto (/galeri/foto/)
│   └── Video (/galeri/video/)                        ← DIPERBAIKI (embed YouTube)
│
└── Kontak (/kontak/)
```

---

## 5. Inventarisasi Konten

### 5.1 Halaman Statis

| #   | Halaman             | URL                       | Prioritas | Konten Kunci                                                                      |
| --- | ------------------- | ------------------------- | --------- | --------------------------------------------------------------------------------- |
| 1   | Beranda             | `/`                       | 🔴 Tinggi | Hero, Sambutan Kepsek, Highlight Prestasi, Berita Terbaru, Agenda, Galeri Preview |
| 2   | PPDB (Induk)        | `/ppdb/`                  | 🔴 Tinggi | Landing PPDB dengan 3 sub-kartu                                                   |
| 3   | Info Pendaftaran    | `/ppdb/info-pendaftaran/` | 🔴 Tinggi | Tahapan, jadwal, formulir/link daftar                                             |
| 4   | Hasil Seleksi       | `/ppdb/hasil-seleksi/`    | 🟡 Sedang | Tabel/pengumuman hasil tes                                                        |
| 5   | Arsip PPDB          | `/ppdb/arsip/`            | 🟢 Rendah | Daftar berita PPDB tahun lalu                                                     |
| 6   | Profil Sekolah      | `/profil-sekolah/`        | 🔴 Tinggi | Selayang pandang, tab multi-section                                               |
| 7   | Visi & Misi         | `/visi-misi/`             | 🟡 Sedang | Visi, Misi, Tujuan                                                                |
| 8   | Struktur Organisasi | `/struktur-sekolah/`      | 🟡 Sedang | Bagan/tabel struktur                                                              |
| 9   | Prestasi            | `/prestasi-sekolah/`      | 🔴 Tinggi | Slider penghargaan + daftar lengkap                                               |
| 10  | Guru & Karyawan     | `/guru-karyawan/`         | 🟡 Sedang | Grid foto profil per jabatan                                                      |
| 11  | Galeri              | `/galeri/`                | 🟡 Sedang | Grid album foto                                                                   |
| 12  | Kontak              | `/kontak/`                | 🔴 Tinggi | Alamat, telepon, email, maps, sosmed                                              |
| 13  | Dokumen Siswa       | `/dokumen/siswa/`         | 🟡 Sedang | Daftar file + filter mata pelajaran                                               |
| 14  | Dokumen Guru        | `/dokumen/guru/`          | 🟡 Sedang | Daftar file + filter mata pelajaran                                               |

### 5.2 Custom Post Types (CPT)

| CPT                 | Slug       | Fields Utama                                                           | Taksonomi                                                                           |
| ------------------- | ---------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Post / Artikel**  | `post`     | Judul, Konten (Rich Text), Foto Featured, Tanggal, Penulis             | Kategori: Berita, Agenda, Ekskul, Kliping Media, Karya Siswa, Karya Guru, Inspirasi |
| **Galeri Foto**     | `galeri`   | Judul Album, Deskripsi, Kumpulan Foto (multiple upload)                | Tag Kegiatan                                                                        |
| **Galeri Video**    | `video`    | Judul, URL YouTube / Embed, Thumbnail, Deskripsi                       | Tag Kegiatan                                                                        |
| **Dokumen**         | `dokumen`  | Judul, File (PDF/doc), Mata Pelajaran, Kelas, Jenis (Siswa/Guru)       | Mata Pelajaran, Jenis Dokumen                                                       |
| **Guru & Karyawan** | `guru`     | Nama, Foto, Jabatan, Mata Pelajaran, Bio singkat, Kontak               | Jabatan: Kepsek, Wakasek, Guru, Staf                                                |
| **Prestasi**        | `prestasi` | Nama Penghargaan, Tahun, Tingkat (Kota/Prov/Nasional), Foto Sertifikat | Tahun, Tingkat                                                                      |

### 5.3 Kategori Konten

| Kategori      | Slug            | Deskripsi                     |
| ------------- | --------------- | ----------------------------- |
| Berita        | `berita`        | Berita sekolah internal       |
| Agenda        | `agenda`        | Kegiatan/event sekolah        |
| Ekskul        | `ekskul`        | Info ekstrakurikuler          |
| Kliping Media | `kliping-media` | Artikel dari media massa      |
| Karya Siswa   | `karya-siswa`   | Tulisan/karya kreatif siswa   |
| Karya Guru    | `karya-guru`    | Tulisan/karya guru            |
| Inspirasi     | `inspirasi`     | Kisah inspiratif alumni/siswa |

---

## 6. Panduan Visual & Desain

### 6.1 Identitas Visual yang Dipertahankan

- Logo SMANAS (lambang sekolah)
- Warna identitas: **Biru** sebagai warna utama, **Kuning** sebagai aksen
- Nama lengkap: **SMA Nasional Malang**
- Tagline: _"SMA Swasta Favorit di Kota Malang"_

### 6.2 Arah Desain Baru

| Aspek         | Kondisi Lama                      | Target Baru                                       |
| ------------- | --------------------------------- | ------------------------------------------------- |
| **Gaya**      | Flat, kaku, biru solid            | Modern, clean, card-based                         |
| **Tipografi** | Sans-serif generik                | Inter / Plus Jakarta Sans                         |
| **Warna**     | Biru tua (#00AEEF) + kuning polos | Biru navy + biru muda + kuning aksen + abu terang |
| **Layout**    | Fixed width, kolom sempit         | Full-width, banyak whitespace, section-based      |
| **Gambar**    | Foto mentah apa adanya            | Hero image berkualitas + aspect ratio konsisten   |
| **Mobile**    | Tidak optimal                     | Mobile-first, hamburger menu                      |
| **CTA**       | Tidak ada                         | Tombol CTA PPDB di hero dan navbar                |

### 6.3 Komponen UI yang Dibutuhkan

- [ ] Navbar sticky + hamburger menu (mobile)
- [ ] Hero section dengan CTA PPDB
- [ ] Card artikel (foto + judul + tanggal + kategori + tombol)
- [ ] Card profil guru (foto bulat + nama + jabatan)
- [ ] Card dokumen (judul + mata pelajaran + tombol Lihat & Unduh)
- [ ] Album galeri foto dengan lightbox
- [ ] Embed video YouTube
- [ ] Slider/Carousel (hero + prestasi)
- [ ] Tab navigation (halaman profil)
- [ ] Filter berdasarkan kategori/tag
- [ ] Google Maps embed
- [ ] Accordion / FAQ _(opsional, untuk PPDB)_
- [ ] Footer multi-kolom (logo, navigasi, kontak, sosmed)
- [ ] Breadcrumb di setiap halaman
- [ ] Halaman 404 custom

---

## 7. Fitur & Fungsionalitas

### 7.1 Fitur yang Dipertahankan

- [x] Sistem konten multi-kategori
- [x] Upload & download dokumen (PDF)
- [x] Galeri foto album
- [x] Profil guru per jabatan
- [x] Embed Google Maps di halaman kontak
- [x] Link sosial media (Facebook, Instagram, YouTube, Email)

### 7.2 Fitur yang Diperbaiki

- [x] Galeri Video — diperbaiki dengan embed YouTube yang fungsional
- [x] Navigasi yang lebih ringkas dan intuitif
- [x] Halaman PPDB dengan info yang lebih terstruktur

### 7.3 Fitur Baru

- [ ] **Search bar** global di header
- [ ] **Tombol CTA PPDB** di header/hero yang selalu terlihat
- [ ] **Statistik sekolah** — animasi counter di beranda (jumlah siswa, guru, prestasi)
- [ ] **Pengumuman Penting** — banner/ticker di atas header
- [ ] **WhatsApp floating button** untuk kontak cepat
- [ ] **Related posts** di halaman artikel
- [ ] **Pagination / Load More** yang konsisten
- [ ] **Kalender Akademik** _(opsional)_

---

## 8. Status Konten & Aksi

| Konten                  | Status                      | Aksi yang Diperlukan                                |
| ----------------------- | --------------------------- | --------------------------------------------------- |
| Berita & Agenda         | Tidak diperbarui sejak 2021 | Buat konten baru setelah launch                     |
| Info PPDB               | Menampilkan data 2021/2022  | ⚠️ **Wajib diperbarui sebelum launch**              |
| Sambutan Kepala Sekolah | Masih relevan               | Perlu dicek apakah Kepsek masih sama                |
| Struktur Organisasi     | Perlu dikonfirmasi          | Verifikasi ulang dengan pihak sekolah               |
| Daftar Prestasi         | Ada, tidak terstruktur rapi | Reformatting — tambahkan tahun & tingkat yang jelas |
| Dokumen Siswa/Guru      | Ada, format baik            | Migrasi + tambah konten baru                        |
| Foto Galeri             | Ada                         | Migrasi + tambah album baru                         |
| Galeri Video            | Halaman 404                 | Buat ulang dengan embed YouTube                     |

---

## 9. Arsitektur Teknis (WordPress Headless + JetEngine + Next.js)

### 9.1 Stack

| Layer                    | Teknologi                    | Keterangan                                   |
| ------------------------ | ---------------------------- | -------------------------------------------- |
| **Frontend**             | Next.js 14+ (App Router)     | SSG/ISR, deployed di Vercel                  |
| **Backend / CMS**        | WordPress (Headless mode)    | Tidak ada Elementor di produksi              |
| **Content Modeling**     | JetEngine (Crocoblock)       | CPT, Custom Taxonomy, Meta Fields, Relations |
| **API**                  | WP REST API + WPGraphQL      | Pilih salah satu atau kombinasi (lihat 9.3)  |
| **Media**                | WordPress Media Library      | Gambar dioptimasi via `next/image`           |
| **Search**               | Fuse.js (client-side)        | Cukup untuk skala konten sekolah             |
| **Deployment Frontend**  | Vercel                       | —                                            |
| **Deployment WordPress** | VPS / Hosting yang sudah ada | WordPress tetap jalan di server terpisah     |

### 9.2 Migrasi dari Stack Lama

| Komponen Lama                     | Komponen Baru                  | Catatan Migrasi                                                                                                          |
| --------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Pods Framework** (CPT & fields) | **JetEngine**                  | Field definitions perlu dibuat ulang di JetEngine; data konten tetap bisa dimigrasi lewat WP REST API atau export/import |
| **Elementor** (frontend builder)  | **Next.js**                    | Elementor dinonaktifkan; frontend sepenuhnya dihandle Next.js                                                            |
| Theme Sediksi (custom WP theme)   | Headless theme / minimal theme | Pasang theme minimal (misal: Headless Theme atau theme kosong) agar WordPress tidak render halaman apapun                |

> ⚠️ **Catatan penting:** Pastikan Elementor dan theme lama **dinonaktifkan** setelah migrasi selesai agar tidak membebani performa WordPress sebagai API server. WordPress hanya perlu berjalan sebagai backend data, bukan sebagai renderer halaman.

### 9.3 Pilihan API: REST vs GraphQL

Untuk konsumsi data dari WordPress ke Next.js, ada dua pendekatan yang bisa digunakan:

| Aspek                 | WP REST API                        | WPGraphQL                                                                                                    |
| --------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Setup**             | Bawaan WordPress, langsung pakai   | Perlu install plugin WPGraphQL + WPGraphQL for JetEngine                                                     |
| **JetEngine support** | CPT & taxonomy otomatis ter-expose | Perlu plugin tambahan: [WPGraphQL for JetEngine](https://wpgraphql.com/2021/04/01/wpgraphql-for-jet-engine/) |
| **Efisiensi data**    | Over-fetching (response besar)     | Fetch hanya field yang dibutuhkan                                                                            |
| **Kemudahan**         | Lebih sederhana, dokumentasi luas  | Lebih powerful, tapi setup lebih kompleks                                                                    |
| **Rekomendasi**       | Cukup untuk proyek ini             | Pilih jika konten relasi antar CPT kompleks                                                                  |

> **Rekomendasi:** Mulai dengan **WP REST API** karena lebih cepat di-setup dan sudah cukup untuk kebutuhan SMANAS. Migrasi ke WPGraphQL bisa dilakukan bertahap jika dibutuhkan query yang lebih kompleks.

### 9.4 Konfigurasi JetEngine untuk Headless

Berikut adalah mapping antara content type yang dibutuhkan dengan konfigurasi JetEngine:

| Content Type    | Tipe di JetEngine   | Catatan                                               |
| --------------- | ------------------- | ----------------------------------------------------- |
| Post / Artikel  | Post Type bawaan WP | Gunakan kategori bawaan WP                            |
| Galeri Foto     | CPT: `galeri`       | Gunakan Repeater Field untuk multi-foto               |
| Galeri Video    | CPT: `video`        | Meta field: URL YouTube, thumbnail                    |
| Dokumen         | CPT: `dokumen`      | Meta field: file upload, mata pelajaran, kelas, jenis |
| Guru & Karyawan | CPT: `guru`         | Meta field: jabatan, mapel, foto, bio                 |
| Prestasi        | CPT: `prestasi`     | Meta field: tahun, tingkat, foto sertifikat           |

**Custom Taxonomy di JetEngine:**

| Taxonomy         | Digunakan oleh     | Slug                   |
| ---------------- | ------------------ | ---------------------- |
| Kategori Post    | Post / Artikel     | `category` (bawaan WP) |
| Jabatan          | Guru & Karyawan    | `jabatan`              |
| Mata Pelajaran   | Dokumen, Guru      | `mata-pelajaran`       |
| Tingkat Prestasi | Prestasi           | `tingkat-prestasi`     |
| Tag Kegiatan     | Galeri Foto, Video | `tag-kegiatan`         |

### 9.5 Rendering Strategy (Next.js)

| Halaman                   | Strategi | Revalidate | Alasan                              |
| ------------------------- | -------- | ---------- | ----------------------------------- |
| Beranda                   | ISR      | 3600 detik | Konten dinamis tapi tidak real-time |
| Profil, Visi-Misi, Kontak | SSG      | —          | Konten sangat jarang berubah        |
| PPDB, Prestasi            | ISR      | 3600 detik | Update berkala saat musim PPDB      |
| Berita, Agenda            | ISR      | 1800 detik | Lebih sering diperbarui             |
| Galeri Foto/Video         | ISR      | 7200 detik | Update tidak terlalu sering         |
| Dokumen Siswa/Guru        | ISR      | 900 detik  | Bisa berubah kapan saja             |

Selain time-based revalidation, aktifkan juga **on-demand revalidation** via webhook WordPress (lihat 9.6).

### 9.6 Integrasi WordPress → Next.js

- **On-demand Revalidation** — Gunakan plugin WP seperti [WP Webhooks](https://wordpress.org/plugins/wp-webhooks/) untuk mengirim POST request ke endpoint `/api/revalidate` di Next.js setiap kali konten dipublish/diupdate. Next.js kemudian memanggil `revalidatePath()` atau `revalidateTag()` untuk memperbarui cache secara instan.
- **Image Optimization** — Domain WordPress di-whitelist di `next.config.js` agar `next/image` bisa mengoptimasi gambar dari WordPress Media Library secara otomatis.
- **CORS** — Tambahkan header CORS di WordPress (lewat `functions.php` atau plugin) agar Next.js bisa fetch dari domain yang berbeda.
- **Authentication** — Untuk endpoint yang bersifat privat (misal: dokumen guru), gunakan **Application Password** WordPress sebagai Bearer Token di server-side fetch Next.js.
- **Environment Variables** — Pisahkan konfigurasi berikut di `.env.local`:
  ```
  NEXT_PUBLIC_WP_URL=https://cms.smanasionalmalang.sch.id
  WP_APP_PASSWORD=xxxx          # untuk endpoint privat
  REVALIDATE_SECRET=xxxx        # untuk validasi webhook
  ```

### 9.7 Struktur Folder Next.js (Rekomendasi)

```
/app
  /(site)
    /page.tsx                        → Beranda
    /ppdb/
      /page.tsx
      /info-pendaftaran/page.tsx
      /hasil-seleksi/page.tsx
      /arsip/page.tsx
    /profil-sekolah/page.tsx
    /visi-misi/page.tsx
    /struktur-sekolah/page.tsx
    /prestasi-sekolah/page.tsx
    /guru-karyawan/
      /page.tsx
      /guru/page.tsx
      /staf/page.tsx
    /ekskul/page.tsx
    /dokumen/
      /siswa/page.tsx
      /guru/page.tsx
    /berita/
      /page.tsx
      /[slug]/page.tsx
    /galeri/
      /foto/page.tsx
      /video/page.tsx
    /kontak/page.tsx
  /api
    /revalidate/route.ts             → Webhook endpoint dari WordPress
/components
  /ui/                               → Card, Button, Badge, Pagination, dll
  /layout/                           → Navbar, Footer, Breadcrumb
  /sections/                         → Hero, BeritaTerbaru, PrestasiSlider, dll
/lib
  /wordpress.ts                      → Fungsi fetch ke WP REST API
  /utils.ts
/types
  /wordpress.ts                      → Type definitions untuk semua response WP API
```

---

## 10. Checklist Sebelum Launch

### Konten

- [ ] Info PPDB diperbarui ke tahun berjalan
- [ ] Sambutan Kepala Sekolah dikonfirmasi/diperbarui
- [ ] Struktur Organisasi diverifikasi
- [ ] Minimal 5 berita/artikel terbaru diinput
- [ ] Galeri Video diperbaiki dengan embed YouTube
- [ ] Semua dokumen siswa & guru telah dimigrasi

### Teknis

- [ ] Semua halaman responsif di mobile, tablet, dan desktop
- [ ] Lighthouse score ≥ 90 (Performance, Accessibility, SEO)
- [ ] Semua link navigasi berfungsi (tidak ada 404)
- [ ] Sitemap XML di-generate dan didaftarkan ke Google Search Console
- [ ] Meta title & description terisi di semua halaman
- [ ] Open Graph image terpasang (untuk share sosmed)
- [ ] Elementor & theme Sediksi sudah dinonaktifkan di WordPress
- [ ] CORS header WordPress sudah dikonfigurasi
- [ ] Webhook WordPress → Next.js revalidation berfungsi
- [ ] Semua CPT & Custom Taxonomy JetEngine ter-expose di WP REST API
- [ ] `next/image` domain WordPress sudah di-whitelist di `next.config.js`
- [ ] Google Analytics / tracking terpasang

### Desain

- [ ] CTA PPDB terlihat jelas di beranda dan navbar
- [ ] Hamburger menu mobile berfungsi dengan baik
- [ ] Halaman 404 custom sudah dibuat
- [ ] Favicon dan app icon terpasang
