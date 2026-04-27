"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list" | "plain";

const VIEW_OPTIONS: { value: ViewMode; label: string; icon: React.ReactNode }[] = [
    {
        value: "grid",
        label: "Grid",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
        ),
    },
    {
        value: "list",
        label: "List",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="1" width="4" height="4" rx="0.5" />
                <rect x="7" y="2" width="8" height="2" rx="1" />
                <rect x="1" y="6.5" width="4" height="4" rx="0.5" />
                <rect x="7" y="7.5" width="8" height="2" rx="1" />
                <rect x="1" y="12" width="4" height="4" rx="0.5" />
                <rect x="7" y="13" width="8" height="2" rx="1" />
            </svg>
        ),
    },
    {
        value: "plain",
        label: "Plain",
        icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="1" y="2" width="14" height="2" rx="1" />
                <rect x="1" y="6" width="14" height="2" rx="1" />
                <rect x="1" y="10" width="10" height="2" rx="1" />
            </svg>
        ),
    },
];

interface Props {
    defaultSearch?: string;
    defaultView?: ViewMode;
}

export function SearchAndViewControls({ defaultSearch = "", defaultView = "grid" }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const updateParam = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            params.delete("page"); // reset to page 1 on any filter change
            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
            });
        },
        [router, pathname, searchParams]
    );

    return (
        <div className={cn("flex flex-col sm:flex-row gap-3", isPending && "opacity-60 pointer-events-none")}>
            {/* Search input */}
            <div className="relative flex-1">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-site-muted w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
                </svg>
                <input
                    type="search"
                    placeholder="Cari prestasi, penerima, penyelenggara..."
                    defaultValue={defaultSearch}
                    onChange={(e) => updateParam("q", e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-full border border-site-border text-sm text-site-foreground placeholder:text-site-muted bg-white focus:outline-none focus:border-site-primary transition-colors"
                />
            </div>

            {/* View toggle */}
            <div className="flex gap-1 bg-white border border-site-border rounded-full p-1 self-start sm:self-auto">
                {VIEW_OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => updateParam("view", opt.value === "grid" ? "" : opt.value)}
                        title={opt.label}
                        className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
                            (defaultView === opt.value)
                                ? "bg-site-primary text-white"
                                : "text-site-muted hover:text-site-primary"
                        )}
                    >
                        {opt.icon}
                        <span className="hidden sm:inline">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
