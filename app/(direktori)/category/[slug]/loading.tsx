export default function CategorySlugLoading() {
    return (
        <div className="container py-10 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
                <div className="shimmer h-4 w-24 rounded-full" />
                <div className="shimmer h-9 w-64 rounded-lg" />
                <div className="shimmer h-4 w-80 rounded" />
            </div>
            <div className="shimmer h-10 w-full max-w-sm rounded-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="surface overflow-hidden">
                        <div className="shimmer aspect-video w-full" />
                        <div className="flex flex-col gap-3 p-5">
                            <div className="shimmer h-3 w-20 rounded-full" />
                            <div className="shimmer h-5 w-full rounded" />
                            <div className="shimmer h-4 w-3/4 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
