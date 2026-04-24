import { NavItem, SiteLink } from "./site.d";

/** Nested nav tree – used by SiteHeader */
export const navItems: NavItem[] = [
    {
        label: "Tentang Kami",
        href: "/tentang",
        children: [
            { label: "Profil Sekolah", href: "/profil-sekolah" },
            { label: "Visi & Misi", href: "/visi-misi" },
            { label: "Struktur Organisasi", href: "/struktur-organisasi" },
        ],
    },
    { label: "Prestasi", href: "/prestasi" },
    { label: "Guru/Karyawan", href: "/guru-karyawan" },
    {
        label: "Galeri",
        children: [
            { label: "Foto", href: "/galeri/foto" },
            { label: "Video", href: "/galeri/video" },
        ],
    },
    { label: "Artikel", href: "/artikel" },
    { label: "Kontak", href: "/kontak" },
];

export const footerGroups: Array<{ title: string; links: SiteLink[] }> = [
    {
        title: "Navigasi Cepat",
        links: [
            { label: "Beranda", href: "/" },
            { label: "PPDB", href: "/ppdb" },
            { label: "Profil Sekolah", href: "/profil-sekolah" },
            { label: "Kontak", href: "/kontak" },
        ],
    },
    {
        title: "Akademik",
        links: [
            { label: "Guru & Karyawan", href: "/guru-karyawan" },
            { label: "Dokumen Siswa", href: "/dokumen/siswa" },
            { label: "Dokumen Guru", href: "/dokumen/guru" },
        ],
    },
    {
        title: "Artikel & Info",
        links: [
            { label: "Artikel", href: "/artikel" },
            { label: "Berita", href: "/artikel?kategori=berita" },
            { label: "Agenda", href: "/artikel?kategori=agenda" },
            { label: "Inspirasi", href: "/artikel?kategori=inspirasi" },
            { label: "Kliping Media", href: "/artikel?kategori=kliping-media" },
        ],
    },
];
