import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { mockPrincipalMessage } from "@/lib/mock/principal";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";

const TABS = [
    { label: "Sejarah", value: "sejarah" },
    { label: "Makna Lambang", value: "makna-lambang" },
    { label: "Komite Sekolah", value: "komite-sekolah" },
    { label: "Mars Smanas", value: "mars-smanas" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string }>;
}) {
    const { tab } = await searchParams;
    const activeTab = TABS.find((t) => t.value === tab) ?? TABS[0];
    return {
        title: `${activeTab.label} — Profil Sekolah | SMA Nasional Malang`,
        description:
            "Lebih jauh tentang sejarah, visi, misi, dan identitas SMA Nasional Malang.",
    };
}

export default async function ProfilSekolahPage({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string }>;
}) {
    const { tab } = await searchParams;
    const activeTab: TabValue =
        TABS.some((t) => t.value === tab) ? (tab as TabValue) : "sejarah";

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "Tentang Kami", href: "/tentang" },
                { label: "Profil Sekolah" },
            ]}
        >
            <PageHeading
                title="Profil SMA Nasional Malang"
                subtitle="Tentang Kami"
                description="Lebih jauh tentang sejarah, visi, misi, dan identitas SMA Nasional Malang"
            />

            <Section py="sm">
                <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-start">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-full overflow-hidden rounded-xl">
                            <Image
                                src={mockPrincipalMessage.photo}
                                alt={mockPrincipalMessage.name}
                                width={220}
                                height={270}
                                className="object-cover w-full"
                            />
                        </div>
                        <p className="font-bold text-primary text-sm">{mockPrincipalMessage.name}</p>
                        <p className="text-muted-foreground text-xs">{mockPrincipalMessage.role}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl md:text-2xl font-bold text-foreground">Selayang Pandang</h2>
                        <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                            SMA Nasional Malang adalah lembaga pendidikan menengah atas yang berdiri dan berkomitmen
                            untuk memberikan pendidikan berkualitas kepada generasi muda Kota Malang. Sekolah ini terus
                            berkembang dan berinovasi dalam meningkatkan mutu pendidikan demi mencetak lulusan yang
                            unggul, berkarakter, dan siap menghadapi tantangan masa depan.
                        </p>
                        <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                            Dengan tenaga pendidik yang berpengalaman dan berdedikasi, SMA Nasional Malang hadir
                            sebagai mitra terpercaya bagi orang tua dan peserta didik dalam perjalanan menuntut ilmu.
                            Berbagai prestasi akademik dan non-akademik telah diraih, mencerminkan semangat dan kerja
                            keras seluruh warga sekolah.
                        </p>
                    </div>
                </div>
            </Section>

            <Section py="sm">
                <div className="border-t border-border pt-10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        {/* Tab navigation */}
                        <nav aria-label="Tab profil sekolah" className="flex flex-row flex-wrap md:flex-col gap-2 md:w-48 shrink-0">
                            {TABS.map((t) => (
                                <Link
                                    key={t.value}
                                    href={`/profil-sekolah?tab=${t.value}`}
                                    className={cn(
                                        "px-5 py-2 rounded-full md:rounded-lg text-sm font-semibold border transition-colors text-left",
                                        activeTab === t.value
                                            ? "bg-site-primary text-white border-site-primary"
                                            : "bg-white border-site-border text-site-muted hover:border-site-primary hover:text-site-primary",
                                    )}
                                    aria-current={activeTab === t.value ? "page" : undefined}
                                >
                                    {t.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Tab content */}
                        <div className="flex-1 min-w-0">

                            {activeTab === "sejarah" && (
                                <div className="flex flex-col gap-5 max-w-3xl">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Sejarah SMA Nasional Malang
                                    </h2>
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                        SMA Nasional Malang didirikan dengan semangat mewujudkan pendidikan yang merata dan
                                        berkualitas di Kota Malang. Seiring berjalannya waktu, sekolah ini terus tumbuh dan
                                        berkembang, memperluas fasilitas, meningkatkan kualitas tenaga pendidik, dan meraih
                                        berbagai prestasi di tingkat regional maupun nasional.
                                    </p>
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                        Sejak awal berdirinya, SMA Nasional Malang telah menanamkan nilai-nilai keunggulan
                                        akademik, budi pekerti luhur, dan kreativitas dalam setiap aspek kehidupan sekolah.
                                        Nilai-nilai tersebut tercermin dalam setiap kegiatan belajar mengajar, kegiatan
                                        ekstrakurikuler, dan budaya sekolah yang terus dijaga hingga saat ini.
                                    </p>
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                        Dengan dukungan penuh dari yayasan, pemerintah daerah, dan seluruh komunitas sekolah,
                                        SMA Nasional Malang terus berkomitmen untuk menjadi lembaga pendidikan terbaik yang
                                        menghasilkan lulusan siap menapaki jenjang pendidikan lebih tinggi maupun terjun
                                        langsung ke dunia kerja dengan bekal ilmu, karakter, dan keterampilan yang solid.
                                    </p>
                                </div>
                            )}

                            {activeTab === "makna-lambang" && (
                                <div className="flex flex-col gap-6 max-w-3xl">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Makna Lambang SMA Nasional Malang
                                    </h2>
                                    <div className="grid md:grid-cols-[180px_1fr] gap-8 items-start">
                                        <div className="flex justify-center md:justify-start shrink-0">
                                            <div className="w-44 h-44 rounded-2xl border border-border bg-site-bg flex items-center justify-center">
                                                <p className="text-xs text-muted-foreground text-center px-4 leading-relaxed">
                                                    Gambar lambang<br />sekolah
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                                Lambang SMA Nasional Malang mengandung berbagai unsur simbolis yang mencerminkan
                                                nilai-nilai dan identitas sekolah. Setiap elemen dalam lambang memiliki makna
                                                mendalam berkaitan dengan visi, misi, dan semangat seluruh warga sekolah.
                                            </p>
                                            <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                                Bentuk, warna, dan unsur-unsur dalam lambang dipilih secara cermat untuk
                                                merepresentasikan karakter dan cita-cita SMA Nasional Malang sebagai lembaga
                                                pendidikan yang unggul, berkarakter, dan berpijak pada nilai-nilai kebangsaan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "komite-sekolah" && (
                                <div className="flex flex-col gap-5 max-w-3xl">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Komite Sekolah
                                    </h2>
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                        Komite Sekolah SMA Nasional Malang merupakan lembaga mandiri yang dibentuk dan berperan
                                        dalam meningkatkan mutu pelayanan pendidikan. Komite sekolah menjadi mitra strategis
                                        antara sekolah, orang tua, dan masyarakat dalam mendukung penyelenggaraan pendidikan
                                        yang berkualitas.
                                    </p>
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                        Fungsi utama komite sekolah antara lain memberikan pertimbangan dalam penentuan dan
                                        pelaksanaan kebijakan pendidikan, mendukung penyelenggaraan pendidikan baik secara
                                        finansial maupun non-finansial, serta mengontrol dan mengawasi pelaksanaan transparansi
                                        dan akuntabilitas di lingkungan sekolah.
                                    </p>
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                        Susunan pengurus Komite Sekolah SMA Nasional Malang periode saat ini terdiri dari
                                        ketua, wakil ketua, sekretaris, bendahara, dan sejumlah anggota yang dipilih dari
                                        perwakilan orang tua dan tokoh masyarakat setempat.
                                    </p>
                                </div>
                            )}

                            {activeTab === "mars-smanas" && (
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Mars SMA Nasional Malang
                                    </h2>
                                    <div className="border-l-4 border-site-primary pl-6 py-2">
                                        <p className="text-sm md:text-base leading-loose whitespace-pre-line text-foreground/80 font-medium italic">
                                            {`[Lirik Mars SMA Nasional Malang]

Hubungi pihak sekolah untuk mendapatkan teks resmi mars SMA Nasional Malang.`}
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </Section>
        </PageWrap>
    );
}
