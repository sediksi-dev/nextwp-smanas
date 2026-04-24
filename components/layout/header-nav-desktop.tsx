import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { type NavItem } from "@/lib/site.d";
import Link from "next/link";

export function HeaderNavDesktop({ navItems }: { navItems: NavItem[] }) {
    return (
        <div className="hidden items-center gap-2 md:flex">
            <NavigationMenu>
                <NavigationMenuList>
                    {navItems.map((item) => (
                        <NavigationMenuItem key={item.label}>
                            {item.children ? (
                                <>
                                    <NavigationMenuTrigger>
                                        {
                                            item.href ? (
                                                <NavigationMenuLink
                                                    href={item.href}
                                                    className="block px-4 py-2 rounded-lg hover:bg-muted"
                                                >
                                                    {item.label}
                                                </NavigationMenuLink>
                                            ) : (
                                                <span className="block px-4 py-2 rounded-lg hover:bg-muted">
                                                    {item.label}
                                                </span>
                                            )
                                        }
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="p-2">
                                            {item.children.map((child) => (
                                                <li key={child.href}>
                                                    <NavigationMenuLink
                                                        href={child.href}
                                                        className="block px-4 py-2 rounded-lg hover:bg-muted"
                                                    >
                                                        {child.label}
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </>
                            ) : (
                                <NavigationMenuLink
                                    href={item.href!}
                                    className="block px-4 py-2 rounded-lg hover:bg-muted"
                                >
                                    {item.label}
                                </NavigationMenuLink>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <Button variant="accent" asChild>
                <Link href="/ppdb">Info PPDB</Link>
            </Button>
        </div>
    );
}
