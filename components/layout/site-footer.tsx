import Image from "next/image";
import Link from "next/link";

import { footerGroups } from "@/lib/site";
import { schoolInfo, socialLinks, type SocialIcon } from "@/lib/config";

function SocialIconComponent({ icon }: { icon: SocialIcon }) {
    const s = 16;
    if (icon === "facebook") return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
    if (icon === "instagram") return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
    if (icon === "tiktok") return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
    );
    if (icon === "youtube") return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
            <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
    );
    if (icon === "email") return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
    return null;
}

/**
 * Site footer.
 *
 * To customise navigation links, edit `footerGroups` in lib/site.ts.
 * To customise social media links, edit `socialLinks` in lib/config.ts.
 */
export function SiteFooter() {
    return (
        <footer className="mt-auto bg-site-primary-strong text-white/80">
            <div className="container py-12 md:py-16">

                {/* ── Main grid ──────────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr]">

                    {/* Brand column */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="self-start">
                            <span className="inline-flex rounded-xl bg-white px-3 py-2">
                                <Image
                                    src="/assets/logo-baru.png"
                                    alt="Logo SMA Nasional Malang"
                                    width={120}
                                    height={30}
                                    className="h-8 w-auto"
                                />
                            </span>
                        </Link>

                        <p className="max-w-xs text-sm leading-relaxed text-white/60">
                            Website resmi {schoolInfo.name} — informasi PPDB,
                            akademik, prestasi, dan kabar terbaru.
                        </p>

                        {/* Social icons */}
                        <div className="mt-1 flex flex-wrap gap-2">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.icon}
                                    href={item.href}
                                    aria-label={item.label}
                                    target={item.href.startsWith("mailto") ? undefined : "_blank"}
                                    rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-site-primary"
                                >
                                    <SocialIconComponent icon={item.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link groups — edit footerGroups in lib/site.ts to customise */}
                    {footerGroups.map((group) => (
                        <div key={group.title}>
                            <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">
                                {group.title}
                            </h5>
                            <ul className="flex flex-col gap-2">
                                {group.links.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-white/70 transition-colors hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ── Bottom bar ─────────────────────────────────────── */}
                <div className="mt-10 flex flex-col gap-1 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} {schoolInfo.name}. Seluruh hak cipta dilindungi.</p>
                    <p>
                        Powered by{" "}
                        <a
                            href="https://sediksi.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-site-accent transition-opacity hover:opacity-80"
                        >
                            Sediksi
                        </a>
                    </p>
                </div>

            </div>
        </footer>
    );
}
