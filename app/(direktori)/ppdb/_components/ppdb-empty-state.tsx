export function PpdbEmptyState() {
    return (
        <div className="mt-8 surface rounded-2xl p-10 flex flex-col items-center gap-4 text-center max-w-3xl mx-auto">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12 text-muted-foreground/50"
                aria-hidden
            >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
            </svg>
            <div>
                <p className="font-bold text-foreground text-lg">Belum Ada Pendaftaran Dibuka</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Saat ini tidak ada pembukaan pendaftaran peserta didik baru yang sedang berlangsung.
                    Pantau terus halaman ini untuk informasi terbaru.
                </p>
            </div>
        </div>
    );
}
