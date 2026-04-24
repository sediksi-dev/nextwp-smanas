"use client";

export default function GlobalError({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground">Terjadi Kesalahan</h2>
            <p className="text-muted-foreground text-sm max-w-md">
                Maaf, halaman ini tidak dapat dimuat saat ini. Silakan coba lagi.
            </p>
            <button
                onClick={reset}
                className="px-6 py-2 rounded-lg bg-site-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
                Coba Lagi
            </button>
        </div>
    );
}
