export default function PpdbDetailLoading() {
    return (
        <div className="container py-10">
            <div className="grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-14">
                <div className="flex flex-col gap-6">
                    <div className="shimmer w-full rounded-2xl" style={{ aspectRatio: "3/4", maxHeight: "24rem" }} />
                    <div className="flex flex-col gap-3">
                        <div className="shimmer h-3 w-32 rounded" />
                        <div className="shimmer h-9 w-3/4 rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className={`shimmer h-4 rounded ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="shimmer h-40 rounded-xl" />
                    <div className="shimmer h-24 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
