import { Section } from "@/components/layout/section";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";


interface SambutanSectionProps {
    name: string;
    role: string;
    photo: string;
    message: string;
}

export function SambutanSection(props: SambutanSectionProps) {
    const paragraphs = props.message.split("\n\n").filter(Boolean);

    return (
        <Section>
            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase text-center text-foreground mb-10 md:mb-14">
                Sambutan Kepala Sekolah
            </h2>

            <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-start">
                {/* Left: foto + identitas */}
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-full overflow-hidden rounded-xl">
                        <AspectRatio ratio={3/4}>
                            <Image
                                src={props.photo}
                                alt={`Foto ${props.name}`}
                                fill
                                className="object-cover"
                            />
                        </AspectRatio>
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
