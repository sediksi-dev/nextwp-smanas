import { PageWrap } from "@/components/layout/page-wrap";

export default function GuruKaryawanLoading() {
  return (
    <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Guru & Karyawan" }]}>
      <div className="flex flex-col gap-10">
        {/* Heading */}
        <div className="flex flex-col gap-3">
          <div className="shimmer h-4 w-28 rounded-full" />
          <div className="shimmer h-9 w-60 rounded-lg" />
          <div className="shimmer h-4 w-full max-w-sm rounded" />
        </div>

        {/* Group heading */}
        <div className="flex flex-col gap-6">
          {[1, 3, 4].map((count, g) => (
            <div key={g} className="flex flex-col gap-4">
              <div className="shimmer h-5 w-40 rounded" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="surface p-4 flex flex-col items-center gap-3">
                    <div className="shimmer w-20 h-20 rounded-full" />
                    <div className="shimmer h-4 w-24 rounded" />
                    <div className="shimmer h-3 w-20 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrap>
  );
}
