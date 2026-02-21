import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ReviewModal from "./ReviewModal";

interface Order {
    id: string;
    number: string;
    vendorName: string;
    vendorImage: string;
    eventType: string;
    eventDate: string;
    status: string;
    totalAmount: number;
    itemsSummary: string;
}

interface OrderCardProps {
    order: Order;
}

const statusConfig: Record<string, { label: string; colorClass: string }> = {
    menunggu_konfirmasi: { label: "Menunggu Konfirmasi", colorClass: "bg-orange-100 text-orange-700" },
    diproses: { label: "Diproses", colorClass: "bg-blue-100 text-blue-700" },
    selesai: { label: "Selesai", colorClass: "bg-green-100 text-green-700" },
    dibatalkan: { label: "Dibatalkan", colorClass: "bg-red-100 text-red-700" },
};

export default function OrderCard({ order }: OrderCardProps) {
    const status = statusConfig[order.status] || { label: order.status, colorClass: "bg-gray-100 text-gray-700" };

    // Using local state to mock review submission for now
    const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
    const [isReviewed, setIsReviewed] = React.useState(false);

    const handleReviewSubmit = (rating: number, text: string) => {
        // In a real app, this would be an API call
        console.log(`Submitting review for order ${order.id}:`, { rating, text });
        setIsReviewed(true);
        setIsReviewModalOpen(false);
    };

    return (
        <div className="bg-white rounded-xl border border-[#f3ede7] p-5 lg:p-6 hover:shadow-soft transition-shadow">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[#f3ede7]">
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-secondary">{order.number}</span>
                    <span className="text-gray-400 text-sm hidden sm:inline">•</span>
                    <span className="text-sm text-gray-500">
                        {format(new Date(), "dd MMM yyyy", { locale: id })}
                    </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.colorClass}`}>
                    {status.label}
                </span>
            </div>

            {/* Body */}
            <div className="flex gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <img
                        src={order.vendorImage}
                        alt={order.vendorName}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#1b140e] text-lg sm:text-xl truncate mb-1">
                        {order.vendorName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 truncate">
                        {order.itemsSummary}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {format(new Date(order.eventDate), "dd MMM yyyy", { locale: id })}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {order.eventType}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-4 border-t border-[#f3ede7] flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-gray-500 mb-0.5">Total Belanja</p>
                    <p className="font-bold text-[#1b140e]">
                        Rp {order.totalAmount.toLocaleString('id-ID')}
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    {order.status === 'selesai' && (
                        isReviewed ? (
                            <button disabled className="flex-1 sm:flex-none px-4 py-2 border border-green-200 bg-green-50 text-green-700 font-semibold rounded-lg text-sm cursor-default">
                                Ulasan Terkirim
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsReviewModalOpen(true)}
                                className="flex-1 sm:flex-none px-4 py-2 border border-primary text-primary hover:bg-primary/5 font-semibold rounded-lg text-sm transition-colors"
                            >
                                Beri Ulasan
                            </button>
                        )
                    )}
                    {order.status === 'menunggu_konfirmasi' && (
                        <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg text-sm transition-colors">
                            Batalkan
                        </button>
                    )}
                    <Link
                        href={`/pesanan/${order.id}`}
                        className="flex-1 sm:flex-none px-4 py-2 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg text-sm transition-colors text-center"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>

            <ReviewModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}
                vendorName={order.vendorName}
                vendorImage={order.vendorImage}
                orderNumber={order.number}
            />
        </div>
    );
}
