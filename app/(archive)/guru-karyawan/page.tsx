import Image from "next/image";
import Link from "next/link";
import { mockTeachers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";

export default function GuruKaryawanPage() {
    const teachers = mockTeachers.filter((t) => t.type === "guru").sort((a, b) => a.order - b.order);
    const staffs = mockTeachers.filter((t) => t.type === "staf").sort((a, b) => a.order - b.order);

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Guru & Karyawan" }]}>
            {/* ── Guru ── */}
            <PageHeading title="Guru & Karyawan" description="Tenaga pendidik dan kependidikan SMA Nasional Malang." />

            <Section py="none">
                <h2 className="mb-6 text-xl font-bold tracking-tight">Daftar Guru</h2>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 md:gap-8">
                    {teachers.map((teacher) => (
                        <div key={teacher.slug} className="surface flex flex-col overflow-hidden">
                            <div className="relative aspect-4/5 w-full overflow-hidden">
                                <Image
                                    src={teacher.photo}
                                    alt={teacher.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-3 p-4">
                                <div>
                                    <p className="font-bold leading-snug text-sm">{teacher.name}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">{teacher.jabatan}</p>
                                </div>
                                <Button asChild size="sm" variant="outline" className="mt-auto w-full">
                                    <Link href={`/guru-karyawan/guru/${teacher.slug}`}>Lihat Profil</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Staf ── */}
            <Section py="none" className="pb-12">
                <h2 className="mb-6 text-xl font-bold tracking-tight">Daftar Staf</h2>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 md:gap-8">
                    {staffs.map((staff) => (
                        <div key={staff.slug} className="surface flex flex-col overflow-hidden">
                            <div className="relative aspect-4/5 w-full overflow-hidden">
                                <Image
                                    src={staff.photo}
                                    alt={staff.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            </div>
                            <div className="p-4">
                                <p className="font-bold leading-snug text-sm">{staff.name}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{staff.jabatan}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
