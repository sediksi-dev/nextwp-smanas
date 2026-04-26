import { PageWrap } from "@/components/layout/page-wrap";

export default function VisiMisiLoading() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Visi & Misi" }]}>
            <div className="flex flex-col gap-10 max-w-3xl">
                {/* Heading */}
                <div className="flex flex-col gap-3">
                    <div className="shimmer h-4 w-20 rounded-full" />
                    <div className="shimmer h-9 w-48 rounded-lg" />
                </div>

                {/* Visi block */}
                <div className="surface p-6 flex flex-col gap-4">
                    <div className="shimmer h-5 w-24 rounded" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`shimmer h-4 rounded ${i === 2 ? "w-3/4" : "w-full"}`} />
                    ))}
                </div>

                {/* Misi list */}
                <div className="flex flex-col gap-3">
                    <div className="shimmer h-5 w-24 rounded" />
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="shimmer h-5 w-5 rounded-full shrink-0 mt-0.5" />
                            <div className={`shimmer h-4 rounded flex-1 ${i % 3 === 2 ? "max-w-[75%]" : "w-full"}`} />
                        </div>
                    ))}
                </div>
            </div>
        </PageWrap>
    );
}
