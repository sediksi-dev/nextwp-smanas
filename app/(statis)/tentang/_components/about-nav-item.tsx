import Link from "next/link";

interface AboutNavItemProps {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
    href: string;
}

export function AboutNavItem({ number, eyebrow, title, description, href }: AboutNavItemProps) {
    return (
        <Link
            href={href}
            className="group flex items-start gap-6 md:gap-10 py-8 border-t border-border -mx-4 px-4 md:-mx-8 md:px-8 hover:bg-muted/40 transition-colors duration-200"
        >
            {/* Large decorative number */}
            <span className="shrink-0 text-5xl md:text-7xl font-extrabold tabular-nums leading-none text-border group-hover:text-site-primary transition-colors duration-300">
                {number}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-1 pt-2">
                <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                    {eyebrow}
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                    {title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground max-w-lg">
                    {description}
                </p>
            </div>

            {/* Arrow circle */}
            <span className="shrink-0 self-center hidden md:flex items-center justify-center w-11 h-11 rounded-full border border-border text-muted-foreground group-hover:bg-site-primary group-hover:border-site-primary group-hover:text-white transition-all duration-200">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </Link>
    );
}
