export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-10 w-10">
          <div className="h-10 w-10 rounded-full border-[3px] border-site-border" />
          <div className="absolute inset-0 h-10 w-10 rounded-full border-[3px] border-site-primary border-t-transparent animate-spin" />
        </div>
        <p className="text-xs font-medium text-muted-foreground tracking-wide">Memuat halaman...</p>
      </div>
    </div>
  );
}
