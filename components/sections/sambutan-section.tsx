import { Section } from "@/components/layout/section";
import Image from "next/image";
import { mockPrincipalMessage } from "@/lib/mock-data";

export function SambutanSection() {
    const paragraphs = mockPrincipalMessage.message.split("\n\n").filter(Boolean);

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
                        <Image
                            src={mockPrincipalMessage.photo}
                            alt={mockPrincipalMessage.name}
                            width={220}
                            height={270}
                            className="object-cover w-full"
                        />
                    </div>
                    <p className="font-bold text-primary text-sm">{mockPrincipalMessage.name}</p>
                    <p className="text-muted-foreground text-xs">{mockPrincipalMessage.role}.</p>
                </div>

                {/* Right: pesan */}
                <div className="flex flex-col gap-4">
                    {paragraphs.map((para, i) => (
                        <p key={i} className="text-sm md:text-base text-foreground/80 leading-relaxed">
                            {para}
                        </p>
                    ))}
                </div>
            </div>
        </Section>
    );
}
