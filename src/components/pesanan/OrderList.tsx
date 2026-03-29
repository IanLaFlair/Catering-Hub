'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import OrderCard from './OrderCard';

const TABS = [
    { id: 'semua', label: 'Semua' },
    { id: 'PENDING', label: 'Menunggu Konfirmasi' },
    { id: 'CONFIRMED', label: 'Dikonfirmasi' },
    { id: 'PROCESSING', label: 'Diproses' },
    { id: 'COMPLETED', label: 'Selesai' },
    { id: 'CANCELLED', label: 'Dibatalkan' },
];

interface Order {
    id: string;
    orderNumber: string;
    vendorName: string;
    vendorImage: string | null;
    eventType: string;
    eventDate: string;
    status: string;
    totalAmount: number;
    itemsSummary: string;
}

export default function OrderList({ orders }: { orders: Order[] }) {
    const [activeTab, setActiveTab] = useState('semua');
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = orders.filter((o) => {
        const matchesTab = activeTab === 'semua' || o.status === activeTab;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
            o.vendorName.toLowerCase().includes(q) ||
            o.orderNumber.toLowerCase().includes(q);
        return matchesTab && matchesSearch;
    });

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-[#f3ede7] mb-8 overflow-hidden sticky top-20 z-10">
                <div className="flex overflow-x-auto hide-scrollbar border-b border-[#f3ede7]">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

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

            <div className="space-y-4 lg:space-y-5">
                {filtered.length > 0 ? (
                    filtered.map((order) => <OrderCard key={order.id} order={order} />)
                ) : (
                    <div className="bg-white rounded-xl border border-[#f3ede7] p-12 text-center">
                        <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {orders.length === 0 ? 'Belum ada pesanan' : 'Tidak ada pesanan ditemukan'}
                        </h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            {orders.length === 0
                                ? 'Yuk mulai pesan catering untuk acara Anda!'
                                : 'Coba ubah filter atau kata kunci pencarian.'}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
