'use client';

import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import ReviewModal from '@/components/pesanan/ReviewModal';
import { createPayment, getPaymentMethods, submitReview } from '@/app/pesanan/actions';

interface PaymentMethod {
    code: string;
    name: string;
    image: string;
    fee: string;
}

interface Props {
    orderId: string;
    orderStatus: string;
    hasReview: boolean;
    vendorName: string;
    vendorImage: string | null;
    orderNumber: string;
}

export default function OrderDetailActions({ orderId, orderStatus, hasReview, vendorName, vendorImage, orderNumber }: Props) {
    const [isPaying, startPayTransition] = useTransition();
    const [isLoadingMethods, startMethodTransition] = useTransition();
    const [methods, setMethods] = useState<PaymentMethod[] | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [payError, setPayError] = useState<string | null>(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [reviewed, setReviewed] = useState(hasReview);

    const loadMethods = () => {
        startMethodTransition(async () => {
            try {
                const result = await getPaymentMethods(orderId);
                setMethods(result);
            } catch (e) {
                setPayError(e instanceof Error ? e.message : 'Gagal memuat metode pembayaran');
            }
        });
    };

    const handlePay = () => {
        if (!selectedMethod) return;
        setPayError(null);
        startPayTransition(async () => {
            try {
                const { paymentUrl } = await createPayment(orderId, selectedMethod);
                window.location.href = paymentUrl;
            } catch (e) {
                setPayError(e instanceof Error ? e.message : 'Gagal membuat pembayaran');
            }
        });
    };

    const handleReviewSubmit = async (rating: number, text: string) => {
        await submitReview(orderId, rating, text);
        setReviewed(true);
        setIsReviewOpen(false);
    };

    if (orderStatus === 'CONFIRMED') {
        return (
            <div className="bg-white rounded-2xl border border-[#f3ede7] p-6 space-y-4">
                <p className="text-sm text-gray-600">
                    Vendor telah mengkonfirmasi pesanan Anda. Silakan pilih metode pembayaran.
                </p>

                {payError && <p className="text-sm text-red-500">{payError}</p>}

                {!methods ? (
                    <button
                        onClick={loadMethods}
                        disabled={isLoadingMethods}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors disabled:opacity-60"
                    >
                        {isLoadingMethods ? <Loader2 className="w-5 h-5 animate-spin" /> : '💳'}
                        {isLoadingMethods ? 'Memuat...' : 'Pilih Metode Pembayaran'}
                    </button>
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {methods.map((m) => (
                                <button
                                    key={m.code}
                                    onClick={() => setSelectedMethod(m.code)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-xs font-medium transition-all ${
                                        selectedMethod === m.code
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                    }`}
                                >
                                    {m.image && (
                                        <img src={m.image} alt={m.name} className="h-6 object-contain" />
                                    )}
                                    <span className="text-center leading-tight">{m.name}</span>
                                    {m.fee && m.fee !== '0' && (
                                        <span className="text-[10px] text-gray-400">+Rp {parseInt(m.fee).toLocaleString('id-ID')}</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handlePay}
                            disabled={!selectedMethod || isPaying}
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors disabled:opacity-60"
                        >
                            {isPaying ? <Loader2 className="w-5 h-5 animate-spin" /> : '💳'}
                            {isPaying ? 'Memproses...' : selectedMethod ? 'Bayar Sekarang' : 'Pilih metode dulu'}
                        </button>
                    </>
                )}
            </div>
        );
    }

    if (orderStatus === 'COMPLETED') {
        return (
            <>
                <div className="bg-white rounded-2xl border border-[#f3ede7] p-6">
                    {reviewed ? (
                        <div className="text-center py-2">
                            <p className="text-green-600 font-semibold">Ulasan sudah diberikan. Terima kasih!</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-gray-600 mb-4">Pesanan telah selesai. Bagaimana pengalaman Anda?</p>
                            <button
                                onClick={() => setIsReviewOpen(true)}
                                className="w-full py-3.5 border-2 border-primary text-primary hover:bg-primary/5 font-bold rounded-xl transition-colors"
                            >
                                Beri Ulasan
                            </button>
                        </>
                    )}
                </div>
                <ReviewModal
                    isOpen={isReviewOpen}
                    onClose={() => setIsReviewOpen(false)}
                    onSubmit={handleReviewSubmit}
                    vendorName={vendorName}
                    vendorImage={vendorImage ?? '/placeholder-vendor.jpg'}
                    orderNumber={orderNumber}
                />
            </>
        );
    }

    if (orderStatus === 'PENDING') {
        return (
            <div className="bg-white rounded-2xl border border-[#f3ede7] p-6">
                <p className="text-sm text-gray-500 mb-4">
                    Pesanan sedang menunggu konfirmasi dari vendor.
                </p>
                <button className="w-full py-3.5 border border-red-200 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition-colors">
                    Batalkan Pesanan
                </button>
            </div>
        );
    }

    return null;
}
