export default function PpdbHasilLoading() {
    return (
        <div className="container py-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <div className="shimmer h-3 w-40 rounded" />
                <div className="shimmer h-9 w-3/4 rounded-lg" />
            </div>
            <div className="shimmer h-10 w-full max-w-sm rounded-full" />
            <div className="surface overflow-hidden rounded-xl">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex gap-4 px-5 py-3 border-b border-border last:border-0">
                        <div className="shimmer h-4 w-8 rounded" />
                        <div className="shimmer h-4 w-32 rounded" />
                        <div className="shimmer h-4 flex-1 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
