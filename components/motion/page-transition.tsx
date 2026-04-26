"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps page content with a smooth fade+slide-up entrance animation
 * on every route change. Drop inside the root layout around {children}.
 */
export function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
