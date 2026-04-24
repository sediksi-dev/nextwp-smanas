import { Section } from "../layout/section";

interface PageHeadingProps {
    title: string;
    subtitle?: string;
    description?: string;
}


export default function PageHeading({ title, subtitle, description }: PageHeadingProps) {
    return (
        <Section py="sm" >
            <div className="flex items-center gap-2 mb-4">
                <span className="block w-6 h-0.5 bg-site-accent" />
                {subtitle && <p className="text-xs font-bold tracking-widest uppercase text-site-primary">{subtitle}</p>}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-2xl leading-tight">
                {title}
            </h1>
            {description && (
                <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl">
                    {description}
                </p>
            )}
        </Section>
    )
}
