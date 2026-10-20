# SMANAS — Website SMA Nasional Malang

Website resmi **SMA Nasional Malang** dibangun dengan arsitektur **headless CMS**: WordPress berjalan sebagai backend murni yang menyediakan data via REST API, sedangkan frontend ini mengonsumsi data tersebut dan merender semua halaman.

---

## Daftar Isi

1. [Arsitektur](#1-arsitektur)
2. [Tech Stack](#2-tech-stack)
3. [Struktur Halaman](#3-struktur-halaman)
4. [Struktur Proyek](#4-struktur-proyek)
5. [Setup & Development](#5-setup--development)
6. [Variabel Lingkungan](#6-variabel-lingkungan)
7. [Webhook Revalidasi](#7-webhook-revalidasi)
8. [Strategi Caching (ISR)](#8-strategi-caching-isr)
9. [Deployment](#9-deployment)
10. [WordPress CMS Backend](#10-wordpress-cms-backend)

---

## 1. Arsitektur

```
Browser
  │
  ▼
Next.js Frontend (App Router, SSR/ISR)
  │
  └── Server Components ──► lib/wordpress.ts (server-only) ──► WordPress REST API
                                                                 smanas/v1 + wp/v2 + jet-cct

WordPress ──► POST /api/revalidate (webhook) ──► revalidateTag(...)
```

- **`lib/wordpress.ts`** — server-only, dipanggil langsung dari Server Components. Tidak pernah di-bundle ke client.
- **`app/api/revalidate`** — satu-satunya API route: webhook dari WordPress untuk revalidasi cache per tag.

---

## 2. Tech Stack

### Frontend

| Teknologi      | Versi  | Keterangan                                       |
| -------------- | ------ | ------------------------------------------------ |
| Next.js        | 16.2.4 | App Router, SSR/ISR, View Transitions            |
| React          | 19.2.4 | Server & Client Components                       |
| TypeScript     | 5.x    | Strict mode                                      |
| Tailwind CSS   | 4.x    | Utility-first; CSS variables via `@theme inline` |
| shadcn/ui      | latest | Base color: slate; style: default; RSC: true     |
| Framer Motion  | 12.x   | Page transitions & viewport animations           |
| Embla Carousel | 8.x    | Hero slider                                      |
| pnpm           | 9.x    | Package manager (workspace)                      |

### Backend (WordPress CMS)

| Teknologi               | Keterangan                                   |
| ----------------------- | -------------------------------------------- |
| WordPress               | Headless CMS; semua redirect ke frontend     |
| JetEngine               | CPT, CCT, Taxonomies, Options Pages          |
| Advanced Access Manager | Role & capability (`manage_frontend`)        |
| Next.js Revalidation    | Trigger ISR revalidation saat konten berubah |

> Detail lengkap konfigurasi WordPress: lihat [README.WP.md](README.WP.md)

### Fonts

| Font        | Peran              | Sumber       |
| ----------- | ------------------ | ------------ |
| Manrope     | Headline & display | Google Fonts |
| Public Sans | Body & UI          | Google Fonts |
| Geist Mono  | Konten teknis/kode | Vercel       |

---

## 3. Struktur Halaman

### Halaman Publik

| Route                        | Halaman                    | Keterangan                                 |
| ---------------------------- | -------------------------- | ------------------------------------------ |
| `/`                          | Beranda                    | Hero, sambutan, artikel, galeri, YouTube   |
| `/tentang`                   | Tentang Kami               | Hub navigasi profil                        |
| `/profil-sekolah`            | Profil Sekolah             | Tabs: sejarah, lambang, komite, mars       |
| `/visi-misi`                 | Visi & Misi                | Visi, misi, tujuan sekolah                 |
| `/struktur-organisasi`       | Struktur Organisasi        | OrgChart kepsek & wakasek                  |
| `/guru-karyawan`             | Guru & Karyawan            | Grid kepsek, wakasek, guru, staf           |
| `/guru-karyawan/guru`        | Daftar Guru                | Grid semua guru                            |
| `/guru-karyawan/staf`        | Daftar Staf                | Grid semua tenaga kependidikan             |
| `/guru-karyawan/guru/[slug]` | Profil Guru                | Detail profil guru                         |
| `/artikel`                   | Artikel                    | Grid + search + filter kategori + paginasi |
| `/artikel/[slug]`            | Detail Artikel             | Konten artikel + artikel terkait           |
| `/category`                  | Kategori                   | Daftar semua kategori artikel              |
| `/category/[slug]`           | Kategori — Detail          | Artikel per kategori + paginasi            |
| `/galeri`                    | Galeri Foto                | Grid foto + lightbox + paginasi            |
| `/prestasi`                  | Prestasi                   | Grid/list/plain + filter tahun & scope     |
| `/ppdb`                      | PPDB                       | Info PPDB aktif + arsip                    |
| `/ppdb/[slug]`               | Detail PPDB                | Konten + sidebar + flyer                   |
| `/ppdb/[slug]/hasil`         | Hasil Seleksi PPDB         | Tabel peserta dari file XLSX               |
| `/dokumen/guru`              | Dokumen Guru               | Placeholder (protected docs)               |
| `/dokumen/siswa`             | Dokumen Siswa              | Placeholder (CMS integration)              |
| `/kontak`                    | Kontak                     | Alamat, jam, sosmed, Google Maps           |
| `/[...slug]`                 | Halaman Dinamis (WP Pages) | Catch-all untuk WordPress Pages            |

### Admin Shortcuts (Redirect)

| Route       | Redirect ke                                      |
| ----------- | ------------------------------------------------ |
| `/wp-admin` | `https://dash.smanasionalmalang.sch.id/wp-admin` |
| `/admin`    | `https://dash.smanasionalmalang.sch.id/wp-admin` |
| `/login`    | `https://dash.smanasionalmalang.sch.id/wp-admin` |

---

## 4. Struktur Proyek

```
nextwp-smanas/
├── app/
│   ├── layout.tsx               # Root layout, fonts, metadata
│   ├── page.tsx                 # Beranda
│   ├── globals.css              # CSS variables, Tailwind, global utilities
│   ├── (direktori)/             # Route group: halaman informasi & konten
│   │   ├── artikel/
│   │   ├── category/
│   │   ├── dokumen/
│   │   ├── galeri/
│   │   ├── guru-karyawan/
│   │   ├── ppdb/
│   │   └── prestasi/
│   ├── (sekolah)/               # Route group: halaman tentang sekolah
│   │   ├── kontak/
│   │   ├── profil-sekolah/
│   │   ├── struktur-organisasi/
│   │   ├── tentang/
│   │   └── visi-misi/
│   ├── [...slug]/               # Catch-all untuk WordPress Pages
│   └── api/revalidate/          # Webhook revalidasi dari WordPress
├── components/
│   ├── elements/                # Atomic: PostCard, GalleryLightbox, SectionTitle
│   ├── layout/                  # Shell: SiteHeader, SiteFooter, PageWrap
│   ├── motion/                  # Animasi: FadeIn, SlideUp, StaggerContainer
│   ├── sections/                # Homepage sections: Hero, Posts, Gallery, dll
│   └── ui/                     # shadcn/ui primitives
├── lib/
│   ├── config.ts                # School info & social links (source of truth)
│   ├── site.ts                  # Nav tree & footer groups
│   ├── utils.ts                 # cn(), isWpSlug(), parsePageParam(), parseHtmlContent()
│   ├── wordpress.ts             # Server-only WP API layer (ISR)
│   └── youtube.ts               # YouTube RSS feed
├── types/
│   └── wordpress.ts             # Semua type definitions
└── public/
    └── assets/
```

---

## 5. Setup & Development

### Prasyarat

- Node.js 20+
- pnpm 9+
- WordPress backend aktif & accessible (lihat [README.WP.md](README.WP.md))

### Instalasi

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Build & Produksi

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

---

## 6. Variabel Lingkungan

Buat file `.env.local` di root proyek:

```env
# URL WordPress backend (tanpa trailing slash)
WP_URL=https://dash.smanasionalmalang.sch.id

# Kredensial WordPress user dengan role "application"
WP_APP_USERNAME=your-application-user
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx

# Revalidasi berbasis waktu dalam detik — hanya fallback, update konten lewat webhook
# (default: 86400 = 24 jam). Nilai kecil = halaman lebih sering ditulis ulang = ISR Writes Vercel naik.
WP_REVALIDATE_SECONDS=86400

# Secret untuk webhook revalidation dari WordPress
WORDPRESS_WEBHOOK_SECRET=your-secret-string

# YouTube API key (opsional — untuk fetch video channel)
YOUTUBE_API_KEY=your-youtube-api-key
```

> **Penting:** `WP_URL`, `WP_APP_USERNAME`, `WP_APP_PASSWORD` hanya tersedia di server. Tidak ada variabel `NEXT_PUBLIC_*` yang meng-ekspos URL backend ke browser.

---

## 7. Webhook Revalidasi

Semua data diambil oleh Server Components lewat `lib/wordpress.ts`; tidak ada API proxy untuk client. Satu-satunya route adalah:

| Method | Route             | Keterangan                                   |
| ------ | ----------------- | -------------------------------------------- |
| POST   | `/api/revalidate` | Webhook dari WordPress untuk revalidasi data |

Plugin **Next.js Revalidation** mengirim `POST /api/revalidate` dengan header `x-webhook-secret` (diverifikasi terhadap env `WORDPRESS_WEBHOOK_SECRET`) dan body:

```json
{ "contentType": "post", "contentId": 123 }
```

`contentType` dipetakan ke cache tag (lihat bagian 8). Tipe yang tidak dipakai frontend (`author`, `menu`, `nav_menu_item`, `oembed_cache`, dll.) dijawab `200` tanpa revalidasi.

---

## 8. Strategi Caching (ISR)

Setiap kali cache sebuah halaman kedaluwarsa atau di-revalidate, halaman itu dirender ulang dan ditulis ulang ke cache saat dikunjungi berikutnya — di Vercel ini dihitung sebagai **ISR Writes**. Karena itu:

- **Revalidasi utama lewat webhook, per tag.** Hanya data yang berubah yang di-invalidate, bukan seluruh situs.
- **Revalidasi berbasis waktu hanya fallback**: `WP_REVALIDATE_SECONDS` (default 24 jam). Feed YouTube di beranda: 6 jam.
- **Pencarian (`?q=`) tidak di-cache** (`cache: "no-store"`), karena setiap kata kunci akan menjadi entri cache baru.
- **Path probe bot** (`/wp-login.php`, `/wp-content/…`, `/.env`, slug dengan karakter yang tidak mungkin ada di WordPress) langsung 404 tanpa query ke WordPress.

Semua fetch ke WordPress diberi tag `wordpress` ditambah tag per jenis data:

| `contentType` webhook                                   | Cache tag          |
| ------------------------------------------------------- | ------------------ |
| `all` (tombol *Revalidate all* di plugin)               | `wordpress` (semua) |
| `post`                                                  | `wp-posts`, `wp-categories` (jumlah artikel per kategori) |
| `page`                                                  | `wp-pages`         |
| `ppdb`                                                  | `wp-ppdb`          |
| `wp_block` (synced pattern)                             | `wp-posts`, `wp-pages`, `wp-ppdb` |
| `media`, `attachment`                                   | `wp-media-{id}` + `wp-media-files` (file mentah, mis. xlsx hasil PPDB) |
| `category`                                              | `wp-categories`, `wp-posts`, `wp-site-config` |
| `tag`                                                   | `wp-tags`, `wp-posts` |
| `gallery` *                                             | `wp-gallery`       |
| `teachers` *                                            | `wp-teachers`      |
| `awards` *                                              | `wp-achievements`  |
| `frontend`, `frontpage_config`, `slider_settings` *     | `wp-site-config`   |
| `profile_config` *                                      | `wp-profiles`      |
| `contact_config` *                                      | `wp-contact`       |

\* JetEngine CCT & Options Pages **tidak** memicu plugin Next.js Revalidation. Tanpa hook tambahan (lihat [README.WP.md](README.WP.md#revalidasi-frontend-hook-tambahan-di-smanas-configphp)), perubahannya baru tampil setelah `WP_REVALIDATE_SECONDS` atau setelah klik *Revalidate all* di pengaturan plugin. Hook yang sama juga mencegah simpan draft/autosave memicu revalidasi.

Jika WordPress error (5xx/timeout) saat halaman dirender ulang, render dibatalkan sehingga ISR tetap menyajikan versi terakhir yang benar — bukan menyimpan halaman kosong selama 24 jam. Konsekuensinya, `next build` gagal bila WordPress sedang down saat deploy.

---

## 9. Deployment

### Vercel (Rekomendasi)

1. Push ke GitHub → Vercel otomatis build & deploy
2. Set semua [variabel lingkungan](#6-variabel-lingkungan) di Vercel project settings
3. Tambahkan domain `smanasionalmalang.sch.id`

```bash
# Build lokal sebelum push
pnpm build
```

### VPS / Self-hosted

```bash
pnpm build
pnpm start          # atau gunakan PM2:
pm2 start "pnpm start" --name smanas-frontend
```

---

## 10. WordPress CMS Backend

Dokumentasi lengkap konfigurasi WordPress headless — termasuk plugin, custom REST API, JetEngine CPT/CCT, role AAM, dan cara deploy ulang — ada di:

**[README.WP.md](README.WP.md)**

Ringkasan endpoint WordPress yang dipakai frontend:

| Endpoint                          | Data                                        |
| --------------------------------- | ------------------------------------------- |
| `GET /wp-json/smanas/v1/configs`  | Konfigurasi global (slider, sambutan, dll.) |
| `GET /wp-json/smanas/v1/profiles` | Profil sekolah, visi-misi, org structure    |
| `GET /wp-json/smanas/v1/contact`  | Kontak & jam operasional                    |
| `GET /wp-json/wp/v2/posts`        | Artikel (standard WP REST)                  |
| `GET /wp-json/wp/v2/categories`   | Kategori artikel                            |
| `GET /wp-json/wp/v2/ppdb`         | PPDB custom post type                       |
| `GET /wp-json/jet-cct/gallery`    | Galeri foto (JetEngine CCT)                 |
| `GET /wp-json/jet-cct/teachers`   | Data guru & staf (JetEngine CCT)            |
| `GET /wp-json/jet-cct/awards`     | Data prestasi (JetEngine CCT)               |

---

_Frontend dikelola oleh tim M.E.W. Dibuat: April 2026._
