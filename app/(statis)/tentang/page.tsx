import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { getProfilesConfig } from "@/lib/wordpress";
import { parseHtmlContent } from "@/lib/utils";
import { AboutNavItem } from "./_components/about-nav-item";

export const metadata = {
    title: "Tentang Kami",
    description: "Pelajari lebih lanjut tentang profil, visi misi, dan struktur organisasi SMA Nasional Malang.",
};



export default async function TentangPage() {
    const profilesConfig = await getProfilesConfig();
    const aboutUsHeadings = profilesConfig?.headings;

    const destinations = [
        {
            number: "01",
            eyebrow: "Identitas Sekolah",
            title: parseHtmlContent(aboutUsHeadings?.profile_page_title || "Profil Sekolah"),
            description: parseHtmlContent(aboutUsHeadings?.profile_page_description || "Sejarah SMA Nasional Malang, makna lambang, susunan komite sekolah, dan mars kebanggaan."),
            href: "/profil-sekolah",
        },
        {
            number: "02",
            eyebrow: "Arah & Tujuan",
            title: parseHtmlContent(aboutUsHeadings?.vision_page_title || "Visi & Misi"),
            description: parseHtmlContent(aboutUsHeadings?.vision_page_description || "Cita-cita, misi, dan tujuan dalam membentuk generasi yang unggul, luhur dalam kepribadian, serta terampil."),
            href: "/visi-misi",
        },
        {
            number: "03",
            eyebrow: "Kepemimpinan",
            title: parseHtmlContent(aboutUsHeadings?.structure_page_title || "Struktur Organisasi"),
            description: parseHtmlContent(aboutUsHeadings?.structure_page_description || "Susunan kepemimpinan sekolah beserta nama dan tanggung jawab tiap bidang."),
            href: "/struktur-organisasi",
        },
    ];


    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Tentang Kami" }]}>
            {/* Plain heading — no card */}
            <PageHeading
                title={parseHtmlContent(aboutUsHeadings?.about_us_title || "")}
                subtitle="Tentang Kami"
                description={parseHtmlContent(aboutUsHeadings?.about_us_description || "")}
            />


            {/* Editorial navigation rows — large number + title + arrow */}
            <Section py="sm">
                <div className="flex flex-col">
                    {destinations.map((dest) => (
                        <AboutNavItem key={dest.href} {...dest} />
                    ))}
                    <div className="border-t border-border" />
                </div>
            </Section>
        </PageWrap>
    );
}
