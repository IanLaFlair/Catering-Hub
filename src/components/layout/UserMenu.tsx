"use client";

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { LogOut, User as UserIcon, LayoutDashboard, ChevronDown, ClipboardList } from "lucide-react";

interface UserMenuProps {
    user: User & { role?: string };
}

export default function UserMenu({ user }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
            >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block max-w-[100px] truncate">
                    {user.name}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in z-50">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    {(user.role === 'VENDOR' || user.role === 'UMKM') && (
                        <Link
                            href="/vendor-dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard Toko
                        </Link>
                    )}

                    {(!user.role || user.role === 'CUSTOMER') && (
                        <Link
                            href="/pesanan"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <ClipboardList className="w-4 h-4" />
                            Riwayat Pesanan
                        </Link>
                    )}

                    <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        <UserIcon className="w-4 h-4" />
                        Profil Saya
                    </Link>

                    <div className="border-t border-gray-50 mt-1 pt-1">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Keluar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
