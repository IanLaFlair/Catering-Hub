'use client';

import React, { useTransition } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import ReviewModal from "./ReviewModal";
import { submitReview, createPayment, getPaymentMethods } from "@/app/pesanan/actions";

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

interface OrderCardProps {
    order: Order;
}

const statusConfig: Record<string, { label: string; colorClass: string }> = {
    PENDING: { label: "Menunggu Konfirmasi", colorClass: "bg-orange-100 text-orange-700" },
    CONFIRMED: { label: "Dikonfirmasi", colorClass: "bg-blue-100 text-blue-700" },
    PROCESSING: { label: "Diproses", colorClass: "bg-indigo-100 text-indigo-700" },
    COMPLETED: { label: "Selesai", colorClass: "bg-green-100 text-green-700" },
    CANCELLED: { label: "Dibatalkan", colorClass: "bg-red-100 text-red-700" },
};

export default function OrderCard({ order }: OrderCardProps) {
    const status = statusConfig[order.status] || { label: order.status, colorClass: "bg-gray-100 text-gray-700" };

    const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
    const [isReviewed, setIsReviewed] = React.useState(false);
    const [isPaying, startPayTransition] = useTransition();
    const [isLoadingMethods, startMethodTransition] = useTransition();
    const [payMethods, setPayMethods] = React.useState<Array<{ code: string; name: string; image: string; fee: string }> | null>(null);
    const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null);
    const [payError, setPayError] = React.useState<string | null>(null);

    const handleReviewSubmit = async (rating: number, text: string) => {
        await submitReview(order.id, rating, text);
        setIsReviewed(true);
        setIsReviewModalOpen(false);
    };

    const handleLoadMethods = () => {
        startMethodTransition(async () => {
            try {
                const result = await getPaymentMethods(order.id);
                setPayMethods(result);
            } catch (e) {
                setPayError(e instanceof Error ? e.message : 'Gagal memuat metode');
            }
        });
    };

    const handlePay = () => {
        if (!selectedMethod) return;
        setPayError(null);
        startPayTransition(async () => {
            try {
                const { paymentUrl } = await createPayment(order.id, selectedMethod);
                window.location.href = paymentUrl;
            } catch (e) {
                setPayError(e instanceof Error ? e.message : 'Gagal membuat pembayaran');
            }
        });
    };

    return (
        <div className="bg-white rounded-xl border border-[#f3ede7] p-5 lg:p-6 hover:shadow-soft transition-shadow">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-[#f3ede7]">
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-secondary">#{order.orderNumber}</span>
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
                        src={order.vendorImage ?? '/placeholder-vendor.jpg'}
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
                    {order.status === 'CONFIRMED' && (
                        <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
                            {payError && <p className="text-xs text-red-500">{payError}</p>}
                            {!payMethods ? (
                                <button
                                    onClick={handleLoadMethods}
                                    disabled={isLoadingMethods}
                                    className="flex-1 sm:flex-none flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm transition-colors disabled:opacity-60"
                                >
                                    {isLoadingMethods ? <Loader2 className="w-4 h-4 animate-spin" /> : '💳'}
                                    {isLoadingMethods ? 'Memuat...' : 'Bayar Sekarang'}
                                </button>
                            ) : (
                                <div className="w-full space-y-2">
                                    <div className="grid grid-cols-3 gap-1.5">
                                        {payMethods.map(m => (
                                            <button
                                                key={m.code}
                                                onClick={() => setSelectedMethod(m.code)}
                                                className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-[10px] font-medium transition-all ${
                                                    selectedMethod === m.code
                                                        ? 'border-primary bg-primary/5 text-primary'
                                                        : 'border-gray-200 text-gray-600'
                                                }`}
                                            >
                                                {m.image && <img src={m.image} alt={m.name} className="h-5 object-contain" />}
                                                <span className="text-center leading-tight line-clamp-1">{m.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={handlePay}
                                        disabled={!selectedMethod || isPaying}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-sm transition-colors disabled:opacity-60"
                                    >
                                        {isPaying ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                        {isPaying ? 'Memproses...' : selectedMethod ? '💳 Konfirmasi Bayar' : 'Pilih metode'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {order.status === 'COMPLETED' && (
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
                    {order.status === 'PENDING' && (
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
                vendorImage={order.vendorImage ?? '/placeholder-vendor.jpg'}
                orderNumber={order.orderNumber}
            />
        </div>
    );
}
