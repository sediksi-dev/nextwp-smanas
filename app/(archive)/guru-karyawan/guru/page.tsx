import Image from "next/image";
import Link from "next/link";
import { getTeachers } from "@/lib/wordpress";
import { Button } from "@/components/ui/button";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import PageHeading from "@/components/elements/page-heading";

export default async function GuruPage() {
    const teachers = await getTeachers("guru");

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "Guru & Karyawan", href: "/guru-karyawan" },
                { label: "Guru" },
            ]}
        >
            <PageHeading
                title="Daftar Guru"
                description="Tenaga pendidik SMA Nasional Malang yang berdedikasi."
            />
            <Section py="none" className="pb-12">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {teachers.map((teacher) => (
                        <div key={teacher._ID} className="surface flex flex-col overflow-hidden">
                            <div className="relative aspect-4/5 w-full overflow-hidden">
                                <Image
                                    src={teacher.photo || "/assets/placeholder.jpg"}
                                    alt={teacher.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-3 p-4">
                                <div>
                                    <p className="font-bold leading-snug text-sm">{teacher.name}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">{teacher.role}</p>
                                </div>
                                <Button asChild size="sm" variant="outline" className="mt-auto w-full">
                                    <Link href={`/guru-karyawan/guru/${teacher._ID}`}>Lihat Profil</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
