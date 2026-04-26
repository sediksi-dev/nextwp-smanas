/** Centralised school configuration — single source of truth for contact info,
 *  social links, and school identity. Use this instead of hardcoding values in
 *  individual page components. */

export const schoolInfo = {
    name: "SMA Nasional Malang",
    shortName: "SMANAS",
    npsn: "20533924",
    address: {
        street: "Jl. Slamet Supriadi No. 50",
        kelurahan: "Bandungrejosari",
        kecamatan: "Kec. Sukun",
        city: "Kota Malang",
        province: "Jawa Timur",
        postalCode: "65148",
        full: "Jl. Slamet Supriadi No. 50, Bandungrejosari, Kec. Sukun, Kota Malang, Jawa Timur 65148",
    },
    contact: {
        phone: "(0341) 802835",
        whatsapp: "0813-3473-7292",
        email: "websmanasionalmalang@gmail.com",
    },
    operationalHours: [
        { days: "Senin s/d Jumat", hours: "07:00 — 16:00" },
    ],
    mapsEmbedUrl:
        "https://maps.google.com/maps?q=Jl.+Slamet+Supriadi+No.+50,+Bandungrejosari,+Sukun,+Kota+Malang,+Jawa+Timur+65148&output=embed",
    mapsQuery:
        "Jl. Slamet Supriadi No. 50, Bandungrejosari, Sukun, Kota Malang, Jawa Timur 65148",
} as const;

export const socialLinks = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/smanasionalmalang",
        icon: "facebook",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/smanasionalmalang",
        icon: "instagram",
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@smanasionalmalang",
        icon: "tiktok",
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@smanasionalmalang",
        icon: "youtube",
    },
    {
        label: "Email",
        href: "mailto:websmanasionalmalang@gmail.com",
        icon: "email",
    },
] as const;

export type SocialIcon = (typeof socialLinks)[number]["icon"];

