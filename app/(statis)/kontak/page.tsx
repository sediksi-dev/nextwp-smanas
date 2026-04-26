import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import { schoolInfo } from "@/lib/config";
import { getContactConfig } from "@/lib/wordpress";

/* ── Inline SVG icons ─────────────────────────────────────────────────────── */
const IconMap = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5" aria-hidden>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const IconClock = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
const IconPhone = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.08 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);
const IconMail = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5" aria-hidden>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const socialIconPaths: Record<string, React.ReactNode> = {
    facebook: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z" /></svg>,
    instagram: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" /></svg>,
    tiktok: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>,
    youtube: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden><path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.1c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9l5.4 2.8-5.4 2.7z" /></svg>,
    email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
};

function toInstagramUrl(value: string): string {
    if (!value) return "";
    if (value.startsWith("http")) return value;
    return `https://www.instagram.com/${value.replace(/^@/, "")}`;
}

export const metadata = {
    title: "Kontak | SMA Nasional Malang",
    description:
        "Hubungi SMA Nasional Malang: alamat, jam operasional, nomor telepon, email, dan media sosial.",
};

export default async function KontakPage() {
    const config = await getContactConfig();

    const title = config?.headings.contact_page_title ?? "Kontak SMA Nasional Malang";
    const subtitle = config?.headings.contact_page_subtitle ?? "Hubungi Kami";
    const description =
        config?.headings.contact_page_description ??
        "Kami terbuka untuk pertanyaan, kerja sama, dan informasi seputar penerimaan peserta didik baru.";

    const address = config?.office.contact_address ?? schoolInfo.address.full;
    const openDay = config?.office.contact_openday ?? "Senin";
    const closeDay = config?.office.contact_closeday ?? "Jumat";
    const openTime = config?.office.contact_opentime ?? "07:00";
    const closeTime = config?.office.contact_closetime ?? "16:00";

    const phone1 = config?.contact.contact_phone_1 ?? schoolInfo.contact.phone;
    const phone2 = config?.contact.contact_phone_2 ?? schoolInfo.contact.whatsapp;
    const email = config?.contact.contact_email ?? schoolInfo.contact.email;

    type SocialEntry = { label: string; href: string; icon: string };
    const socials: SocialEntry[] = [];
    if (config) {
        const c = config.contact;
        if (c.contact_facebook) socials.push({ label: "Facebook", href: c.contact_facebook, icon: "facebook" });
        if (c.contact_instagram) socials.push({ label: "Instagram", href: toInstagramUrl(c.contact_instagram), icon: "instagram" });
        if (c.contact_tiktok) socials.push({ label: "TikTok", href: c.contact_tiktok, icon: "tiktok" });
        if (c.contact_youtube) socials.push({ label: "YouTube", href: c.contact_youtube, icon: "youtube" });
        if (c.contact_email) socials.push({ label: "Email", href: `mailto:${c.contact_email}`, icon: "email" });
    }

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Kontak" }]}>
            <Section py="md">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* ── Left: Info panel ─────────────────────────── */}
                    <div className="flex flex-col gap-6">
                        {/* Heading */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="block w-5 h-0.5 bg-site-accent" />
                                <p className="text-xs font-bold tracking-widest uppercase text-site-primary">{subtitle}</p>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                                {title}
                            </h1>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-sm">
                                {description}
                            </p>
                        </div>

                        {/* Divider */}
                        <hr className="border-border" />

                        {/* Contact rows */}
                        <div className="flex flex-col gap-4">
                            {/* Address */}
                            <div className="flex gap-3 text-sm text-foreground/80">
                                <span className="text-site-primary mt-0.5"><IconMap /></span>
                                <span>{address}</span>
                            </div>

                            {/* Hours */}
                            <div className="flex gap-3 text-sm text-foreground/80">
                                <span className="text-site-primary mt-0.5"><IconClock /></span>
                                <span>{openDay} s/d {closeDay}, {openTime} — {closeTime}</span>
                            </div>

                            {/* Phone */}
                            {(phone1 || phone2) && (
                                <div className="flex gap-3 text-sm text-foreground/80">
                                    <span className="text-site-primary mt-0.5"><IconPhone /></span>
                                    <div className="flex flex-col gap-0.5">
                                        {phone1 && <span>{phone1}</span>}
                                        {phone2 && <span>{phone2}</span>}
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            {email && (
                                <div className="flex gap-3 text-sm text-foreground/80">
                                    <span className="text-site-primary mt-0.5"><IconMail /></span>
                                    <a href={`mailto:${email}`} className="hover:text-site-primary transition-colors">
                                        {email}
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Social links */}
                        {socials.length > 0 && (
                            <div className="flex items-center gap-2 pt-1">
                                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-1">
                                    Sosial
                                </span>
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target={s.href.startsWith("mailto") ? undefined : "_blank"}
                                        rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                        aria-label={s.label}
                                        className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-muted-foreground hover:bg-site-primary hover:border-site-primary hover:text-white transition-colors duration-150"
                                    >
                                        {socialIconPaths[s.icon]}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Map ───────────────────────────────── */}
                    <div className="overflow-hidden rounded-2xl border border-border min-h-72 md:min-h-0">
                        <iframe
                            title="Lokasi SMA Nasional Malang"
                            src={schoolInfo.mapsEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0, display: "block", minHeight: "320px" }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                </div>
            </Section>
        </PageWrap>
    );
}
