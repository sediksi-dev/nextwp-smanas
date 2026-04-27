export default function GuruProfilLoading() {
    return (
        <div className="container py-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                <div className="surface shrink-0 overflow-hidden rounded-2xl">
                    <div className="shimmer h-64 w-48 md:h-80 md:w-60" />
                </div>
                <div className="flex flex-1 flex-col gap-6">
                    <div>
                        <div className="shimmer h-5 w-24 rounded-full mb-3" />
                        <div className="shimmer h-8 w-64 rounded-lg mb-4" />
                        <div className="shimmer h-4 w-full max-w-sm rounded" />
                    </div>
                    <div className="surface divide-y divide-border overflow-hidden">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-0.5 px-5 py-3 sm:flex-row sm:gap-4">
                                <div className="shimmer h-3 w-32 rounded mb-1" />
                                <div className="shimmer h-4 w-48 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
