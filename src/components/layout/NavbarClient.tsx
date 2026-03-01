"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import UserMenu from "./UserMenu";

interface NavbarClientProps {
    user?: User & { role?: string };
}

const navLinks = [
    { label: "Cari Catering", href: "/cari" },
    { label: "Untuk Vendor", href: "/vendor" },
    { label: "Untuk UMKM", href: "/umkm" },
    { label: "Tentang Kami", href: "/tentang" },
];

export default function NavbarClient({ user }: NavbarClientProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-[100] w-full bg-white border-b border-[#f3ede7]">
            <nav className="max-w-[1440px] mx-auto px-5 md:px-10">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <div className="w-8 h-8 text-secondary">
                            <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                            </svg>
                        </div>
                        <h2 className="text-secondary text-xl font-bold leading-tight tracking-tight">CateringHub</h2>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[#1b140e] hover:text-primary transition-colors text-sm font-semibold"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons / User Menu */}
                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <UserMenu user={user} />
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg border border-secondary text-secondary hover:bg-secondary/5 transition-colors text-sm font-bold"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex h-10 px-5 items-center justify-center rounded-lg bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold shadow-md shadow-orange-200"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileOpen && (
                    <div className="lg:hidden absolute top-[80px] left-0 w-full bg-white shadow-xl border-b border-gray-100 z-50 animate-fade-in">
                        <div className="flex flex-col gap-1 p-5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:text-primary hover:bg-primary-light transition-all duration-200"
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="my-2 border-gray-100" />

                            {user ? (
                                <div className="px-4 py-2 flex flex-col gap-2">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                            {user.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    {(user.role === 'VENDOR' || user.role === 'UMKM') && (
                                        <Link
                                            href="/vendor-dashboard"
                                            className="py-2 text-sm font-medium text-gray-600 hover:text-primary"
                                            onClick={() => setIsMobileOpen(false)}
                                        >
                                            Dashboard Toko
                                        </Link>
                                    )}
                                    {(!user.role || user.role === 'CUSTOMER') && (
                                        <Link
                                            href="/pesanan"
                                            className="py-2 text-sm font-medium text-gray-600 hover:text-primary"
                                            onClick={() => setIsMobileOpen(false)}
                                        >
                                            Riwayat Pesanan
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="w-full text-left py-2 text-sm font-medium text-red-600 hover:text-red-700"
                                    >
                                        Keluar
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 px-4 pt-2 pb-4">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMobileOpen(false)}
                                        className="w-full py-2.5 text-center text-sm font-semibold text-secondary border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-all"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsMobileOpen(false)}
                                        className="w-full py-2.5 text-center text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-all"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
