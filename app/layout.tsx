import type { Metadata } from "next";
import { Geist_Mono, Manrope, Public_Sans } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { schoolInfo } from "@/lib/config";
import "./globals.css";

const headlineFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: schoolInfo.name,
    template: `%s | ${schoolInfo.name}`,
  },
  description: `Website resmi ${schoolInfo.name} — sekolah menengah atas swasta favorit di Kota Malang. Informasi PPDB, prestasi, guru, galeri, dan artikel sekolah.`,
  metadataBase: new URL("https://smanasionalmalang.sch.id"),
  openGraph: {
    siteName: schoolInfo.name,
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: '/assets/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${headlineFont.variable} ${bodyFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-site-bg text-site-text">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
