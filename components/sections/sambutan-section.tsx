import { Section } from "@/components/layout/section";
import Image from "next/image";
import { SectionTitle } from "@/components/elements/section-title";


interface SambutanSectionProps {
    section?: {
        title: string;
        description?: string;
        eyebrow?: string;
    }
    name: string;
    role: string;
    photo: string;
    message: string;
}

export function SambutanSection(props: SambutanSectionProps) {
    return (
        <Section>
            {/* Title */}
            <SectionTitle
                variant="centered-bar"
                eyebrow={props.section?.eyebrow}
                title={props.section?.title || "Sambutan Kepala Sekolah"}
                description={props.section?.description}
                className="md:mb-14"
            />

            <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-start">
                {/* Left: foto + identitas */}
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-full overflow-hidden rounded-xl">
                        <div className="relative w-full aspect-square md:aspect-3/4 overflow-hidden">
                            <Image
                                src={props.photo}
                                alt={`Foto ${props.name}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-primary text-sm">{props.name}</p>
                    <p className="text-muted-foreground text-xs">{props.role}.</p>
                </div>

                {/* Right: pesan */}
                <div className="flex flex-col gap-4 text-sm md:text-base text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{
                    __html: props.message
                }}>
                </div>
            </div>
        </Section>
    );
}
