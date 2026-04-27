# SMANAS — Headless WordPress CMS

WordPress headless CMS untuk website sekolah **SMANAS**, berfungsi sebagai backend yang menyediakan data melalui REST API. Frontend dikelola secara terpisah dan mengonsumsi data dari WordPress melalui endpoint custom maupun WordPress REST API bawaan.

---

## Daftar Isi

1. [Stack & Plugin](#1-stack--plugin)
2. [Mekanisme Headless & Redirect](#2-mekanisme-headless--redirect)
3. [Must-Use Plugin (mu-plugin)](#3-must-use-plugin-mu-plugin)
4. [Custom REST API Endpoints](#4-custom-rest-api-endpoints)
5. [JetEngine — Custom Post Types](#5-jetengine--custom-post-types)
6. [JetEngine — Custom Content Types (CCT)](#6-jetengine--custom-content-types-cct)
7. [JetEngine — Taxonomies](#7-jetengine--taxonomies)
8. [JetEngine — Options Pages](#8-jetengine--options-pages)
9. [Advanced Access Manager — Roles & Capabilities](#9-advanced-access-manager--roles--capabilities)
10. [Cara Deploy & Setup Ulang](#10-cara-deploy--setup-ulang)
11. [File yang Dikelola](#11-file-yang-dikelola)

---

## 1. Stack & Plugin

| Plugin                      | Versi   | Fungsi                                                           |
| --------------------------- | ------- | ---------------------------------------------------------------- |
| **JetEngine** (Crocoblock)  | 3.8.8.1 | Custom Post Types, Taxonomies, CCT, Options Pages, Meta Boxes    |
| **Advanced Access Manager** | 7.1.1   | Manajemen role & capability kustom (`manage_frontend`)           |
| **Next.js Revalidation**    | 1.0.5   | Trigger revalidasi halaman Next.js saat konten WordPress berubah |
| **Rank Math SEO**           | 1.0.268 | SEO meta management (nonaktif, opsional)                         |

---

## 2. Mekanisme Headless & Redirect

WordPress dikonfigurasi sebagai **pure headless CMS**. Semua akses langsung ke URL WordPress akan di-redirect ke frontend agar tidak ada konten yang diakses langsung melalui WordPress.

Konstanta `SMANAS_FRONTEND_URL` mendefinisikan base URL frontend dan wajib didefinisikan sebelum mu-plugin berjalan.

### Aturan Redirect (301)

| Kondisi WordPress                | Redirect ke Frontend                                                 |
| -------------------------------- | -------------------------------------------------------------------- |
| `is_page()`                      | `{SMANAS_FRONTEND_URL}/{slug}/`                                      |
| `is_single()` — post type `post` | `{SMANAS_FRONTEND_URL}/artikel/{slug}/`                              |
| `is_single()` — post type `ppdb` | `{SMANAS_FRONTEND_URL}/ppdb/{slug}/`                                 |
| Custom post type lain            | **Tidak di-redirect** (agar link edit/preview admin tetap berfungsi) |

---

## 3. Must-Use Plugin (mu-plugin)

File mu-plugin diletakkan di:

```
wp-content/mu-plugins/smanas-config.php
```

> **Catatan:** Must-use plugin otomatis aktif tanpa perlu diaktifkan secara manual dari halaman plugin WordPress dan tidak bisa dinonaktifkan dari UI.

Definisikan konstanta berikut sebelum mu-plugin berjalan, misalnya di `wp-config.php`:

```php
define( 'SMANAS_FRONTEND_URL', 'https://your-frontend-domain.com' );
```

### Isi `smanas-config.php`

File ini bertanggung jawab atas:

1. **Redirect rules** — mengarahkan pengunjung dari WordPress ke frontend
2. **Registrasi custom REST routes** — endpoint `smanas/v1`
3. **Callback handler** — fungsi pemroses setiap endpoint
4. **Permission callback** — validasi akses menggunakan capability `manage_frontend`
5. **Helper functions** — utilitas konversi data JetEngine

---

## 4. Custom REST API Endpoints

Semua endpoint berada di namespace `smanas/v1`. Setiap request **membutuhkan autentikasi** dengan user yang memiliki capability `manage_frontend` (lihat bagian AAM).

### `GET /wp-json/smanas/v1/configs`

Mengembalikan konfigurasi global situs untuk keperluan frontend.

```json
{
  "site": {
    "name": "...",
    "description": "...",
    "url": "...",
    "home": "...",
    "icon_id": 123,
    "icon_url": "https://..."
  },
  "seo": {
    "smanas_meta_title": "...",
    "smanas_meta_description": "...",
    "smanas_global_image": "...",
    "smanas_site_logo": "...",
    "smanas_site_favicon": "..."
  },
  "ppdb": {
    "header_button_text": "...",
    "header_button_url": "...",
    "active_ppdb": "..."
  },
  "slider": { "items": [...] },
  "greetings": {
    "greetings_section_title": "...",
    "greetings_section_eyebrow": "...",
    "greetings_section_description": "...",
    "greetings_title": "...",
    "greetings_subtitle": "...",
    "greetings_photo": "...",
    "greetings_description": "..."
  },
  "achievements": {
    "achievements_section_title": "...",
    "achievements_section_eyebrow": "...",
    "achievements_section_description": "..."
  },
  "articles": {
    "article_section_title": "...",
    "article_count": 6,
    "article_group_title_1": "...",
    "article_group_category_1": { "id": 1, "name": "...", "slug": "..." },
    "article_group_title_2": "...",
    "article_group_category_2": { "id": 2, "name": "...", "slug": "..." },
    "article_group_title_3": "...",
    "article_group_category_3": { "id": 3, "name": "...", "slug": "..." }
  },
  "gallery": {
    "gallery_section_title": "...",
    "gallery_section_eyebrow": "...",
    "gallery_section_description": "..."
  },
  "youtube": {
    "youtube_section_title": "...",
    "youtube_section_eyebrow": "...",
    "youtube_section_description": "...",
    "youtube_channel_id": "...",
    "youtube_channel_url": "..."
  }
}
```

> **Catatan:** Field `article_group_category_{n}` secara otomatis di-resolve dari category ID mentah menjadi objek `{ id, name, slug }` di dalam callback.

---

### `GET /wp-json/smanas/v1/profiles`

Mengembalikan data halaman profil sekolah.

```json
{
  "headings": {
    "about_us_title": "...",
    "about_us_description": "...",
    "profile_page_title": "...",
    "profile_page_description": "...",
    "vision_page_title": "...",
    "vision_page_description": "...",
    "structure_page_title": "...",
    "structure_page_description": "..."
  },
  "profile": {
    "profile_photo": "https://...",
    "profile_name": "...",
    "profile_role": "...",
    "profile_intro": "...",
    "profile_history_title": "...",
    "profile_history_content": "...",
    "profile_emblem_title": "...",
    "profile_emblem_image": "https://...",
    "profile_emblem_content": "...",
    "profile_committee_title": "...",
    "profile_committee_content": "...",
    "profile_march_title": "...",
    "profile_march_content": "..."
  },
  "vision_mission": {
    "school_vision": "...",
    "school_mission": "...",
    "school_goal": "..."
  },
  "organization_structure": {
    "structure_principal": "...",
    "structure_vice_1": "...",
    "structure_vice_2": "...",
    "structure_vice_3": "...",
    "structure_vice_4": "...",
    "structure_hoa": "...",
    "structure_treasurer": "..."
  }
}
```

---

### `GET /wp-json/smanas/v1/contact`

Mengembalikan data kontak dan informasi operasional sekolah.

```json
{
  "headings": {
    "contact_page_title": "...",
    "contact_page_subtitle": "...",
    "contact_page_description": "..."
  },
  "office": {
    "contact_address": "...",
    "contact_opentime": "07:00",
    "contact_closetime": "15:00",
    "contact_openday": "Senin",
    "contact_closeday": "Jumat"
  },
  "contact": {
    "contact_email": "...",
    "contact_phone_1": "...",
    "contact_phone_2": "...",
    "contact_facebook": "...",
    "contact_instagram": "...",
    "contact_threads": "...",
    "contact_tiktok": "...",
    "contact_youtube": "...",
    "contact_linkedin": "..."
  }
}
```

---

## 5. JetEngine — Custom Post Types

### `ppdb` — Penerimaan Peserta Didik Baru

- **REST API:** Aktif (`show_in_rest: true`)
- **Slug rewrite:** `/ppdb/`
- **Meta Box terkait:** `Konfigurasi PPDB`

| Field                       | Nama API            | Tipe                    | Keterangan                                              |
| --------------------------- | ------------------- | ----------------------- | ------------------------------------------------------- |
| Poster Pengumuman           | `flyer`             | Media (URL)             | Poster PPDB — format: jpg, png, webp, gif, bmp          |
| Tahun Pembukaan Pendaftaran | `year_open`         | Number                  | Tahun awal periode (min: 2010, step: 1)                 |
| Artikel/Halaman Terkait     | `related_content`   | Posts                   | Multiple — dapat memilih dari `post` atau `page`        |
| Link-Link Terkait           | `related_links`     | Repeater `{title, url}` | Tampil sebagai tombol di frontend                       |
| File Hasil Pendaftaran      | `admission_results` | Media (URL)             | Kosongkan jika hasil belum dirilis. Hanya file xlsx/xls |

---

## 6. JetEngine — Custom Content Types (CCT)

### `teachers` — Guru & Staf

- REST GET dan PUT diaktifkan; akses menggunakan capability `manage_frontend`
- REST POST dan DELETE dinonaktifkan

| Field         | Nama API     | Tipe  |
| ------------- | ------------ | ----- |
| Nama          | `name`       | Text  |
| Email         | `email`      | Text  |
| Jabatan/Role  | `role`       | Text  |
| Kategori      | `category`   | Text  |
| Foto          | `photo`      | Media |
| NUPTK         | `nuptk`      | Text  |
| Motto         | `motto`      | Text  |
| Tempat Lahir  | `birthplace` | Text  |
| Tanggal Lahir | `birthdate`  | Date  |

---

### `gallery` — Galeri Foto

- REST GET dan PUT diaktifkan; akses menggunakan capability `manage_frontend`

| Field            | Nama API              | Tipe                |
| ---------------- | --------------------- | ------------------- |
| Judul Galeri     | `gallery_title`       | Text                |
| Deskripsi Galeri | `gallery_description` | WYSIWYG             |
| Foto Galeri      | `gallery_photos`      | Gallery (array URL) |

---

### `awards` — Penghargaan

- Dikonfigurasi sebagai CCT tambahan (konfigurasi field menyesuaikan kebutuhan)

---

## 7. JetEngine — Taxonomies

### `pelajaran_siswa` — Mata Pelajaran Siswa

| Properti               | Nilai             |
| ---------------------- | ----------------- |
| Terhubung ke post type | `dokumen_siswa`   |
| Hierarki               | Non-hierarkis     |
| REST API               | Aktif             |
| Rewrite slug           | `pelajaran_siswa` |

---

## 8. JetEngine — Options Pages

Semua Options Page datanya tersimpan di `wp_options` WordPress dan diambil melalui helper `smanas_jet($page_slug, $fields)`.

| Slug               | Nama di Admin                    | Digunakan Oleh Endpoint                                      |
| ------------------ | -------------------------------- | ------------------------------------------------------------ |
| `frontend`         | Pengaturan Frontend              | `/configs` — SEO, logo, header PPDB button                   |
| `frontpage_config` | Konfigurasi Halaman Depan        | `/configs` — slider, sambutan, artikel, galeri, YouTube      |
| `slider_settings`  | Pengaturan Slider                | `/configs` — item slider halaman utama                       |
| `profile_config`   | Pengaturan Profil (Tentang Kami) | `/profiles` — kepala sekolah, visi-misi, struktur organisasi |
| `contact_config`   | Konfigurasi Kontak               | `/contact` — alamat, jam operasional, sosial media           |

---

## 9. Advanced Access Manager — Roles & Capabilities

Konfigurasi role dikelola oleh plugin **Advanced Access Manager** dan dapat di-export/import melalui file `aam-settings.json`.

### Ringkasan Role

| Role            | Nama          | Capability `manage_frontend` | Keterangan                                           |
| --------------- | ------------- | ---------------------------- | ---------------------------------------------------- |
| `administrator` | Administrator | ✅                           | Full access                                          |
| `editor`        | Editor        | ❌                           | Mengelola konten post & page                         |
| `author`        | Author        | ❌                           | Membuat & publish post sendiri                       |
| `contributor`   | Contributor   | ❌                           | Membuat draft post                                   |
| `subscriber`    | Subscriber    | ❌                           | Hanya `read`                                         |
| `operator`      | Operator      | ❌                           | Mengelola konten operasional (tanpa manage_frontend) |
| `application`   | Application   | ✅                           | Role khusus untuk API consumer (frontend/aplikasi)   |

### Role `application` — Untuk API Consumer

Role ini dirancang khusus untuk user yang digunakan oleh aplikasi frontend dalam mengonsumsi REST API:

```json
{
  "application": {
    "capabilities": {
      "manage_options": false,
      "manage_frontend": true
    }
  }
}
```

> Buat satu WordPress user dengan role `application`, lalu gunakan credentials-nya (Basic Auth atau Application Password) di header HTTP request dari frontend.

### Role `operator` — Untuk Pengelola Konten

Role ini diberikan kepada staf sekolah yang perlu mengelola konten tanpa akses ke pengaturan sistem:

- Dapat membuat, edit, publish, dan hapus post & page
- Dapat upload file
- **Tidak** memiliki `manage_frontend` (tidak bisa akses endpoint smanas/v1)

---

## 10. Cara Deploy & Setup Ulang

### Langkah-langkah

1. **Install WordPress** dengan PHP 8.1+ dan MySQL/MariaDB

2. **Install & aktifkan plugin:**
   - JetEngine 3.8.8.1+
   - Advanced Access Manager 7.1.1+
   - Next.js Revalidation 1.0.5+

3. **Import konfigurasi JetEngine** melalui menu `JetEngine → Import/Export → Import`:
   - Upload file `jet_engine_skin.json`
   - Ini akan membuat semua CPT, CCT, Taxonomy, Meta Box, dan Options Pages

4. **Import konfigurasi AAM** melalui menu `AAM → Utilities → Import/Export → Import`:
   - Upload file `aam-settings.json`
   - Ini akan membuat semua role kustom termasuk role `application` dan `operator`

5. **Buat user untuk API consumer:**
   - Buat WordPress user baru
   - Tetapkan role: `Application`
   - Generate Application Password melalui `Users → Edit User → Application Passwords`

6. **Upload mu-plugin:**
   - Letakkan file `smanas-config.php` di direktori `wp-content/mu-plugins/`
   - Pastikan direktori `mu-plugins/` sudah ada (buat manual jika belum)

7. **Definisikan konstanta di `wp-config.php`:**

   ```php
   define( 'SMANAS_FRONTEND_URL', 'https://your-frontend-domain.com' );
   ```

8. **Verifikasi endpoint aktif:**
   ```
   GET https://your-wp-domain.com/wp-json/smanas/v1/configs
   Authorization: Basic <base64(username:app_password)>
   ```

---

## 11. File yang Dikelola

| File                   | Letak                    | Keterangan                                                                 |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------- |
| `smanas-config.php`    | `wp-content/mu-plugins/` | Must-use plugin: redirect rules, REST routes, helpers                      |
| `jet_engine_skin.json` | _(untuk import)_         | Export konfigurasi JetEngine — CPT, CCT, Taxonomy, Meta Box, Options Pages |
| `aam-settings.json`    | _(untuk import)_         | Export konfigurasi AAM — semua role & capability                           |

---

## Helper Functions (Referensi)

| Fungsi                              | Kegunaan                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------- |
| `smanas_jet($page_slug, $fields)`   | Mengambil field-field tertentu dari JetEngine Options Page (`wp_options`)                   |
| `smanas_normalize($value)`          | Mengkonversi format repeater JetEngine (`item-0`, `item-1`, ...) menjadi array indeks biasa |
| `smanas_ids_to_urls($value, $size)` | Mengkonversi attachment ID tunggal atau array ID menjadi objek `{ id, url }`                |
| `smanas_check_permission($request)` | Permission callback — memvalidasi capability `manage_frontend` pada user yang request       |

---

_Dibuat: April 2026_
