import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { PageWrap } from "@/components/layout/page-wrap";
import { getPpdbById, getPpdbList } from "@/lib/wordpress";

export const metadata = {
    title: "PPDB | SMA Nasional Malang",
    description: "Informasi Penerimaan Peserta Didik Baru (PPDB) SMA Nasional Malang.",
};
const ACTIVE_PPDB_ID: number | null = null;

export default async function PpdbPage() {
    const [active, allList] = await Promise.all([
        ACTIVE_PPDB_ID ? getPpdbById(ACTIVE_PPDB_ID) : Promise.resolve(null),
        getPpdbList(50),
    ]);

    const previousList = allList.filter((p) => p.id !== ACTIVE_PPDB_ID);

    return (
        <PageWrap breadcrumb={[{ label: "Beranda", href: "/" }, { label: "PPDB" }]}>
            <Section py="sm">
                <div className="flex items-center gap-2 mb-3 max-w-3xl mx-auto">
                    <span className="block w-5 h-0.5 bg-site-accent" />
                    <p className="text-xs font-bold tracking-widest uppercase text-site-primary">
                        Penerimaan Peserta Didik Baru
                    </p>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight max-w-3xl mx-auto">
                    PPDB SMA Nasional Malang
                </h1>

                {active ? (
                    <div className="mt-8 flex flex-col gap-6 max-w-3xl mx-auto">
                        {active.meta.flyer && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-site">
                                <Image
                                    src={active.meta.flyer}
                                    alt={"Flyer PPDB " + active.meta.year_open}
                                    fill
                                    className="object-cover"
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
                    <div className="mt-8 surface rounded-2xl p-10 flex flex-col items-center gap-4 text-center max-w-3xl mx-auto">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-muted-foreground/50" aria-hidden>
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                            <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                        </svg>
                        <div>
                            <p className="font-bold text-foreground text-lg">Belum Ada Pendaftaran Dibuka</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Saat ini tidak ada pembukaan pendaftaran peserta didik baru yang sedang berlangsung.
                                Pantau terus halaman ini untuk informasi terbaru.
                            </p>
                        </div>
                    </div>
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
