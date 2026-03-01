"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Settings, Store, X } from "lucide-react";

interface VendorSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { label: "Overview", href: "/vendor-dashboard", icon: LayoutDashboard },
    { label: "Pesanan Masuk", href: "/vendor-dashboard/orders", icon: ShoppingBag },
    { label: "Kelola Menu", href: "/vendor-dashboard/menus", icon: UtensilsCrossed },
    { label: "Profil Bisnis", href: "/vendor-dashboard/profile", icon: Settings },
];

export default function VendorSidebar({ isOpen, onClose }: VendorSidebarProps) {
    const pathname = usePathname();

    const sidebarClass = `fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#f3ede7] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`;

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <aside className={sidebarClass}>
                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-[#f3ede7]">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                            <div className="w-8 h-8 text-secondary">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-secondary text-xl font-bold leading-tight tracking-tight">CateringHub</h2>
                        </Link>
                        <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 lg:hidden">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 py-6 space-y-1.5">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => onClose()} // Close on mobile after click
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all group ${isActive
                                            ? "bg-primary text-white shadow-md shadow-orange-200"
                                            : "text-gray-600 hover:bg-orange-50 hover:text-primary"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-primary"}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Go to public site CTA */}
                    <div className="p-4 m-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <Store className="w-5 h-5 text-primary" />
                            </div>
                            <h4 className="font-bold text-sm text-[#1b140e]">Halaman Publik</h4>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">
                            Lihat bagaimana profil Anda tampil di mata pelanggan.
                        </p>
                        <Link
                            href="/"
                            className="block w-full py-2 text-center text-sm font-semibold text-primary bg-white border border-gray-200 rounded-lg shadow-sm hover:border-primary transition-colors"
                        >
                            Kunjungi Toko
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
