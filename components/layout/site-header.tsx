import Image from "next/image";
import Link from "next/link";

import { HeaderNavDesktop } from "./header-nav-desktop";
import { HeaderNavMobile } from "./header-nav-mobile";
import { navItems } from "@/lib/site";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-site-bg shadow-site py-3 md:py-4">
            <div className="container flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/assets/logo-baru.png"
                            alt="Logo SMA Nasional Malang"
                            width={160}
                            height={40}
                            className="h-auto w-35 sm:w-40"
                        />
                    </Link>

                    <HeaderNavDesktop navItems={navItems} />
                    <HeaderNavMobile navItems={navItems} />
                </div>
            </div>
        </header>
    );
}
