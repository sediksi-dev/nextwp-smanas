export default function ArtikelViewLoading() {
    return (
        <div className="flex flex-col gap-8">
            {/* Header skeleton */}
            <div className="max-w-3xl mx-auto w-full flex flex-col gap-3 animate-pulse px-4">
                <div className="h-3 w-20 rounded bg-muted" />
                <div className="h-8 w-3/4 rounded bg-muted" />
            </div>

            {/* Featured image skeleton */}
            <div className="max-w-3xl mx-auto w-full">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted animate-pulse" />
            </div>

            {/* Content skeleton */}
            <div className="max-w-3xl mx-auto w-full space-y-4 animate-pulse px-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-4 w-full rounded bg-muted" />
                ))}
            </div>

            {/* Back button skeleton */}
            <div className="max-w-3xl mx-auto w-full border-t border-border pt-6 px-4">
                <div className="h-8 w-40 rounded bg-muted animate-pulse" />
            </div>

            {/* Related posts skeleton */}
            <div className="px-4">
                <div className="h-6 w-32 rounded bg-muted mb-6 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 animate-pulse">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="surface flex flex-col gap-3 overflow-hidden">
                            <div className="relative aspect-video w-full overflow-hidden bg-muted" />
                            <div className="flex flex-col gap-2 p-4">
                                <div className="h-3 w-16 rounded bg-muted" />
                                <div className="h-4 w-full rounded bg-muted" />
                                <div className="h-3 w-5/6 rounded bg-muted" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 
