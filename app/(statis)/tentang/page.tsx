import { Section } from "@/components/layout/section";
import Link from "next/link";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";

export const metadata = {
    title: "Tentang Kami",
    description: "Pelajari lebih lanjut tentang profil, visi misi, dan struktur organisasi SMA Nasional Malang.",
};

const destinations = [
    {
        number: "01",
        eyebrow: "Identitas Sekolah",
        title: "Profil Sekolah",
        description: "Sejarah SMA Nasional Malang, makna lambang, susunan komite sekolah, dan mars kebanggaan.",
        href: "/profil-sekolah",
    },
    {
        number: "02",
        eyebrow: "Arah & Tujuan",
        title: "Visi & Misi",
        description: "Cita-cita, misi, dan tujuan dalam membentuk generasi yang unggul, luhur dalam kepribadian, serta terampil.",
        href: "/visi-misi",
    },
    {
        number: "03",
        eyebrow: "Kepemimpinan",
        title: "Struktur Organisasi",
        description: "Susunan kepemimpinan sekolah beserta nama dan tanggung jawab tiap bidang.",
        href: "/struktur-organisasi",
    },
];

export default function TentangPage() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Tentang Kami" }]}>
            {/* Plain heading — no card */}
            <PageHeading
                title="Mengenal SMA Nasional Malang"
                subtitle="Tentang Kami"
                description="SMA Nasional Malang berkomitmen mencetak generasi yang unggul dalam prestasi,
                luhur dalam kepribadian, serta kreatif dan terampil dalam keseharian."
            />


            {/* Editorial navigation rows — large number + title + arrow */}
            <Section py="sm">
                <div className="flex flex-col">
                    {destinations.map((dest) => (
                        <Link
                            key={dest.href}
                            href={dest.href}
                            className="group flex items-start gap-6 md:gap-10 py-8 border-t border-border -mx-4 px-4 md:-mx-8 md:px-8 hover:bg-muted/40 transition-colors duration-200"
                        >
                            {/* Large decorative number */}
                            <span className="shrink-0 text-5xl md:text-7xl font-extrabold tabular-nums leading-none text-border group-hover:text-site-primary transition-colors duration-300">
                                {dest.number}
                            </span>

                            {/* Content */}
                            <div className="flex-1 min-w-0 flex flex-col gap-1 pt-2">
                                <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                                    {dest.eyebrow}
                                </p>
                                <h2 className="text-2xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                                    {dest.title}
                                </h2>
                                <p className="mt-1 text-sm leading-relaxed text-muted-foreground max-w-lg">
                                    {dest.description}
                                </p>
                            </div>

                            {/* Arrow circle */}
                            <span className="shrink-0 self-center hidden md:flex items-center justify-center w-11 h-11 rounded-full border border-border text-muted-foreground group-hover:bg-site-primary group-hover:border-site-primary group-hover:text-white transition-all duration-200">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                    <div className="border-t border-border" />
                </div>
            </Section>
        </PageWrap>
    );
}
