import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";

function SkeletonPill({ w = "w-16" }: { w?: string }) {
    return <div className={`h-7 ${w} rounded-full shimmer`} />;
}

function SkeletonCard() {
    return <div className="aspect-square rounded-xl shimmer" />;
}

export default function PrestasiLoading() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Prestasi" }]}>
            {/* Page heading skeleton */}
            <Section>
                <div className="flex flex-col items-center gap-3">
                    <div className="h-4 w-24 rounded-full shimmer" />
                    <div className="h-9 w-64 rounded-lg shimmer" />
                    <div className="h-4 w-96 max-w-full rounded-full shimmer" />
                </div>
            </Section>

            {/* Filters skeleton */}
            <Section py="sm">
                <div className="flex flex-col gap-4">
                    {/* Search + view */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="h-10 flex-1 rounded-full shimmer" />
                        <div className="h-10 w-36 rounded-full shimmer" />
                    </div>
                    {/* Year pills */}
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SkeletonPill key={i} w="w-14" />
                        ))}
                    </div>
                    {/* Scope pills */}
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SkeletonPill key={i} w="w-20" />
                        ))}
                    </div>
                </div>
            </Section>

            {/* Grid skeleton */}
            <Section py="sm">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
