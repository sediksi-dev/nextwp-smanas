export default function ArtikelLoading() {
    return (
        <div className="container py-12">
            {/* Skeleton cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="surface overflow-hidden">
                        <div className="aspect-video w-full bg-muted" />
                        <div className="flex flex-col gap-3 p-5">
                            <div className="h-4 w-20 rounded bg-muted" />
                            <div className="h-5 w-full rounded bg-muted" />
                            <div className="h-4 w-3/4 rounded bg-muted" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
