import { PageWrap } from "@/components/layout/page-wrap";

export default function KontakLoading() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Kontak" }]}>
            <div className="max-w-2xl mx-auto w-full flex flex-col gap-6 py-4">
                {/* Heading */}
                <div className="flex flex-col gap-3">
                    <div className="shimmer h-4 w-20 rounded-full" />
                    <div className="shimmer h-8 w-56 rounded-lg" />
                    <div className="shimmer h-4 w-full max-w-sm rounded" />
                </div>

                {/* Contact info cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="surface p-4 flex items-center gap-3">
                            <div className="shimmer h-10 w-10 rounded-xl shrink-0" />
                            <div className="flex flex-col gap-2 flex-1">
                                <div className="shimmer h-3 w-20 rounded" />
                                <div className="shimmer h-4 w-32 rounded" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form skeleton */}
                <div className="surface p-6 flex flex-col gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <div className="shimmer h-3 w-24 rounded" />
                            <div className="shimmer h-10 w-full rounded-lg" />
                        </div>
                    ))}
                    <div className="flex flex-col gap-2">
                        <div className="shimmer h-3 w-24 rounded" />
                        <div className="shimmer h-28 w-full rounded-lg" />
                    </div>
                    <div className="shimmer h-10 w-32 rounded-full" />
                </div>
            </div>
        </PageWrap>
    );
}
