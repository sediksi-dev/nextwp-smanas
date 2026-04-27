import { PageWrap } from "@/components/layout/page-wrap";

export default function ProfilSekolahLoading() {
    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Profil Sekolah" }]}>
            <div className="flex flex-col gap-10">
                {/* Heading */}
                <div className="flex flex-col gap-3">
                    <div className="shimmer h-4 w-20 rounded-full" />
                    <div className="shimmer h-9 w-56 rounded-lg" />
                </div>

                {/* Content + image */}
                <div className="grid md:grid-cols-[1fr_320px] gap-8 items-start">
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className={`shimmer h-4 rounded ${i % 4 === 3 ? "w-2/3" : "w-full"}`} />
                        ))}
                    </div>
                    <div className="shimmer aspect-square rounded-2xl" />
                </div>

                {/* Info cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="surface p-5 flex flex-col gap-2">
                            <div className="shimmer h-8 w-8 rounded-lg" />
                            <div className="shimmer h-6 w-16 rounded" />
                            <div className="shimmer h-3 w-24 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </PageWrap>
    );
}
