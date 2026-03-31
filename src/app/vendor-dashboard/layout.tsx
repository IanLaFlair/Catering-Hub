import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardLayoutClient from "./DashboardLayoutClient";

export default async function VendorDashboardLayout({ children }: { flexFlow?: never; children: React.ReactNode }) {
    const session = await auth();
    const user = session?.user as any;

    if (!user || (user.role !== "VENDOR" && user.role !== "UMKM")) {
        redirect("/login");
    }

    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId: user.id },
        select: { slug: true },
    });

    return (
        <DashboardLayoutClient user={user} vendorSlug={vendorProfile?.slug ?? null}>
            {children}
        </DashboardLayoutClient>
    );
}
