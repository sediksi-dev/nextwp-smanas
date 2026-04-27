import { getTeachers } from "@/lib/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import PageHeading from "@/components/elements/page-heading";
import { TeacherCard } from "../_components/teacher-card";

export default async function StafPage() {
    const staff = await getTeachers("staf");

    return (
        <PageWrap
            breadcrumb={[
                { label: "Beranda", href: "/" },
                { label: "Guru & Karyawan", href: "/guru-karyawan" },
                { label: "Staf" },
            ]}
        >
            <PageHeading
                title="Tenaga Kependidikan"
                description="Tenaga kependidikan SMA Nasional Malang yang berdedikasi."
            />
            <Section py="none" className="pb-12">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {staff.map((member) => (
                        <TeacherCard
                            key={member._ID}
                            teacher={member}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
