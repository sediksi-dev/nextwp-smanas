import { mockTeachers } from "@/lib/mock-data";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function StafPage() {
    const staffs = mockTeachers.filter((item) => item.role.toLowerCase().includes("staf"));

    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "Guru & Karyawan", href: "/guru-karyawan" },
                        { label: "Staf" },
                    ]}
                />
            </div>

            <section className="container grid-3">
                {staffs.map((staff) => (
                    <Card key={staff.name}>
                        <CardHeader>
                            <CardTitle className="text-base">{staff.name}</CardTitle>
                            <CardDescription>{staff.role}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </section>
        </main>
    );
}
