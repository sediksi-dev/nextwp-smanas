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
7. [Internal API Routes (BFF)](#7-internal-api-routes-bff)
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
  ├── Server Components ──► lib/wordpress.ts (server-only) ──► WordPress REST API
  │                                                              smanas/v1 + wp/v2
  │
  └── Client Components ──► lib/api.ts ──► /api/* (Next.js BFF routes)
                                               │
                                               └──► lib/wordpress.ts ──► WordPress REST API
```

- **`lib/wordpress.ts`** — server-only, dipanggil langsung dari Server Components dan API routes. Tidak pernah di-bundle ke client.
- **`lib/api.ts`** — client-safe BFF wrapper. Memanggil `/api/*` internal routes. Dipakai dari Client Components yang butuh data fresh.
- **`app/api/*`** — 12 BFF API routes yang menjadi proxy antara client dan WordPress.

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
│   └── api/                    # BFF API routes (12 routes)
├── components/
│   ├── elements/                # Atomic: PostCard, GalleryLightbox, SectionTitle
│   ├── layout/                  # Shell: SiteHeader, SiteFooter, PageWrap
│   ├── motion/                  # Animasi: FadeIn, SlideUp, StaggerContainer
│   ├── sections/                # Homepage sections: Hero, Posts, Gallery, dll
│   └── ui/                     # shadcn/ui primitives
├── lib/
│   ├── api.ts                   # Client-safe BFF wrapper
│   ├── config.ts                # School info & social links (source of truth)
│   ├── site.ts                  # Nav tree & footer groups
│   ├── utils.ts                 # cn(), parseGalleryPhotos(), parseHtmlContent()
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

# Durasi ISR revalidation dalam detik (default: 1800 = 30 menit)
WP_REVALIDATE_SECONDS=1800

# Secret untuk webhook revalidation dari WordPress
WORDPRESS_WEBHOOK_SECRET=your-secret-string

# YouTube API key (opsional — untuk fetch video channel)
YOUTUBE_API_KEY=your-youtube-api-key
```

> **Penting:** `WP_URL`, `WP_APP_USERNAME`, `WP_APP_PASSWORD` hanya tersedia di server. Tidak ada variabel `NEXT_PUBLIC_*` yang meng-ekspos URL backend ke browser.

---

## 7. Internal API Routes (BFF)

Route-route ini berperan sebagai **Backend for Frontend (BFF)**: client components memanggil `/api/*`, bukan WordPress langsung.

| Method | Route                          | Keterangan                                            |
| ------ | ------------------------------ | ----------------------------------------------------- |
| GET    | `/api/config`                  | Konfigurasi global situs (dari `smanas/v1/configs`)   |
| GET    | `/api/contact`                 | Data kontak sekolah                                   |
| GET    | `/api/profile`                 | Data profil, visi-misi, struktur organisasi           |
| GET    | `/api/posts`                   | Posts: `?limit=N` atau `?page&per_page&search`        |
| GET    | `/api/posts/[slug]`            | Single post by slug                                   |
| GET    | `/api/categories`              | Semua kategori artikel                                |
| GET    | `/api/categories/[slug]`       | Kategori by slug                                      |
| GET    | `/api/categories/[slug]/posts` | Posts per kategori (paginated)                        |
| GET    | `/api/gallery`                 | Galeri: `?preview=true&limit=N` atau `?page&per_page` |
| GET    | `/api/gallery/[id]`            | Single gallery item                                   |
| GET    | `/api/teachers`                | Teachers: `?category=kepsek\|wakasek\|guru\|staf`     |
| GET    | `/api/teachers/[id]`           | Single teacher by `_ID`                               |
| GET    | `/api/achievements`            | Prestasi: `?with_image=true` atau filter params       |
| GET    | `/api/ppdb`                    | PPDB list: `?limit=N`                                 |
| GET    | `/api/media/[id]`              | WordPress media item by ID                            |
| POST   | `/api/revalidate`              | Webhook dari WordPress untuk trigger ISR              |

### Revalidate Webhook

WordPress mengirim `POST /api/revalidate` dengan header `x-webhook-secret` yang diverifikasi terhadap env `WORDPRESS_WEBHOOK_SECRET`. Body contoh:

```json
{ "contentType": "post", "contentId": 123 }
```

---

## 8. Strategi Caching (ISR)

Semua fetch ke WordPress menggunakan `next: { revalidate: WP_REVALIDATE_SECONDS }` (default 30 menit). Revalidasi on-demand dipicu via webhook WordPress ketika konten berubah.

| Cache Tag             | Di-revalidate ketika                  |
| --------------------- | ------------------------------------- |
| `wordpress`           | Semua perubahan konten (catch-all)    |
| `posts`               | Post baru atau diedit                 |
| `post-{id}`           | Post spesifik diedit                  |
| `posts-page-1`        | Post baru (mengubah urutan halaman 1) |
| `categories`          | Kategori ditambah/diubah              |
| `category-{id}`       | Kategori spesifik diubah              |
| `posts-category-{id}` | Post di kategori tertentu berubah     |
| `tags`                | Tag diubah                            |
| `tag-{id}`            | Tag spesifik diubah                   |
| `authors`             | Data author diubah                    |
| `author-{id}`         | Author spesifik diubah                |

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
