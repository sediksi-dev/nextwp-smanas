import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getTeacherById, getTeachers } from "@/lib/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function GuruProfilPage({ params }: Props) {
    const { slug: id } = await params;
    const teacher = await getTeacherById(id);

    if (!teacher || teacher.category === "staf") notFound();

    const others = await getTeachers();
    const otherTeachers = others
        .filter((t) => t._ID !== teacher._ID && t.category !== "staf")
        .slice(0, 4);

    const infoFields: { label: string; value: string | undefined }[] = [
        {
            label: "Tempat, Tanggal Lahir",
            value: [teacher.birthplace, teacher.birthdate].filter(Boolean).join(", ") || undefined,
        },
        { label: "Email", value: teacher.email || undefined },
        { label: "Jabatan / Bidang", value: teacher.role || undefined },
        { label: "NUPTK", value: teacher.nuptk || undefined },
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
                {/* Back navigation */}
                <div className="mb-8 flex flex-wrap items-center gap-2">
                    <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                        <Link href="/guru-karyawan">
                            <ChevronLeft className="h-4 w-4" />
                            Guru &amp; Karyawan
                        </Link>
                    </Button>
                    <span className="text-muted-foreground/40">/</span>
                    <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Link href="/guru-karyawan/guru">Semua Guru</Link>
                    </Button>
                </div>

                <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                    {/* Photo */}
                    <div className="surface shrink-0 self-start overflow-hidden rounded-2xl">
                        <div className="relative h-64 w-48 md:h-80 md:w-60">
                            <Image
                                src={teacher.photo || "/assets/placeholder.jpg"}
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
                                {teacher.role}
                            </Badge>
                            <h1 className="section-title">{teacher.name}</h1>
                            {teacher.motto && (
                                <blockquote className="mt-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
                                    &ldquo;{teacher.motto}&rdquo;
                                </blockquote>
                            )}
                        </div>

                        <div className="surface divide-y divide-border overflow-hidden">
                            {infoFields.map(({ label, value }) =>
                                value ? (
                                    <div
                                        key={label}
                                        className="flex flex-col gap-0.5 px-5 py-3 sm:flex-row sm:gap-4"
                                    >
                                        <span className="w-52 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                            {label}
                                        </span>
                                        <span className="text-sm font-medium">{value}</span>
                                    </div>
                                ) : null,
                            )}
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Lihat Guru Lainnya ── */}
            {otherTeachers.length > 0 && (
                <Section py="sm" className="border-t border-border pb-12">
                    <h2 className="mb-6 text-xl font-bold tracking-tight">Lihat Guru Lainnya</h2>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 md:gap-8">
                        {otherTeachers.map((other) => (
                            <div key={other._ID} className="surface flex flex-col overflow-hidden">
                                <div className="relative aspect-4/5 w-full overflow-hidden">
                                    <Image
                                        src={other.photo || "/assets/placeholder.jpg"}
                                        alt={other.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-3 p-4">
                                    <div>
                                        <p className="font-bold leading-snug text-sm">{other.name}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{other.role}</p>
                                    </div>
                                    <Button asChild size="sm" variant="outline" className="mt-auto w-full">
                                        <Link href={`/guru-karyawan/guru/${other._ID}`}>Lihat Profil</Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            )}
        </PageWrap>
    );
}
