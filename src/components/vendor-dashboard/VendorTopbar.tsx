"use client";

import { Menu, LogOut, Bell } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

interface VendorTopbarProps {
    onMenuClick: () => void;
    user: User & { role?: string };
}

export default function VendorTopbar({ onMenuClick, user }: VendorTopbarProps) {
    return (
        <header className="sticky top-0 z-30 bg-white border-b border-[#f3ede7] h-20 flex items-center justify-between px-5 md:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-lg md:text-xl font-bold text-[#1b140e] hidden sm:block">
                    Dashboard {user.role === 'UMKM' ? 'UMKM' : 'Vendor'}
                </h1>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-bold text-[#1b140e]">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role?.toLowerCase()}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                </div>
            </div>
        </header>
    );
}
