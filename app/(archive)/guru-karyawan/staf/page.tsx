import Image from "next/image";
import { getTeachers } from "@/lib/wordpress";
import { PageWrap } from "@/components/layout/page-wrap";
import { Section } from "@/components/layout/section";
import PageHeading from "@/components/elements/page-heading";

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
                        <div key={member._ID} className="surface flex flex-col overflow-hidden">
                            <div className="relative aspect-4/5 w-full overflow-hidden">
                                <Image
                                    src={member.photo || "/assets/placeholder.jpg"}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                />
                            </div>
                            <div className="p-4">
                                <p className="font-bold leading-snug text-sm">{member.name}</p>
                                <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </PageWrap>
    );
}
