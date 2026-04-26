import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { cn, parseHtmlContent } from "@/lib/utils";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { getProfilesConfig } from "@/lib/wordpress";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    const profilesConfig = await getProfilesConfig();
    const aboutUsHeadings = profilesConfig?.headings;
    const profiles = profilesConfig?.profile

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
                title={aboutUsHeadings?.profile_page_title || ""}
                subtitle="Tentang Kami"
                description={aboutUsHeadings?.profile_page_description || ""}
            />

            <Section py="sm">
                <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-start">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-full overflow-hidden rounded-xl">
                            <AspectRatio ratio={1 / 1}>
                                <Image
                                    src={profiles?.profile_photo || ""}
                                    alt={profiles?.profile_name || ""}
                                    className="object-cover w-auto h-auto"
                                    fill
                                />
                            </AspectRatio>
                        </div>
                        <p className="font-bold text-primary text-sm">{profiles?.profile_name || ""}</p>
                        <p className="text-muted-foreground text-xs">{profiles?.profile_role || ""}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl md:text-2xl font-bold text-foreground">
                            Selayang Pandang
                        </h2>
                        <div className="prose text-base md:text-lg leading-relaxed text-foreground/80" dangerouslySetInnerHTML={{
                            __html: parseHtmlContent(profiles?.profile_intro || ""),
                        }} />
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
                                        {profiles?.profile_history_title || "Not available"}
                                    </h2>
                                    {profiles?.profile_history_content ? (
                                        <div className="prose-sm md:prose-base text-sm md:text-base leading-relaxed text-foreground/80" dangerouslySetInnerHTML={{
                                            __html: profiles.profile_history_content,
                                        }} />
                                    ) : (
                                        <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                            Sejarah sekolah belum tersedia. Hubungi pihak sekolah untuk informasi lebih lanjut.
                                        </p>
                                    )}
                                </div>
                            )}

                            {activeTab === "makna-lambang" && (
                                <div className="flex flex-col gap-6 max-w-3xl">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        {profiles?.profile_emblem_title || "Not available"}
                                    </h2>
                                    <div className="grid md:grid-cols-[180px_1fr] gap-8 items-start">
                                        <div className="flex justify-center md:justify-start shrink-0">
                                            <div className="w-44 h-44 rounded-2xl border border-border bg-site-bg flex items-center justify-center">
                                                <Image
                                                    src={profiles?.profile_emblem_image || ""}
                                                    alt="Lambang SMA Nasional Malang"
                                                    className="object-contain w-32 h-32"
                                                    width={256}
                                                    height={256}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="prose prose-h3:mt-0.5 flex flex-col text-sm md:text-base leading-relaxed text-foreground/80"
                                            dangerouslySetInnerHTML={{
                                                __html: parseHtmlContent(profiles?.profile_emblem_content || "<p>Makna lambang belum tersedia. Hubungi pihak sekolah untuk informasi lebih lanjut.</p>"),
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === "komite-sekolah" && (
                                <div className="flex flex-col gap-5 max-w-3xl">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        {profiles?.profile_committee_title || ""}
                                    </h2>
                                    <div
                                        className="prose text-sm md:text-base leading-relaxed text-foreground/80"
                                        dangerouslySetInnerHTML={{
                                            __html: parseHtmlContent(profiles?.profile_committee_content || "<p>Informasi komite sekolah belum tersedia. Hubungi pihak sekolah untuk informasi lebih lanjut.</p>"),
                                        }}
                                    >
                                    </div>
                                </div>
                            )}

                            {activeTab === "mars-smanas" && (
                                <div className="flex flex-col gap-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        {profiles?.profile_march_title || ""}
                                    </h2>
                                    <div
                                        className="prose text-sm md:text-base leading-relaxed text-foreground/80"
                                        dangerouslySetInnerHTML={{
                                            __html: parseHtmlContent(profiles?.profile_march_content || "<p>Informasi mars SMA Nasional Malang belum tersedia. Hubungi pihak sekolah untuk informasi lebih lanjut.</p>"),
                                        }}
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </Section>
        </PageWrap>
    );
}
