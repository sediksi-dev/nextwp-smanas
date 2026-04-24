import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { schoolInfo, socialLinks } from "@/lib/config";

const socialIcons: Record<string, React.ReactNode> = {
    facebook: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z" />
        </svg>
    ),
    instagram: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
    ),
    youtube: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
            <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.1c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9l5.4 2.8-5.4 2.7z" />
        </svg>
    ),
};

const infoItems = [
    {
        eyebrow: "Alamat",
        lines: [
            schoolInfo.address.street,
            `${schoolInfo.address.kelurahan}, ${schoolInfo.address.kecamatan}`,
            `${schoolInfo.address.city}, ${schoolInfo.address.province} ${schoolInfo.address.postalCode}`,
        ],
    },
    {
        eyebrow: "Jam Operasional",
        lines: schoolInfo.operationalHours.flatMap((h) => [h.days, h.hours]),
    },
    {
        eyebrow: "Kontak",
        lines: [
            schoolInfo.contact.phone,
            schoolInfo.contact.whatsapp,
            schoolInfo.contact.email,
        ],
    },
];

export const metadata = {
    title: "Kontak | SMA Nasional Malang",
    description:
        "Hubungi SMA Nasional Malang: alamat, jam operasional, nomor telepon, email, dan media sosial.",
};

export default function KontakPage() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Kontak" }]}>
            <PageHeading
                title="Kontak SMA Nasional Malang"
                subtitle="Hubungi Kami"
                description="Kami terbuka untuk pertanyaan, kerja sama, dan informasi seputar penerimaan peserta didik baru."
            />
            <Section>
                <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
                    {infoItems.map((item) => (
                        <div
                            key={item.eyebrow}
                            className="flex flex-col gap-2 px-0 md:px-8 first:pl-0 last:pr-0 py-6 md:py-0"
                        >
                            <p className="text-[0.65rem] font-bold tracking-widest uppercase text-site-primary">
                                {item.eyebrow}
                            </p>
                            <div className="flex flex-col gap-0.5">
                                {item.lines.map((line, i) => (
                                    <p key={i} className="text-sm md:text-base leading-relaxed text-foreground/80">
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-3 mt-10 pt-8 border-t border-border">
                    <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                        Media Sosial
                    </p>
                    <div className="flex items-center gap-2">
                        {socialLinks.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:bg-site-primary hover:border-site-primary hover:text-white transition-colors duration-200"
                            >
                                {socialIcons[s.icon]}
                            </a>
                        ))}
                    </div>
                </div>
            </Section>
            <Section size="wide" py="sm">
                <div className="overflow-hidden rounded-2xl border border-border" style={{ height: "420px" }}>
                    <iframe
                        title="Lokasi SMA Nasional Malang"
                        src={schoolInfo.mapsEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <p className="mt-3 text-xs text-muted-foreground text-center">
                    {schoolInfo.address.full}
                </p>
            </Section>
        </PageWrap>
    );
}
