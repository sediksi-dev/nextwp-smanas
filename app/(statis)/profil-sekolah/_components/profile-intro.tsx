import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Section } from "@/components/layout/section";
import { parseHtmlContent } from "@/lib/utils";

interface ProfileIntroProps {
    photo: string;
    name: string;
    role: string;
    intro: string;
}

export function ProfileIntro({ photo, name, role, intro }: ProfileIntroProps) {
    return (
        <Section py="sm">
            <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-start">
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-full overflow-hidden rounded-xl">
                        <AspectRatio ratio={1 / 1}>
                            <Image
                                src={photo}
                                alt={name}
                                className="object-cover w-auto h-auto"
                                fill
                            />
                        </AspectRatio>
                    </div>
                    <p className="font-bold text-primary text-sm">{name}</p>
                    <p className="text-muted-foreground text-xs">{role}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                        Selayang Pandang
                    </h2>
                    <div
                        className="prose text-base md:text-lg leading-relaxed text-foreground/80"
                        dangerouslySetInnerHTML={{ __html: parseHtmlContent(intro) }}
                    />
                </div>
            </div>
        </Section>
    );
}
