import Image from "next/image";
import Link from "next/link";
import type { WpTeacher } from "@/types/wordpress";
import { Button } from "@/components/ui/button";

interface TeacherCardProps {
    teacher: WpTeacher;
    showProfile?: boolean;
    sizes?: string;
}

export function TeacherCard({
    teacher,
    showProfile = false,
    sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: TeacherCardProps) {
    return (
        <div className="surface flex flex-col overflow-hidden">
            <div className="relative aspect-4/5 w-full overflow-hidden">
                <Image
                    src={teacher.photo || "/assets/placeholder.jpg"}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                    sizes={sizes}
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
    );
}
