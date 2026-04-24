export default function RootLoading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-site-primary border-t-transparent animate-spin" />
                <p className="text-xs text-muted-foreground">Memuat...</p>
            </div>
        </div>
    );
}
