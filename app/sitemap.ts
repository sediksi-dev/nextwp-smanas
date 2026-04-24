import type { MetadataRoute } from "next";
import { mockPosts } from "@/lib/mock/posts";

const BASE_URL = "https://smanasionalmalang.sch.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/tentang`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/profil-sekolah`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/visi-misi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/struktur-organisasi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/prestasi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/guru-karyawan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/galeri`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
        { url: `${BASE_URL}/galeri/foto`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
        { url: `${BASE_URL}/galeri/video`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
        { url: `${BASE_URL}/artikel`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/ppdb`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/ppdb/info-pendaftaran`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/ppdb/persyaratan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/ppdb/hasil-seleksi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/kontak`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ];

    const articleRoutes: MetadataRoute.Sitemap = mockPosts.map((post) => ({
        url: `${BASE_URL}/artikel/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...articleRoutes];
}
