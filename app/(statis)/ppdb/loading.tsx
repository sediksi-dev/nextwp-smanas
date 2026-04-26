import { PageWrap } from "@/components/layout/page-wrap";

export default function PpdbLoading() {
  return (
    <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "PPDB" }]}>
      <div className="flex flex-col gap-8">
        {/* Page heading */}
        <div className="flex flex-col gap-3">
          <div className="shimmer h-4 w-20 rounded-full" />
          <div className="shimmer h-9 w-64 rounded-lg" />
          <div className="shimmer h-4 w-full max-w-md rounded" />
        </div>

        {/* PPDB cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="surface overflow-hidden flex flex-col">
              <div className="shimmer aspect-video w-full" />
              <div className="p-5 flex flex-col gap-3">
                <div className="shimmer h-5 w-3/4 rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-5/6 rounded" />
                <div className="shimmer h-8 w-28 rounded-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}
