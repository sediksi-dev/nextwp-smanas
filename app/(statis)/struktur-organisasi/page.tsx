import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { getProfilesConfig } from "@/lib/wordpress";

export const metadata = {
    title: "Struktur Organisasi",
    description: "Susunan organisasi dan jajaran kepemimpinan SMA Nasional Malang.",
};

export default async function StrukturOrganisasiPage() {
    const profilesConfig = await getProfilesConfig();
    const aboutUsHeadings = profilesConfig?.headings;
    const structure = profilesConfig?.organization_structure;
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Tentang Kami", href: "/tentang" }, { label: "Struktur Organisasi" }]}>
            {/* Plain page heading */}
            <PageHeading
                title={aboutUsHeadings?.structure_page_title || "Struktur Organisasi"}
                subtitle="Tentang Kami"
                description={aboutUsHeadings?.structure_page_description || "Susunan kepemimpinan dan tanggung jawab tiap bidang di SMA Nasional Malang."}
            />

            <Section py="sm">
                {/* Kepala Sekolah — dominant full-width gradient block */}
                <div
                    className="rounded-2xl px-8 py-10 md:px-14 md:py-12 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-10"
                    style={{
                        background: "linear-gradient(135deg, var(--site-primary-strong) 0%, color-mix(in srgb, var(--site-primary) 60%, var(--site-primary-strong)) 100%)",
                    }}
                >
                    <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
                        <p className="text-xs font-bold tracking-widest uppercase text-site-accent">
                            Kepala Sekolah
                        </p>
                        <p className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                            {structure?.structure_principal || "Drs. Rusdi, M.Si."}
                        </p>
                    </div>
                    {/* Decorative accent line */}
                    <div
                        className="hidden md:block flex-1 h-px"
                        style={{ background: "rgba(255,255,255,0.15)" }}
                    />
                    <p className="text-white/50 text-xs font-mono tracking-widest hidden md:block">SMA NASIONAL MALANG</p>
                </div>

                {/* Connector line */}
                <div className="flex justify-center">
                    <div className="w-px h-10 bg-site-border" />
                </div>

                {/* Waka — horizontal row with left-accent bars, no card boxing */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">

                    <div className="bg-site-surface px-5 py-6 flex flex-col gap-1 border-t-4 border-site-primary">
                        <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                            Waka Kurikulum
                        </p>
                        <p className="font-semibold text-sm leading-snug text-foreground">
                            {structure?.structure_vice_1 || "Not available"}
                        </p>
                    </div>

                    <div className="bg-site-surface px-5 py-6 flex flex-col gap-1 border-t-4 border-site-primary">
                        <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                            Waka Kesiswaan
                        </p>
                        <p className="font-semibold text-sm leading-snug text-foreground">
                            {structure?.structure_vice_2 || "Not available"}
                        </p>
                    </div>

                    <div className="bg-site-surface px-5 py-6 flex flex-col gap-1 border-t-4 border-site-primary">
                        <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                            Waka Humas
                        </p>
                        <p className="font-semibold text-sm leading-snug text-foreground">
                            {structure?.structure_vice_3 || "Not available"}
                        </p>
                    </div>

                    <div className="bg-site-surface px-5 py-6 flex flex-col gap-1 border-t-4 border-site-primary">
                        <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                            Waka Sarpras
                        </p>
                        <p className="font-semibold text-sm leading-snug text-foreground">
                            {structure?.structure_vice_4 || "Not available"}
                        </p>
                    </div>
                </div>

                {/* Connector line */}
                <div className="flex justify-center">
                    <div className="w-px h-10 bg-site-border" />
                </div>

                {/* Admin — plain text row with accent separator, distinctly lighter */}
                <div className="flex flex-col sm:flex-row justify-center gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border border border-border rounded-xl overflow-hidden max-w-lg mx-auto">

                    <div className="flex-1 px-8 py-5 flex flex-col gap-1 text-center border-t-4 border-site-accent">
                        <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                            Kepala Tata Usaha
                        </p>
                        <p className="font-semibold text-sm text-foreground">
                            {structure?.structure_hoa || "Not available"}
                        </p>
                    </div>

                    <div className="flex-1 px-8 py-5 flex flex-col gap-1 text-center border-t-4 border-site-accent">
                        <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                            Bendahara
                        </p>
                        <p className="font-semibold text-sm text-foreground">
                            {structure?.structure_treasurer || "Not available"}
                        </p>
                    </div>
                </div>
            </Section>
        </PageWrap>
    );
}
