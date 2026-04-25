"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";

interface CategorySearchProps {
    defaultValue?: string;
    placeholder?: string;
}

export function CategorySearch({
    defaultValue = "",
    placeholder = "Cari artikel...",
}: CategorySearchProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleChange = useCallback(
        (value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set("q", value);
            } else {
                params.delete("q");
            }
            params.delete("page");
            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
            });
        },
        [router, pathname, searchParams],
    );

    return (
        <div
            className={`relative w-full sm:max-w-sm${isPending ? " opacity-60 pointer-events-none" : ""}`}
        >
            <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
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
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full border border-border text-sm text-foreground placeholder:text-muted-foreground bg-white focus:outline-none focus:border-site-primary transition-colors"
            />
        </div>
    );
}
