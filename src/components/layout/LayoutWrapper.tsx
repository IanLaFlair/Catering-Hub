"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function LayoutWrapper({ children, navbar, footer }: { children: React.ReactNode, navbar: React.ReactNode, footer: React.ReactNode }) {
    const pathname = usePathname();
    const isVendorDashboard = pathname?.startsWith("/vendor-dashboard");

    if (isVendorDashboard) {
        return <main>{children}</main>;
    }

    return (
        <Suspense fallback={null}>
            {navbar}
            <main className="pt-20">{children}</main>
            {footer}
        </Suspense>
    );
}
