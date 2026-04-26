import Image from "next/image";
import Link from "next/link";
import { getTeachers } from "@/lib/wordpress";
import type { WpTeacher, TeacherCategory } from "@/types/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import PageHeading from "@/components/elements/page-heading";
import { Button } from "@/components/ui/button";

const CATEGORY_LABELS: Record<TeacherCategory, string> = {
    kepsek: "Kepala Sekolah",
    wakasek: "Wakil Kepala Sekolah",
    guru: "Daftar Guru",
    staf: "Tenaga Kependidikan",
};

const CATEGORY_ORDER: TeacherCategory[] = ["kepsek", "wakasek", "guru", "staf"];
const HAS_PROFILE = new Set<TeacherCategory>(["kepsek", "wakasek", "guru"]);

export default async function GuruKaryawanPage() {
    const allTeachers = await getTeachers();

    const grouped = CATEGORY_ORDER.reduce(
        (acc, cat) => ({ ...acc, [cat]: [] as WpTeacher[] }),
        {} as Record<TeacherCategory, WpTeacher[]>,
    );
    for (const t of allTeachers) {
        grouped[t.category]?.push(t);
    }

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Guru & Karyawan" }]}>
            <PageHeading
                title="Guru & Karyawan"
                description="Tenaga pendidik dan kependidikan SMA Nasional Malang."
            />

            {CATEGORY_ORDER.map((cat, idx) => {
                const teachers = grouped[cat];
                if (!teachers || teachers.length === 0) return null;
                const isLast = idx === CATEGORY_ORDER.length - 1;
                const colClass =
                    cat === "kepsek"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
                const showProfile = HAS_PROFILE.has(cat);

                return (
                    <Section key={cat} py="none" className={isLast ? "pb-12" : undefined}>
                        <h2 className="mb-6 text-xl font-bold tracking-tight">{CATEGORY_LABELS[cat]}</h2>
                        <div className={`grid gap-6 md:gap-8 ${colClass}`}>
                            {teachers.map((teacher) => (
                                <div key={teacher._ID} className="surface flex flex-col overflow-hidden">
                                    <div className="relative aspect-4/5 w-full overflow-hidden">
                                        <Image
                                            src={teacher.photo || "/assets/placeholder.jpg"}
                                            alt={teacher.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3 p-4">
                                        <div>
                                            <p className="font-bold leading-snug text-sm">{teacher.name}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">{teacher.role}</p>
                                        </div>
                                        {showProfile && (
                                            <Button asChild size="sm" variant="outline" className="mt-auto w-full">
                                                <Link href={`/guru-karyawan/guru/${teacher._ID}`}>Lihat Profil</Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                );
            })}
        </PageWrap>
    );
}
