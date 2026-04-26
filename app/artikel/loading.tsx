export default function ArtikelLoading() {
  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-col gap-3">
        <div className="shimmer h-4 w-32 rounded-full" />
        <div className="shimmer h-8 w-64 rounded-lg" />
        <div className="shimmer h-4 w-96 max-w-full rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="surface overflow-hidden">
            <div className="shimmer aspect-video w-full" />
            <div className="flex flex-col gap-3 p-5">
              <div className="shimmer h-4 w-20 rounded-full" />
              <div className="shimmer h-5 w-full rounded" />
              <div className="shimmer h-4 w-3/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
