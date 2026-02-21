"use client";

import { useState } from "react";
import OrderCard from "@/components/pesanan/OrderCard";
import { Search } from "lucide-react";

// Mock Data
const MOCK_ORDERS = [
    {
        id: "ORD-20260217-001",
        number: "#ORD-20260217-001",
        vendorName: "Sari Rasa Catering",
        vendorImage: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop",
        eventType: "Pernikahan",
        eventDate: "2026-03-15T09:00:00Z",
        status: "menunggu_konfirmasi",
        totalAmount: 7665000,
        itemsSummary: "Paket Prasmanan Mewah + 1 Menu Tambahan",
    },
    {
        id: "ORD-20260210-023",
        number: "#ORD-20260210-023",
        vendorName: "Bumbu Desa Nusantara",
        vendorImage: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop",
        eventType: "Syukuran",
        eventDate: "2026-02-28T12:00:00Z",
        status: "diproses",
        totalAmount: 2500000,
        itemsSummary: "Nasi Tumpeng Kuning + Aneka Lauk Pauk",
    },
    {
        id: "ORD-20260115-088",
        number: "#ORD-20260115-088",
        vendorName: "Dapur Citra Manggala",
        vendorImage: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop",
        eventType: "Ulang Tahun",
        eventDate: "2026-02-05T15:00:00Z",
        status: "selesai",
        totalAmount: 3200000,
        itemsSummary: "Paket Nasi Kuning Box + Aneka Snack",
    },
    {
        id: "ORD-20251220-105",
        number: "#ORD-20251220-105",
        vendorName: "Warung Spesial Sambal",
        vendorImage: "https://images.unsplash.com/photo-1588147775071-799ff25d2b1f?w=800&auto=format&fit=crop",
        eventType: "Makan Keluarga",
        eventDate: "2025-12-25T19:00:00Z",
        status: "dibatalkan",
        totalAmount: 850000,
        itemsSummary: "Paket Spesial Nasi Liwet",
    }
];

const TABS = [
    { id: "semua", label: "Semua" },
    { id: "menunggu_konfirmasi", label: "Menunggu Konfirmasi" },
    { id: "diproses", label: "Diproses" },
    { id: "dikirim", label: "Dikirim" },
    { id: "selesai", label: "Selesai" },
    { id: "dibatalkan", label: "Dibatalkan" },
];

export default function OrderHistoryPage() {
    const [activeTab, setActiveTab] = useState("semua");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredOrders = MOCK_ORDERS.filter(order => {
        const matchesTab = activeTab === "semua" || order.status === activeTab;
        const matchesSearch =
            order.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.number.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#fcfaf8] py-8 lg:py-12">
            <div className="max-w-5xl mx-auto px-5">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-[#1b140e] mb-2 text-center lg:text-left">
                        Riwayat Pesanan
                    </h1>
                    <p className="text-gray-600 text-center lg:text-left">
                        Lacak status pesanan catering Anda
                    </p>
                </div>

                {/* Filters and Tabs Area */}
                <div className="bg-white rounded-xl shadow-sm border border-[#f3ede7] mb-8 overflow-hidden sticky top-20 z-10">
                    {/* Tabs (Scrollable on Mobile) */}
                    <div className="flex overflow-x-auto hide-scrollbar border-b border-[#f3ede7]">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                                        ? "border-primary text-primary"
                                        : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="p-4 bg-gray-50/50">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari nama vendor atau id pesanan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4 lg:space-y-5">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))
                    ) : (
                        <div className="bg-white rounded-xl border border-[#f3ede7] p-12 text-center">
                            <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Tidak ada pesanan ditemukan
                            </h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                Kami tidak dapat menemukan pesanan yang sesuai dengan filter atau pencarian Anda.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
