import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { getProfilesConfig } from "@/lib/wordpress";
import { parseHtmlContent } from "@/lib/utils";

export const metadata = {
    title: "Visi & Misi",
    description: "Visi dan misi SMA Nasional Malang sebagai landasan penyelenggaraan pendidikan berkualitas di Kota Malang.",
};

export default async function VisiMisiPage() {
    const profilesConfig = await getProfilesConfig();
    const aboutUsHeadings = profilesConfig?.headings;
    const vismis = profilesConfig?.vision_mission;

    const visi = vismis?.school_vision || "Not available";
    const misi = vismis?.school_mission.map((item) => item.school_mission_item) || [];
    const tujuan = vismis?.school_goal.map((item) => item.school_goal_item) || [];



    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Tentang Kami", href: "/tentang" }, { label: "Visi & Misi" }]}>
            <PageHeading
                title={parseHtmlContent(aboutUsHeadings?.vision_page_title || "")}
                subtitle="Tentang Kami"
                description={parseHtmlContent(aboutUsHeadings?.vision_page_description || "")}
            />

            {/* Visi — accent-bordered card panel */}
            <Section py="sm">
                <div className="rounded-2xl border border-site-border bg-secondary/40 px-6 py-7 md:px-10 md:py-10">
                    <p className="text-xs font-bold tracking-widest uppercase text-site-accent mb-3">Visi</p>
                    <blockquote className="relative pl-5 border-l-4 border-site-accent">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug text-foreground italic" dangerouslySetInnerHTML={{
                            __html: parseHtmlContent(visi),
                        }}
                        />
                    </blockquote>
                </div>
            </Section>

            {/* Misi + Tujuan side by side on desktop */}
            <Section py="sm">
                <div className="grid md:grid-cols-[3fr_2fr] gap-8 md:gap-12 items-start">

                    {/* Misi */}
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-site-accent mb-1">Misi</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Misi Sekolah</h2>
                        <ol className="flex flex-col divide-y divide-border list-none p-0 m-0">
                            {misi.map((item, i) => (
                                <li key={i} className="flex gap-3 items-start py-3 first:pt-0 last:pb-0">
                                    <span className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold tabular-nums text-site-primary">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-sm md:text-base leading-relaxed text-foreground/80 pt-1">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Tujuan */}
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-site-accent mb-1">Tujuan</p>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Tujuan Sekolah</h2>
                        <div className="flex flex-col gap-4">
                            {tujuan.map((item, i) => (
                                <div key={i} className="rounded-xl border border-site-border bg-secondary/30 p-4 flex flex-col gap-1.5">
                                    <span className="text-4xl font-extrabold leading-none tabular-nums text-site-accent">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </Section>
        </PageWrap>
    );
}
