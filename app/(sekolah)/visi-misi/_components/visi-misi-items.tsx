interface MisiListProps {
    items: string[];
}

export function MisiList({ items }: MisiListProps) {
    return (
        <ol className="flex flex-col divide-y divide-border list-none p-0 m-0">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 items-start py-3 first:pt-0 last:pb-0">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold tabular-nums text-site-primary">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm md:text-base leading-relaxed text-foreground/80 pt-1">
                        {item}
                    </span>
                </li>
            ))}
        </ol>
    );
}

interface TujuanListProps {
    items: string[];
}

export function TujuanList({ items }: TujuanListProps) {
    return (
        <div className="flex flex-col gap-4">
            {items.map((item, i) => (
                <div key={i} className="rounded-xl border border-site-border bg-secondary/30 p-4 flex flex-col gap-1.5">
                    <span className="text-4xl font-extrabold leading-none tabular-nums text-site-accent">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                        {item}
                    </p>
                </div>
            ))}
        </div>
    );
}
