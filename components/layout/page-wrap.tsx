import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/breadcrumb";

type BreadcrumbItem = { label: string; href?: string };

interface PageWrapProps {
    children: React.ReactNode;
    className?: string;
    /** Pass an array of items to show breadcrumb. Omit or pass undefined to hide it (e.g. homepage). */
    breadcrumb?: BreadcrumbItem[];
}

export function PageWrap({ children, className, breadcrumb }: PageWrapProps) {
    return (
        <main className={cn("flex flex-1 flex-col gap-4 py-5 px-5", className)}>
            {breadcrumb && (
                <div className="container">
                    <Breadcrumb items={breadcrumb} />
                </div>
            )}
            {children}
        </main>
    );
}
