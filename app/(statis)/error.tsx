"use client";

export default function StatisError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4 text-center">
            <h2 className="text-xl font-bold text-foreground">Halaman Tidak Tersedia</h2>
            <p className="text-muted-foreground text-sm max-w-md">
                Konten halaman ini tidak dapat dimuat. Silakan coba lagi atau kunjungi halaman lain.
            </p>
            <button
                onClick={reset}
                className="px-5 py-2 rounded-lg bg-site-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
                Coba Lagi
            </button>
        </div>
    );
}
