"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
} from "../ui/drawer";
import { type NavItem } from "@/lib/site.d";
import { ScrollArea } from "../ui/scroll-area";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "../ui/separator";

export function HeaderNavMobile({ navItems }: { navItems: NavItem[] }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex items-center justify-end gap-2 md:hidden">
            <Drawer open={mobileOpen} onOpenChange={setMobileOpen} direction="right" modal>
                <DrawerContent className="flex h-full w-full flex-col bg-site-bg rounded-none">
                    <DrawerHeader>
                        <DialogTitle className="text-lg font-bold text-left">Menu Navigasi</DialogTitle>
                    </DrawerHeader>
                    <ScrollArea className="h-[calc(100vh-8rem)] w-full container">
                        <nav className="flex flex-col gap-4 py-2">
                            {navItems.map((item, index) => (
                                <div key={item.label} className="flex flex-col">
                                    {
                                        item.href ? (
                                            <Link
                                                href={item.href}
                                                className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground">
                                                {item.label}
                                            </span>
                                        )
                                    }
                                    {item.children && (
                                        <>
                                            <Separator className="my-1" />
                                            <div className="ml-3 flex flex-col gap-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        className="block rounded-lg px-3 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-200"
                                                        onClick={() => setMobileOpen(false)}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {index < navItems.length - 1 && <Separator className="mt-2" />}
                                </div>
                            ))}
                        </nav>
                    </ScrollArea>
                    <DrawerFooter className="mt-auto p-4">
                        <Button variant="accent" size="lg" asChild>
                            <Link href="/ppdb">Info PPDB</Link>
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="ghost" aria-label="Tutup menu" size="lg">
                                Tutup
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>


            <Button
                variant="ghost"
                size={"icon"}
                aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((prev) => !prev)}
            >
                <Menu />
            </Button>
        </div>
    );
}
