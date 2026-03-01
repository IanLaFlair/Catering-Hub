"use client";

import { useState } from "react";
import VendorSidebar from "@/components/vendor-dashboard/VendorSidebar";
import VendorTopbar from "@/components/vendor-dashboard/VendorTopbar";
import { User } from "next-auth";

interface DashboardLayoutClientProps {
    children: React.ReactNode;
    user: User & { role?: string };
}

export default function DashboardLayoutClient({ children, user }: DashboardLayoutClientProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#faf8f6] overflow-hidden">
            <VendorSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Mobile menu toggle inside Topbar */}
                <VendorTopbar
                    user={user}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-5 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
