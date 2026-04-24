import Link from "next/link";
import { footerGroups } from "@/lib/site";

export function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <section>
                        <h4>SMA Nasional Malang</h4>
                        <p className="section-copy">
                            Website resmi untuk informasi PPDB, akademik, prestasi, dan kabar terbaru.
                        </p>
                    </section>

                    {footerGroups.map((group) => (
                        <section key={group.title}>
                            <h4>{group.title}</h4>
                            <ul>
                                {group.links.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
                <p className="footer-note">© {new Date().getFullYear()} SMA Nasional Malang.</p>
            </div>
        </footer>
    );
}
