---
description: General coding guidelines for the nextwp-smanas Next.js project. Load for ALL tasks involving this codebase — new features, bug fixes, refactoring, component creation, page creation, API work, or styling.
applyTo: "**"
---

# nextwp-smanas — Coding Guidelines

## Project Identity

- **Project:** Website SMA Nasional Malang (SMANAS)
- **Stack:** Next.js 16.2.4 · React 19 · TypeScript 5 (strict) · Tailwind CSS 4 · shadcn/ui (slate) · Framer Motion 12 · pnpm
- **CMS:** WordPress headless via `smanas/v1` + `wp/v2` REST API
- **System design:** `.github/system-design.md` — single source of truth for all visual rules

---

## 1. Architecture Rules

### Server vs Client Components

- **Default: Server Component.** Only add `"use client"` when you need browser APIs, event handlers, or stateful hooks.
- **`lib/wordpress.ts`** — starts with `import "server-only"`. Never import this in Client Components or client-side code.
- **Client Components get data as props** from a Server Component parent. There is no client-side data layer or `/api/*` proxy — every distinct proxy request would be another uncached call (and a cache entry) against WordPress.
- **`app/api/revalidate`** is the only route handler: the WordPress revalidation webhook.

### Data fetching pattern

```tsx
// ✅ Server Component — import directly from lib/wordpress.ts
import { getLatestPosts } from "@/lib/wordpress";
const posts = await getLatestPosts(6);

// ✅ Client Component — receive data as props from a Server Component
<PostList posts={posts} />

// ❌ Never — importing wordpress.ts in a Client Component
("use client");
import { getLatestPosts } from "@/lib/wordpress"; // ERROR: server-only
```

---

## 2. Key Files — Always Check Before Implementing

| File                       | Purpose                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `lib/config.ts`            | `schoolInfo` and `socialLinks` — source of truth for school contact data. Do NOT hardcode these values elsewhere. |
| `lib/site.ts`              | `navItems` (nested nav tree) and `footerGroups` — navigation structure                                            |
| `lib/wordpress.ts`         | All WordPress API functions with ISR + cache tags (`CACHE_TAGS`). Server-only.                                    |
| `lib/utils.ts`             | `cn()`, `isWpSlug()`, `parsePageParam()`, `parseHtmlContent()`                                                    |
| `types/wordpress.ts`       | All shared types: `WpPost`, `WpTeacher`, `WpGalleryItem`, `Achievement`, etc.                                     |
| `app/globals.css`          | All CSS variables and Tailwind utility classes                                                                    |
| `.github/system-design.md` | Visual design rules — read before any styling work                                                                |

---

## 3. TypeScript Conventions

- **Strict mode is on.** All code must type-check with zero errors.
- **`searchParams` is a Promise** in Next.js 15+ App Router page props — always `await searchParams`:
  ```tsx
  export default async function Page({ searchParams }: Props) {
    const { page, search } = await searchParams;
  }
  ```
- **Type Props explicitly.** Never use implicit `any`.
- **Use types from `types/wordpress.ts`** for all WordPress data shapes. Do not re-declare locally.
- **Return types on API functions** — always explicit for `lib/wordpress.ts`.

---

## 4. Design System Rules

> Read `.github/system-design.md` before any visual work. The rules below are the non-negotiable minimum.

- **Never hardcode colors** in JSX (`#hex`, `rgb()`, `hsl()`). Always use design tokens.
- **Never use arbitrary Tailwind values** (`text-[13px]`, `w-[372px]`, `p-[22px]`) unless explicitly listed in `system-design.md`.
- **Always use `cn()`** from `@/lib/utils` for conditional class merging.
- **Approved token sets:**
  - Tailwind semantic: `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, etc.
  - Brand utilities (Tailwind v4): `bg-site-bg`, `bg-site-surface`, `bg-site-primary`, `bg-site-accent`, `text-site-text`, `text-site-muted`, `border-site-border`
  - CSS variables (inline style or `var()`): `--site-primary`, `--site-accent`, `--site-shadow`, etc.
- **Global utility classes** defined in `globals.css` — prefer these over re-inventing:
  - `.container` (1120px max-width centered)
  - `.page-wrap` (flex column, gap-12, py-5 pb-16)
  - `.surface` (white card surface with border + shadow)
  - `.section` (p-6 section padding)
  - `.eyebrow` (uppercase small label, site-primary color)
  - `.section-title`, `.section-copy`
  - `.hero`, `.hero-grid`, `.hero-title`, `.hero-copy`, `.hero-actions`, `.hero-panel`
  - `.btn`, `.btn-primary`, `.btn-secondary`, `.pill`
  - `.card`, `.grid-3`

---

## 5. Component Patterns

### Page shell pattern (all content pages)

```tsx
import PageWrap from "@/components/layout/page-wrap";
import { PageHeading } from "@/components/elements/page-heading";

export default async function MyPage() {
  return (
    <PageWrap breadcrumbs={[{ label: "Halaman", href: "/halaman" }]}>
      <PageHeading title="Judul Halaman" description="Deskripsi singkat." />
      {/* content */}
    </PageWrap>
  );
}
```

### Section title pattern

```tsx
import { SectionTitle } from "@/components/elements/section-title";

// Variants: "default" | "badge" | "underline" | "centered-bar" | "left"
<SectionTitle eyebrow="LABEL" title="Judul Section" variant="badge" />;
```

### Motion wrappers (viewport animations)

```tsx
import { FadeIn } from "@/components/motion/fade-in";
import { SlideUp } from "@/components/motion/slide-up";
import { StaggerContainer } from "@/components/motion/stagger-container";

// Fade in when element enters viewport
<FadeIn><Card /></FadeIn>

// Slide up + fade
<SlideUp delay={0.1}><Card /></SlideUp>

// Staggered grid — children animate in sequence
<StaggerContainer className="grid grid-cols-3 gap-4">
  {items.map(item => <SlideUp key={item.id}><Card /></SlideUp>)}
</StaggerContainer>
```

### Loading skeletons

Every page must have a `loading.tsx` sibling that uses `Skeleton` from `@/components/ui/skeleton`:

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="page-wrap container">
      <Skeleton className="h-10 w-64 mb-4" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
```

---

## 6. Page File Conventions

### File structure per page

```
app/(group)/my-page/
├── page.tsx          # Server Component, export metadata, call lib/wordpress.ts directly
├── loading.tsx       # Skeleton UI
├── error.tsx         # Error boundary (if needed)
└── _components/      # Page-specific Client/Server components
    └── my-component.tsx
```

### Metadata pattern

```tsx
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Halaman | SMANAS",
    description: "Deskripsi halaman.",
  };
}
```

### Route groups

- `(direktori)` — content/information pages (artikel, galeri, guru-karyawan, ppdb, prestasi, dokumen)
- `(sekolah)` — school identity pages (kontak, profil-sekolah, struktur-organisasi, tentang, visi-misi)
- New pages must be placed in the appropriate group.

---

## 7. Data Fetching & Caching Conventions

- **Every WordPress fetch goes through `wpFetch`/`wpFetchWithMeta` in `lib/wordpress.ts`** with the `CACHE_TAGS` entry for its content type. Add the matching `contentType` → tag mapping in `app/api/revalidate/route.ts` when adding a new content type.
- **Don't shorten `revalidate`.** Content updates arrive through the webhook; `WP_REVALIDATE_SECONDS` (24h) is only a fallback. Each expiry re-renders and re-writes every visited page (Vercel ISR writes).
- **Visitor-supplied values never become cache keys unchecked**: search queries use `noStore: true`; slugs go through `isWpSlug()` and `?page=` through `parsePageParam()` before reaching WordPress.
- **Encode path segments** (`encodeURIComponent`) — requests carry the application password, so an unencoded `../` reaches arbitrary WordPress endpoints.
- **Don't add `app/api/*` proxy routes** for data; pass data from Server Components instead.

### Revalidate webhook

The `/api/revalidate` route requires `x-webhook-secret` header matching `WORDPRESS_WEBHOOK_SECRET`. Never remove this check.

---

## 8. Naming & Organization

- **\_components/ directories** — place page-specific components here, not in the global `components/` tree.
- **Global components** (`components/elements/`, `components/sections/`, `components/layout/`) — only for truly reusable, cross-page components.
- **File names** — kebab-case for files, PascalCase for component exports.
- **No default exports for utility functions** — use named exports in `lib/*`.
- **No magic strings** — use `lib/config.ts` for school info, `lib/site.ts` for navigation.

---

## 9. Performance Rules

- Prefer Server Components to reduce client JS bundle.
- Images: always use `next/image` with explicit `width`/`height` or `fill` + `sizes`.
- Never use `useEffect` to fetch data — fetch in Server Components and pass data down as props.
- Don't import heavy client libraries (charts, xlsx) at the page level — lazy-load in `_components/`.

---

## 10. CRLF Warning

Source files have **Windows CRLF** line endings. The `replace_string_in_file` tool fails on them.
**Workaround for editing existing files:**

```bash
node -e "
const fs = require('fs');
const f = 'path/to/file.tsx';
const raw = fs.readFileSync(f, 'utf8');
const fixed = raw.replace(/\r\n/g, '\n');
fs.writeFileSync(f, fixed, 'utf8');
"
```

New files created via `create_file` tool use LF and work correctly.
