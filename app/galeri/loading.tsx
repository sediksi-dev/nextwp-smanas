export default function GaleriLoading() {
  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="shimmer h-4 w-24 rounded-full" />
        <div className="shimmer h-8 w-52 rounded-lg" />
        <div className="shimmer h-4 w-80 max-w-full rounded-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="shimmer aspect-square rounded-xl" />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-center gap-2 mt-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="shimmer h-9 w-9 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
