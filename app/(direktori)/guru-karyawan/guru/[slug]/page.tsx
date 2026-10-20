import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { getTeacherById, getTeachers } from "@/lib/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TeacherCard } from "../../_components/teacher-card";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const teachers = await getTeachers();
    return teachers
        .filter((t) => t.category !== "staf")
        .map((t) => ({ slug: String(t._ID) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug: id } = await params;
    const teacher = /^\d+$/.test(id) ? await getTeacherById(id) : null;
    if (!teacher) return { title: "Guru tidak ditemukan | SMA Nasional Malang" };
    return {
        title: `${teacher.name} | Guru & Karyawan | SMA Nasional Malang`,
        description: `Profil ${teacher.name} — ${teacher.role || "Tenaga Pendidik"} SMA Nasional Malang.`,
    };
}

export default async function GuruProfilPage({ params }: Props) {
    const { slug: id } = await params;
    const teacher = /^\d+$/.test(id) ? await getTeacherById(id) : null;

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

                {/* Back navigation */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                    <Button asChild variant="outline" size="sm" className="gap-1.5">
                        <Link href="/guru-karyawan">
                            <ChevronLeft className="h-4 w-4" />
                            Guru &amp; Karyawan
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Link href="/guru-karyawan/guru">Semua Guru</Link>
                    </Button>
                </div>
            </Section>

            {/* ── Lihat Guru Lainnya ── */}
            {otherTeachers.length > 0 && (
                <Section py="sm" className="border-t border-border pb-12">
                    <h2 className="mb-6 text-xl font-bold tracking-tight">Lihat Guru Lainnya</h2>
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 md:gap-8">
                        {otherTeachers.map((other) => (
                            <TeacherCard key={other._ID} teacher={other} showProfile />
                        ))}
                    </div>
                </Section>
            )}
        </PageWrap>
    );
}
