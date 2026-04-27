export default function DokumenSiswaLoading() {
    return (
        <div className="container py-10 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
                <div className="shimmer h-4 w-20 rounded-full" />
                <div className="shimmer h-9 w-48 rounded-lg" />
                <div className="shimmer h-4 w-72 rounded" />
            </div>
            <div className="flex flex-col gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="surface p-4 flex items-center gap-4">
                        <div className="shimmer h-8 w-8 rounded" />
                        <div className="shimmer h-4 flex-1 rounded" />
                        <div className="shimmer h-8 w-24 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
