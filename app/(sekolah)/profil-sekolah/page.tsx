import { Section } from "@/components/layout/section";
import { parseHtmlContent } from "@/lib/utils";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { getProfilesConfig } from "@/lib/wordpress";
import { ProfileIntro } from "./_components/profile-intro";
import { ProfileTabNav } from "./_components/profile-tab-nav";
import Image from "next/image";

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

            <ProfileIntro
                photo={profiles?.profile_photo || ""}
                name={profiles?.profile_name || ""}
                role={profiles?.profile_role || ""}
                intro={profiles?.profile_intro || ""}
            />

            <Section py="sm">
                <div className="border-t border-border pt-10">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        {/* Tab navigation */}
                        <ProfileTabNav activeTab={activeTab} />

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
