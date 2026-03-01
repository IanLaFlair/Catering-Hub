import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardLayoutClient from "./DashboardLayoutClient";

export default async function VendorDashboardLayout({ children }: { flexFlow?: never; children: React.ReactNode }) {
    const session = await auth();
    const user = session?.user as any;

    if (!user || (user.role !== "VENDOR" && user.role !== "UMKM")) {
        redirect("/login");
    }

    return (
        <DashboardLayoutClient user={user}>
            {children}
        </DashboardLayoutClient>
    );
}
