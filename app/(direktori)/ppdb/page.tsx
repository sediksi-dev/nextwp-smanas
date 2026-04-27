import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import PageHeading from "@/components/elements/page-heading";
import { getPpdbById, getPpdbList, getSiteConfig } from "@/lib/wordpress";
import { PpdbEmptyState } from "./_components/ppdb-empty-state";

export const metadata: Metadata = {
    title: "PPDB | SMA Nasional Malang",
    description: "Informasi Penerimaan Peserta Didik Baru (PPDB) SMA Nasional Malang.",
};

export default async function PpdbPage() {
    const config = await getSiteConfig();
    const ACTIVE_PPDB_ID: number | null = Number(config?.ppdb?.active_ppdb || null);
    const [active, allList] = await Promise.all([
        ACTIVE_PPDB_ID ? getPpdbById(ACTIVE_PPDB_ID) : Promise.resolve(null),
        getPpdbList(50),
    ]);


    const previousList = allList.filter((p) => p.id !== ACTIVE_PPDB_ID);

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "PPDB" }]}>
            <PageHeading
                title="PPDB SMA Nasional Malang"
                subtitle="Penerimaan Peserta Didik Baru"
                description="Informasi Penerimaan Peserta Didik Baru SMA Nasional Malang."
            />
            <Section py="sm">

                {active ? (
                    <div className="mt-8 flex flex-col gap-6 max-w-3xl mx-auto">
                        {active.meta.flyer && (
                            // <div className="relative w-full h-125 overflow-hidden rounded-2xl border border-border shadow-site p-2 md:p-4 lg:p-1">
                            <div className="relative w-full h-125 overflow-hidden rounded-2xl border border-border shadow-site p-2 md:p-4 lg:p-8">
                                <Image
                                    src={active.meta.flyer}
                                    alt={"Flyer PPDB " + active.meta.year_open}
                                    fill
                                    className="object-contain object-center b"
                                    sizes="(max-width: 768px) 100vw, 672px"
                                    priority
                                />
                            </div>
                        )}
                        <div>
                            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">
                                {"Tahun Ajaran " + active.meta.year_open + "/" + (Number(active.meta.year_open) + 1)}
                            </p>
                            <h2
                                className="text-2xl md:text-3xl font-extrabold text-foreground leading-snug"
                                dangerouslySetInnerHTML={{ __html: active.title.rendered }}
                            />
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href={"/ppdb/" + active.slug}>
                                    Lihat Detail &amp; Persyaratan
                                </Link>
                            </Button>
                            {active.meta.admission_results && (
                                <Button asChild variant="outline">
                                    <Link href={"/ppdb/" + active.slug + "/hasil"}>
                                        Hasil Seleksi
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <PpdbEmptyState />
                )}

                {previousList.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-border max-w-2xl mx-auto">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4">
                            Arsip PPDB Tahun Sebelumnya
                        </h3>
                        <ul className="flex flex-col divide-y divide-border">
                            {previousList.map((p) => (
                                <li key={p.id} className="py-3 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-xs text-muted-foreground block mb-0.5">
                                            {"TA " + p.meta.year_open + "/" + (Number(p.meta.year_open) + 1)}
                                        </span>
                                        <span
                                            className="text-sm font-semibold text-foreground"
                                            dangerouslySetInnerHTML={{ __html: p.title.rendered }}
                                        />
                                    </div>
                                    <Link
                                        href={"/ppdb/" + p.slug}
                                        className="text-xs font-semibold text-site-primary hover:underline whitespace-nowrap shrink-0"
                                    >
                                        Lihat &rarr;
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Section>
        </PageWrap>
    );
}
