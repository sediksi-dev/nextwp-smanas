import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import { schoolInfo } from "@/lib/config";
import { getContactConfig } from "@/lib/wordpress";
import { IconMap, IconClock, IconPhone, IconMail, socialIconPaths, toInstagramUrl } from "./_components/contact-icons";

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
