import Image from "next/image";
import Link from "next/link";
import { mockTeachers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";

export default function GuruPage() {
    const teachers = mockTeachers
        .filter((item) => item.type === "guru")
        .sort((a, b) => a.order - b.order);

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Guru & Karyawan", href: "/guru-karyawan" }, { label: "Guru" }]}>
            <Section py="sm">
                <h1 className="section-title">Daftar Guru</h1>
                <p className="section-copy">Tenaga pendidik SMA Nasional Malang yang berdedikasi.</p>
            </Section>
            <Section py="none">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {teachers.map((teacher) => (
                        <div
                            key={teacher.slug}
                            className="surface flex flex-col overflow-hidden"
                        >
                            <div className="relative aspect-4/5 w-full overflow-hidden">
                                <Image
                                    src={teacher.photo}
                                    alt={teacher.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
        </PageWrap>
    );
}
