import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = [
    { label: "Sejarah", value: "sejarah" },
    { label: "Makna Lambang", value: "makna-lambang" },
    { label: "Komite Sekolah", value: "komite-sekolah" },
    { label: "Mars Smanas", value: "mars-smanas" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

interface ProfileTabNavProps {
    activeTab: TabValue;
}

export function ProfileTabNav({ activeTab }: ProfileTabNavProps) {
    return (
        <nav aria-label="Tab profil sekolah" className="flex flex-row flex-wrap md:flex-col gap-2 md:w-48 shrink-0">
            {TABS.map((t) => (
                <Link
                    key={t.value}
                    href={`/profil-sekolah?tab=${t.value}`}
                    className={cn(
                        "px-5 py-2 rounded-full md:rounded-lg text-sm font-semibold border transition-colors text-left",
                        activeTab === t.value
                            ? "bg-site-primary text-white border-site-primary"
                            : "bg-white border-site-border text-site-muted hover:border-site-primary hover:text-site-primary",
                    )}
                    aria-current={activeTab === t.value ? "page" : undefined}
                >
                    {t.label}
                </Link>
            ))}
        </nav>
    );
}
