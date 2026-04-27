# System Design — SMA Nasional Malang

Dokumen ini adalah petunjuk resmi penggunaan style untuk seluruh halaman dan komponen.
Gunakan ini sebagai acuan tunggal sebelum menambah atau mengubah tampilan.

## 1. Color Palette

### A. Token brand utama

| Token                   | Value                                  | Fungsi utama                         |
| ----------------------- | -------------------------------------- | ------------------------------------ |
| `--site-bg`             | `#F4FBFF`                              | Latar halaman                        |
| `--site-surface`        | `#FFFFFF`                              | Card, panel, area isi                |
| `--site-text`           | `#003366`                              | Teks utama dan heading               |
| `--site-muted`          | `#5F6D86`                              | Teks sekunder, metadata              |
| `--site-primary`        | `#29ABE2`                              | Tombol utama, link aktif, highlight  |
| `--site-primary-strong` | `#003366`                              | State hover/pressed atau panel gelap |
| `--site-accent`         | `#FFD700`                              | Aksen CTA, badge penting             |
| `--site-border`         | `#CFE5F4`                              | Border dan divider                   |
| `--site-shadow`         | `0 14px 30px rgba(41, 171, 226, 0.16)` | Shadow utama surface                 |

### B. Token semantic shadcn (dipakai di class Tailwind)

Gunakan utilitas semantic berikut di JSX:

- `bg-background`, `bg-card`, `bg-primary`, `bg-secondary`, `bg-muted`, `bg-accent`
- `text-foreground`, `text-primary`, `text-muted-foreground`, `text-accent-foreground`
- `border-border`, `ring-ring`

Untuk token brand `--site-*`, pakai utilitas Tailwind v4 yang dihasilkan dari `@theme inline`:

- `bg-site-bg`, `bg-site-surface`, `bg-site-primary`, `bg-site-accent`
- `text-site-text`, `text-site-muted`, `text-site-primary`
- `border-site-border`

### C. Cara pakai warna

- Gunakan `primary` untuk aksi utama dan status aktif.
- Gunakan `accent` secara selektif, maksimal 1 fokus visual per section.
- Jangan pakai warna hex/hsl/rgb langsung di JSX.
- Prioritaskan token semantic shadcn (`bg-background`, `text-foreground`, dst) untuk komponen UI.
- Gunakan utilitas `site-*` untuk kebutuhan brand level/page level (canvas, hero brand, aksen khas sekolah).

## 2. Typography Scale

### A. Font yang disetujui

- Headline: `Manrope`
- Body/UI: `Public Sans`
- Mono: `Geist Mono` hanya untuk konten teknis

### B. Skala tipografi

| Peran      | Font        | Weight | Size/Line Height |
| ---------- | ----------- | ------ | ---------------- |
| Display    | Manrope     | 800    | `56/64`          |
| H1         | Manrope     | 800    | `44/52`          |
| H2         | Manrope     | 700    | `36/44`          |
| H3         | Manrope     | 700    | `28/36`          |
| H4         | Manrope     | 700    | `22/30`          |
| Body Large | Public Sans | 400    | `18/30`          |
| Body       | Public Sans | 400    | `16/28`          |
| Small      | Public Sans | 400    | `14/22`          |
| Label      | Public Sans | 600    | `12/18`          |

### C. Aturan pakai

- Heading wajib mengikuti font `Manrope` (sudah diset global).
- Body copy utamakan keterbacaan, panjang baris ideal `55ch` sampai `65ch`.
- Jangan mencampur font headline lain.

## 3. Spacing & Layout

### A. Skala spacing

Pakai basis 4px: `4, 8, 12, 16, 24, 32, 48, 64, 80`.

### B. Pola layout global

- Lebar container utama: `1120px` (kelas `.container`).
- Wrapper halaman utama: pakai `.page-wrap`.
- Surface panel: pakai `.surface`.
- Section konten: pakai `.section`.

### C. Praktik yang direkomendasikan

- Card padding default: `p-5` atau setara 20px sampai 24px sesuai komponen bawaan.
- Jarak antar section halaman: `48px` sampai `64px`.
- Hero desktop: grid sekitar rasio `60/40`.

## 4. Border Radius & Shadows

### A. Radius

- Radius dasar semantic: `--radius = 0.75rem`.
- Surface/card: `rounded-2xl` atau `rounded-[--radius]` sesuai kebutuhan.
- Button/pill: `rounded-full`.

### B. Radius scale (computed dari `--radius = 0.75rem`)

| Token Tailwind               | Nilai                   | Kegunaan               |
| ---------------------------- | ----------------------- | ---------------------- |
| `rounded-sm` / `--radius-sm` | `0.5rem`                | Input, tag kecil       |
| `rounded-md` / `--radius-md` | `0.625rem`              | Badge, chip            |
| `rounded-lg` / `--radius-lg` | `0.75rem`               | Card default           |
| `rounded-xl` / `--radius-xl` | `1rem`                  | Panel besar            |
| `rounded-2xl`                | `1rem` (Tailwind scale) | Surface card           |
| `rounded-[1.25rem]`          | `1.25rem`               | `.surface` (by design) |
| `rounded-full`               | 9999px                  | Tombol, pill, avatar   |

### C. Shadow

- Shadow utama mengikuti `--site-shadow`.
- Tailwind utility: `shadow-site` (terdaftar via `@theme inline` → `--shadow-site: var(--site-shadow)`).
- Gunakan shadow lembut bernuansa biru; hindari shadow abu gelap pekat.

### D. Dark Mode Tokens

Dark mode mengikuti `.dark` class. Token semantic otomatis menyesuaikan:

| Token          | Light                                 | Dark                                      |
| -------------- | ------------------------------------- | ----------------------------------------- |
| `--background` | `hsl(202 100% 98%)` — biru muda       | `hsl(210 72% 11%)` — biru gelap           |
| `--foreground` | `hsl(210 100% 20%)` — navy            | `hsl(202 100% 97%)` — putih biru          |
| `--card`       | `hsl(0 0% 100%)` — putih              | `hsl(210 58% 14%)` — biru surface         |
| `--primary`    | `hsl(198 76% 52%)` — biru terang      | `hsl(198 76% 60%)` — sedikit lebih terang |
| `--muted`      | `hsl(210 34% 95%)` — abu muda         | `hsl(210 30% 18%)` — abu gelap            |
| `--border`     | `hsl(198 53% 88%)` — biru border muda | `hsl(210 34% 24%)` — border gelap         |

> Token `--site-*` (brand) **tidak berubah** di dark mode — nilai mereka tetap konstan.

## 5. Component Inventory

Komponen berikut sudah mengikuti arah visual sistem dan jadi referensi implementasi:

- `components/ui/button.tsx`
  - Varian `default` untuk aksi utama (`bg-primary`).
  - Varian `accent` untuk CTA aksen (`bg-accent`).
  - Radius tombol `rounded-full`.
- `components/ui/card.tsx`
  - Surface putih (`bg-card`) + border semantic (`border-border`) + shadow ringan.
- `components/ui/badge.tsx`
  - Pakai `accent` hanya untuk penekanan penting.
- `components/ui/input.tsx`
  - Ring fokus `ring-ring`, border `border-input`, text `text-foreground`.
- `components/ui/separator.tsx`
  - Divider wajib `bg-border`.
- `components/layout/site-header.tsx`
  - Header memakai semantic token (`bg-background`) dan struktur container global.
- `components/layout/site-footer.tsx`
  - Footer mengikuti tipografi body dan warna sekunder.

## 6. Page Layout Patterns

### A. Shell halaman

- Gunakan latar global dari `body` di `app/globals.css`.
- Hindari membuat latar baru yang bertabrakan dengan atmosfer biru-kuning.

### B. Hero

- Struktur rekomendasi: `eyebrow` + `hero-title` + `hero-copy` + `hero-actions`.
- Jika perlu panel kontras, gunakan `.hero-panel`.

### C. Section isi

- Urutan konten: eyebrow, judul section, deskripsi singkat, grid/list konten.
- Gunakan card untuk pengelompokan informasi, bukan dekorasi kosong.

## 7. Naming Conventions

- Token brand harus berada di namespace `--site-*`.
- Class utilitas global yang diprioritaskan:
  - `.container`, `.page-wrap`, `.surface`, `.section`
  - `.hero-*`, `.section-title`, `.section-copy`, `.eyebrow`
- Untuk class kondisional di komponen React, selalu gabungkan class dengan `cn()` dari `@/lib/utils`.

## 8. Rules & Anti-patterns

- Dilarang hardcode warna di JSX (`#hex`, `rgb()`, `hsl()`).
- Dilarang pakai arbitrary Tailwind value seperti `text-[13px]`, `w-[372px]`, `p-[22px]`.
- Dilarang menambah CSS variable baru di `app/globals.css` tanpa persetujuan.
- Dilarang mengubah perilaku komponen saat melakukan styling; hanya ubah visual.
- Dilarang memakai warna aksen kuning sebagai background utama satu section penuh.

## Contoh singkat penggunaan style

```tsx
<section className="surface section">
  <p className="eyebrow">PPDB</p>
  <h2 className="section-title">Informasi Pendaftaran</h2>
  <p className="section-copy">Lihat jalur, syarat, dan jadwal terbaru.</p>
  <div className="mt-4 flex gap-3">
    <Button variant="default">Daftar Sekarang</Button>
    <Button variant="outline">Pelajari Syarat</Button>
  </div>
</section>
```

---

## 9. Global Utility Classes (globals.css Inventory)

Kelas-kelas berikut didefinisikan di `app/globals.css` dan menjadi bagian sistem. **Jangan re-implement** dengan class Tailwind ad-hoc kalau kelas ini tersedia.

### Layout & Shell

| Class        | Definisi                                                                  | Kegunaan                              |
| ------------ | ------------------------------------------------------------------------- | ------------------------------------- |
| `.container` | `width: min(1120px, 100% - 2rem); margin: 0 auto`                         | Wrapper lebar konten utama            |
| `.page-wrap` | `flex flex-col gap-12 py-5 pb-16`                                         | Shell halaman isi (di dalam `<main>`) |
| `.surface`   | `bg-site-surface border border-site-border rounded-[1.25rem] shadow-site` | Card/panel surface utama              |
| `.section`   | `p-6`                                                                     | Padding standar konten dalam surface  |

### Tipografi Sections

| Class            | Definisi                                                      | Kegunaan                                |
| ---------------- | ------------------------------------------------------------- | --------------------------------------- |
| `.eyebrow`       | `text-site-primary font-bold tracking-[0.06em] uppercase`     | Label kecil sebelum judul section       |
| `.section-title` | `font-size: clamp(1.2rem, 1.3vw + 1rem, 2rem); leading-tight` | Judul section responsif                 |
| `.section-copy`  | `text-site-muted mt-3`                                        | Deskripsi pendek di bawah judul section |

### Hero

| Class           | Kegunaan                                                                           |
| --------------- | ---------------------------------------------------------------------------------- |
| `.hero`         | Wrapper hero section (`pt-3`)                                                      |
| `.hero-grid`    | CSS Grid 2-kolom (`1.2fr 0.8fr`), jadi 1-kolom di ≤980px                           |
| `.hero-title`   | Heading utama hero, `clamp(1.8rem, 3.2vw + 1rem, 3.6rem)`                          |
| `.hero-copy`    | Body copy hero, max `55ch`                                                         |
| `.hero-actions` | Flex wrap gap-3 untuk tombol CTA                                                   |
| `.hero-panel`   | Panel gradient biru tua (kiri → kanan: `--site-primary` → `--site-primary-strong`) |
| `.panel-kicker` | Teks label kuning di dalam `.hero-panel`                                           |

### Buttons (HTML primitives)

> Lebih disukai menggunakan `<Button>` dari `components/ui/button.tsx`. Kelas `.btn*` untuk kasus HTML murni.

| Class            | Kegunaan                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| `.btn`           | Base button: `rounded-full border inline-flex font-bold min-h-11 px-4`             |
| `.btn-primary`   | `bg-site-accent text-site-text`                                                    |
| `.btn-secondary` | `bg-primary/10 border-site-border text-site-text`                                  |
| `.pill`          | Label tag: `rounded-full border text-site-muted text-[0.85rem] font-semibold px-3` |

### Card & Grid

| Class     | Kegunaan                                                                                   |
| --------- | ------------------------------------------------------------------------------------------ |
| `.card`   | `bg-site-surface border border-site-border rounded-2xl p-4` — versi ringan dari `.surface` |
| `.grid-3` | `grid grid-cols-3 gap-4`, jadi 1-kolom di ≤980px                                           |

### Navigation

| Class           | Kegunaan                                                            |
| --------------- | ------------------------------------------------------------------- |
| `.site-nav`     | Header sticky dengan `backdrop-blur-sm border-b border-site-border` |
| `.site-nav-row` | Flex row header, `min-h-17.5`, responsive ke flex-col               |
| `.site-links`   | Nav links horizontal, disembunyikan di ≤980px                       |
| `.brand`        | Kolom nama sekolah + tagline di header                              |
| `.menu-toggle`  | Tombol hamburger/drawer                                             |

---

## 10. Motion & Animation Patterns

Komponen di `components/motion/` adalah wrapper Framer Motion yang **wajib dipakai** untuk animasi entrance. Jangan tulis animasi Framer Motion custom di komponen halaman.

### FadeIn (`components/motion/fade-in.tsx`)

Elemen fade-in saat memasuki viewport.

```tsx
import { FadeIn } from "@/components/motion/fade-in";

<FadeIn>
  <Card>...</Card>
</FadeIn>

// Props: delay?: number (detik, default 0)
<FadeIn delay={0.2}>...</FadeIn>
```

### SlideUp (`components/motion/slide-up.tsx`)

Elemen slide naik + fade-in saat memasuki viewport.

```tsx
import { SlideUp } from "@/components/motion/slide-up";

<SlideUp delay={0.1}>
  <Card>...</Card>
</SlideUp>;

// Props: delay?: number (default 0)
```

### StaggerContainer (`components/motion/stagger-container.tsx`)

Grid atau list yang anak-anaknya animate secara berurutan (stagger).

```tsx
import { StaggerContainer } from "@/components/motion/stagger-container";
import { SlideUp } from "@/components/motion/slide-up";

<StaggerContainer className="grid grid-cols-3 gap-4">
  {items.map((item, i) => (
    <SlideUp key={item.id} delay={i * 0.05}>
      <PostCard post={item} />
    </SlideUp>
  ))}
</StaggerContainer>;
```

### PageTransition (`components/motion/page-transition.tsx`)

Dipakai di root layout untuk animasi transisi antar halaman. **Tidak perlu dipakai di dalam halaman.**

### Aturan Animasi

- Gunakan motion **hanya untuk entrance animations** (scroll into view). Jangan pakai untuk interaksi hover — gunakan Tailwind `transition-*` untuk itu.
- Jangan gunakan `useAnimation` atau `useMotionValue` di komponen halaman; buat motion component terpisah jika diperlukan.
- Delay maksimum per item dalam stagger: `0.15s`. Jangan membuat list terlalu lambat.

---

## 11. Loading & Skeleton Patterns

Setiap halaman **wajib** memiliki `loading.tsx` di folder yang sama. Gunakan `Skeleton` dari `components/ui/skeleton.tsx`.

### Pola loading.tsx standar

```tsx
// app/(group)/my-page/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container page-wrap">
      {/* Heading placeholder */}
      <div className="mb-8">
        <Skeleton className="h-5 w-24 mb-3" /> {/* eyebrow */}
        <Skeleton className="h-10 w-72 mb-2" /> {/* title */}
        <Skeleton className="h-4 w-96" /> {/* description */}
      </div>
      {/* Content grid placeholder */}
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
```

### Skeleton variants tersedia

`components/ui/skeleton.tsx` menyediakan:

- `<Skeleton className="...">` — blok warna muted dengan shimmer animation
- `<SkeletonText lines={3}>` — blok teks baris
- `<SkeletonCard>` — kartu komplit dengan gambar + teks
- `<SkeletonAvatar>` — avatar bulat

### Aturan Loading UI

- Skeleton harus mendekati layout konten asli (proporsi, jumlah item, grid columns).
- Jangan pakai spinner tunggal untuk seluruh halaman — gunakan skeleton per elemen.
- Gunakan `rounded-2xl` pada skeleton yang mewakili card/surface.

---

## 12. Page Composition Patterns

### Shell standar halaman konten

Setiap halaman non-beranda menggunakan pola ini:

```tsx
import { Metadata } from "next";
import PageWrap from "@/components/layout/page-wrap";
import { PageHeading } from "@/components/elements/page-heading";

export const metadata: Metadata = {
  title: "Nama Halaman | SMANAS",
  description: "Deskripsi halaman.",
};

export default async function MyPage() {
  const data = await fetchSomeData(); // dari lib/wordpress.ts

  return (
    <PageWrap
      breadcrumbs={[
        { label: "Beranda", href: "/" },
        { label: "Nama Halaman", href: "/nama-halaman" },
      ]}
    >
      <PageHeading
        title="Judul Halaman"
        description="Deskripsi pendek halaman ini."
      />

      {/* Konten utama */}
      <section className="surface section">{/* ... */}</section>
    </PageWrap>
  );
}
```

### SectionTitle variants

`SectionTitle` dipakai di homepage sections. Di halaman isi, gunakan `PageHeading`.

```tsx
import { SectionTitle } from "@/components/elements/section-title";

// variant "badge" — eyebrow dalam badge biru
<SectionTitle eyebrow="GALERI" title="Foto Kegiatan" variant="badge" />

// variant "underline" — garis bawah aksen
<SectionTitle title="Visi Sekolah" variant="underline" />

// variant "centered-bar" — bar aksen tengah, untuk hero-ish sections
<SectionTitle eyebrow="PPDB 2025" title="Daftar Sekarang" variant="centered-bar" centered />

// variant "left" — teks rata kiri, garis sisi kiri (aksen)
<SectionTitle title="Struktur Organisasi" variant="left" />
```

### Sidebar pattern (halaman detail)

Halaman dengan sidebar (seperti artikel detail, PPDB detail):

```tsx
<div className="grid gap-8 lg:grid-cols-[1fr_320px]">
  {/* Main content */}
  <article className="surface section prose max-w-none">{/* ... */}</article>

  {/* Sidebar */}
  <aside className="flex flex-col gap-5">
    <div className="surface section">{/* sidebar content */}</div>
  </aside>
</div>
```

### ISR + metadata dynamic pattern

Untuk halaman dengan dynamic metadata dari WordPress:

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Tidak Ditemukan | SMANAS" };

  return {
    title: `${post.title.rendered} | SMANAS`,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160),
    openGraph: {
      images: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
        ? [post._embedded["wp:featuredmedia"][0].source_url]
        : [],
    },
  };
}
```
