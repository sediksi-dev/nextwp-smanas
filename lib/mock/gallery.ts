export type GalleryPhoto = {
    title: string;
    type: "Foto";
    image: string;
    caption?: string;
};

export type GalleryVideo = {
    title: string;
    type: "Video";
    youtubeId: string;
    description?: string;
};

export type GalleryItem = GalleryPhoto | GalleryVideo;

export const mockGallery: GalleryItem[] = [
    // ── Foto ───────────────────────────────────────────
    { type: "Foto", title: "Upacara Bendera Hari Pendidikan", image: "https://picsum.photos/800/600?random=71", caption: "Seluruh warga sekolah mengikuti upacara bendera dengan khidmat." },
    { type: "Foto", title: "Lomba Sains Antar Kelas", image: "https://picsum.photos/800/600?random=72", caption: "Siswa bersaing ketat dalam lomba eksperimen sains." },
    { type: "Foto", title: "Kegiatan Pramuka Penegak", image: "https://picsum.photos/800/600?random=73", caption: "Pramuka penegak SMANAS dalam kegiatan berkemah." },
    { type: "Foto", title: "Pensi dan Pentas Budaya", image: "https://picsum.photos/800/600?random=76", caption: "Penampilan seni siswa memeriahkan akhir tahun ajaran." },
    { type: "Foto", title: "Kunjungan Industri Kelas XII", image: "https://picsum.photos/800/600?random=401", caption: "Siswa kelas XII mengunjungi pabrik teknologi di Surabaya." },
    { type: "Foto", title: "Olimpiade Matematika Tingkat Kota", image: "https://picsum.photos/800/600?random=402", caption: "Tim olimpiade SMANAS mewakili kecamatan Klojen." },
    { type: "Foto", title: "Workshop Kewirausahaan Siswa", image: "https://picsum.photos/800/600?random=403", caption: "Siswa belajar dasar-dasar bisnis dari praktisi muda." },
    { type: "Foto", title: "Donor Darah Bersama PMR", image: "https://picsum.photos/800/600?random=404", caption: "PMR SMANAS menyelenggarakan donor darah untuk masyarakat sekitar." },
    { type: "Foto", title: "Wisuda Siswa Angkatan 2025", image: "https://picsum.photos/800/600?random=405", caption: "Momen bahagia kelulusan angkatan 2025 di aula sekolah." },
    { type: "Foto", title: "Kemah Ilmiah di Gunung Bromo", image: "https://picsum.photos/800/600?random=406", caption: "Siswa belajar langsung di alam terbuka bersama pembina." },
    { type: "Foto", title: "Hari Batik Nasional", image: "https://picsum.photos/800/600?random=407", caption: "Warga sekolah kompak mengenakan batik setiap Jumat." },
    { type: "Foto", title: "Aksi Bersih Lingkungan Adiwiyata", image: "https://picsum.photos/800/600?random=408", caption: "Gotong royong menjaga kebersihan lingkungan sekitar sekolah." },
    // ── Video ──────────────────────────────────────────
    { type: "Video", title: "Profil Sekolah SMA Nasional Malang 2025", youtubeId: "dQw4w9WgXcQ", description: "Mengenal lebih dekat SMA Nasional Malang melalui video profil resmi." },
    { type: "Video", title: "Highlight Olimpiade Sains SMANAS 2026", youtubeId: "9bZkp7q19f0", description: "Rekap perjalanan tim olimpiade sains menuju podium juara." },
    { type: "Video", title: "Pentas Seni Tahunan 2025", youtubeId: "ScMzIvxBSi4", description: "Momen terbaik dari pentas seni tahunan yang meriah dan penuh kreativitas." },
    { type: "Video", title: "Kegiatan Pramuka Penegak 2025", youtubeId: "kJQP7kiw5Fk", description: "Dokumentasi kegiatan pramuka tingkat penegak di alam terbuka." },
    { type: "Video", title: "Wisuda Kelas XII Angkatan 2025", youtubeId: "JGwWNGJdvx8", description: "Kenangan indah perpisahan dan wisuda siswa angkatan 2025." },
    { type: "Video", title: "Workshop Robotik Bersama Alumni", youtubeId: "L_jWHffIx5E", description: "Alumni SMANAS berbagi ilmu robotik kepada adik-adik kelasnya." },
];
