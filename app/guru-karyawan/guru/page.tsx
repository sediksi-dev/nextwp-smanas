import { mockTeachers } from "@/lib/mock-data";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function GuruPage() {
    const teachers = mockTeachers.filter((item) => item.role.toLowerCase().includes("guru"));

    return (
        <main className="page-wrap">
            <div className="container">
                <Breadcrumb
                    items={[
                        { label: "Beranda", href: "/" },
                        { label: "Guru & Karyawan", href: "/guru-karyawan" },
                        { label: "Guru" },
                    ]}
                />
            </div>

            <section className="container grid-3">
                {teachers.map((teacher) => (
                    <Card key={teacher.name}>
                        <CardHeader>
                            <CardTitle className="text-base">{teacher.name}</CardTitle>
                            <CardDescription>{teacher.role}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </section>
        </main>
    );
}
