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

### B. Shadow

- Shadow utama mengikuti `--site-shadow`.
- Gunakan shadow lembut bernuansa biru; hindari shadow abu gelap pekat.

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
