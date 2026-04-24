import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockTeachers } from "@/lib/mock-data";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return mockTeachers
        .filter((t) => t.type === "guru")
        .map((t) => ({ slug: t.slug }));
}

export default async function GuruProfilPage({ params }: Props) {
    const { slug } = await params;
    const teacher = mockTeachers.find((t) => t.slug === slug && t.type === "guru");

    if (!teacher) notFound();

    const others = mockTeachers
        .filter((t) => t.type === "guru" && t.slug !== slug)
        .sort((a, b) => a.order - b.order);

    const fields: { label: string; value: string }[] = [
        { label: "Tempat, Tanggal Lahir", value: `${teacher.birthPlace}, ${teacher.birthDate}` },
        { label: "Email", value: teacher.email },
        { label: "Mata Pelajaran / Jabatan", value: teacher.subject },
        { label: "NUPTK", value: teacher.nuptk },
    ];

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "Guru & Karyawan", href: "/guru-karyawan" },
                { label: teacher.name },
            ]}
        >
            <Section py="sm">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                    {/* Photo */}
                    <div className="surface shrink-0 self-start overflow-hidden rounded-2xl">
                        <div className="relative h-64 w-48 md:h-80 md:w-60">
                            <Image
                                src={teacher.photo}
                                alt={teacher.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 12rem, 15rem"
                                priority
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-6">
                        <div>
                            <Badge variant="secondary" className="mb-3">
                                {teacher.jabatan}
                            </Badge>
                            <h1 className="section-title">{teacher.name}</h1>
                            <blockquote className="mt-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
                                &ldquo;{teacher.motto}&rdquo;
                            </blockquote>
                        </div>

                        <div className="surface divide-y divide-border overflow-hidden">
                            {fields.map(({ label, value }) => (
                                <div key={label} className="flex flex-col gap-0.5 px-5 py-3 sm:flex-row sm:gap-4">
                                    <span className="w-52 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        {label}
                                    </span>
                                    <span className="text-sm font-medium">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Lihat Guru Lainnya ── */}
            <Section py="sm" className="border-t border-border">
                <h2 className="mb-6 text-xl font-bold tracking-tight">Lihat Guru Lainnya</h2>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 md:gap-8">
                    {others.map((other) => (
                        <div key={other.slug} className="surface flex flex-col overflow-hidden">
                            <div className="relative aspect-4/5 w-full overflow-hidden">
                                <Image
                                    src={other.photo}
                                    alt={other.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-3 p-4">
                                <div>
                                    <p className="font-bold leading-snug text-sm">{other.name}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">{other.jabatan}</p>
                                </div>
                                <Button asChild size="sm" variant="outline" className="mt-auto w-full">
                                    <Link href={`/guru-karyawan/guru/${other.slug}`}>Lihat Profil</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
