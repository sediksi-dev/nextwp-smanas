import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { getProfilesConfig } from "@/lib/wordpress";
import { OrgChart } from "./_components/org-chart";

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
                <OrgChart structure={structure} />
            </Section>
        </PageWrap>
    );
}
