export default function ArtikelViewLoading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-3 px-4">
        <div className="shimmer h-3 w-20 rounded" />
        <div className="shimmer h-8 w-3/4 rounded" />
        <div className="shimmer h-4 w-48 rounded" />
      </div>

      <div className="max-w-3xl mx-auto w-full px-4">
        <div className="shimmer relative aspect-video w-full overflow-hidden rounded-2xl" />
      </div>

      <div className="max-w-3xl mx-auto w-full space-y-3 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`shimmer h-4 rounded ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>

      <div className="max-w-3xl mx-auto w-full border-t border-border pt-6 px-4">
        <div className="shimmer h-8 w-40 rounded" />
      </div>

      <div className="px-4">
        <div className="shimmer h-6 w-32 rounded mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="surface flex flex-col gap-3 overflow-hidden">
              <div className="shimmer relative aspect-video w-full" />
              <div className="flex flex-col gap-2 p-4">
                <div className="shimmer h-3 w-16 rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-3 w-5/6 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
