export default function CategoryLoading() {
    return (
        <div className="container py-10 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
                <div className="shimmer h-4 w-20 rounded-full" />
                <div className="shimmer h-9 w-56 rounded-lg" />
                <div className="shimmer h-4 w-72 rounded" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="surface p-5 rounded-xl flex flex-col gap-2">
                        <div className="shimmer h-5 w-3/4 rounded" />
                        <div className="shimmer h-3 w-16 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
