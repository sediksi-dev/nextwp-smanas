import { getTeachers } from "@/lib/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import PageHeading from "@/components/elements/page-heading";
import { TeacherCard } from "../_components/teacher-card";

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
                        <TeacherCard
                            key={teacher._ID}
                            teacher={teacher}
                            showProfile
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
