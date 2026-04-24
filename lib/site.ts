import { NavItem, SiteLink } from "./site.d";

/** Nested nav tree – used by SiteHeader */
export const navItems: NavItem[] = [
    {
        label: "Tentang Kami",
        href: "/tentang-kami",
        children: [
            { label: "Profil Sekolah", href: "/profil-sekolah" },
            { label: "Visi & Misi", href: "/profil-sekolah#visi-misi" },
            { label: "Struktur Sekolah", href: "/profil-sekolah#struktur-sekolah" },
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
    {
        label: "Info",
        children: [
            { label: "Berita", href: "/berita" },
            { label: "Agenda", href: "/agenda" },
            { label: "Ekskul", href: "/ekskul" },
            { label: "Kliping Media", href: "/kliping-media" },
            { label: "Karya Siswa", href: "/karya-siswa" },
            { label: "Karya Guru", href: "/karya-guru" },
            { label: "Inspirasi", href: "/inspirasi" },
        ],
    },
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
            { label: "Guru", href: "/guru-karyawan/guru" },
            { label: "Staf", href: "/guru-karyawan/staf" },
            { label: "Dokumen Siswa", href: "/dokumen/siswa" },
            { label: "Dokumen Guru", href: "/dokumen/guru" },
        ],
    },
    {
        title: "Info & Berita",
        links: [
            { label: "Berita", href: "/berita" },
            { label: "Agenda", href: "/agenda" },
            { label: "Inspirasi", href: "/inspirasi" },
            { label: "Kliping Media", href: "/kliping-media" },
        ],
    },
];
