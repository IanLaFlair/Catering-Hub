"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isVendorDashboard = pathname?.startsWith("/vendor-dashboard");

    if (isVendorDashboard) {
        return <main>{children}</main>;
    }

    return (
        <>
            <Navbar />
            <main className="pt-20">{children}</main>
            <Footer />
        </>
    );
}
