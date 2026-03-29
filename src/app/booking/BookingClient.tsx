'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import BookingStepper from '@/components/booking/BookingStepper';
import MenuStep from '@/components/booking/MenuStep';
import DetailStep from '@/components/booking/DetailStep';
import ConfirmStep from '@/components/booking/ConfirmStep';
import { createOrder } from './actions';

export interface VendorMenu {
    id: string;
    name: string;
    category: string;
    description: string;
    items: string[];
    pricePerPax: number;
    minOrderPax: number;
    image: string | null;
}

export interface Vendor {
    id: string;
    slug: string;
    businessName: string;
    city: string;
    rating: number;
    menus: VendorMenu[];
}

export interface CartItem {
    menuId: string;
    name: string;
    pricePerPax: number;
    qty: number;
    image: string | null;
}

export interface EventDetails {
    eventType: string;
    eventDate: string;
    eventTime: string;
    location: string;
    city: string;
    guestCount: number;
    notes: string;
}

interface BookingClientProps {
    vendor: Vendor;
}

const DEFAULT_DETAILS: EventDetails = {
    eventType: '',
    eventDate: '',
    eventTime: '09:00',
    location: '',
    city: '',
    guestCount: 100,
    notes: '',
};

function formatRupiah(n: number) {
    return 'Rp ' + n.toLocaleString('id-ID');
}

export default function BookingClient({ vendor }: BookingClientProps) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [details, setDetails] = useState<EventDetails>(DEFAULT_DETAILS);
    const [result, setResult] = useState<{ orderNumber: string; totalAmount: number } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (cart.length === 0) return;
        setIsSubmitting(true);
        try {
            const res = await createOrder(vendor.id, cart, details);
            setResult(res);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Success Modal */}
            {result && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
                        <div className="p-8 text-center">
                            {/* Icon */}
                            <div className="relative mx-auto w-20 h-20 mb-6">
                                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                                <div className="relative w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-200">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-text-main mb-2">Pesanan Berhasil!</h2>
                            <p className="text-text-muted text-sm mb-6">
                                Permintaan dikirim ke <span className="font-semibold text-accent">{vendor.businessName}</span>.
                                Vendor akan merespons dalam 1×24 jam kerja.
                            </p>

                            {/* Order Info */}
                            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Nomor Pesanan</span>
                                    <span className="font-bold text-accent font-mono">#{result.orderNumber}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-text-muted">Estimasi Total</span>
                                    <span className="font-bold text-primary">{formatRupiah(result.totalAmount)}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push('/pesanan')}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
                            >
                                Lihat Riwayat Pesanan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {step <= 3 && <BookingStepper currentStep={step} />}

            {step === 1 && (
                <MenuStep
                    vendor={vendor}
                    cart={cart}
                    onCartChange={setCart}
                    onNext={() => setStep(2)}
                />
            )}
            {step === 2 && (
                <DetailStep
                    details={details}
                    onDetailsChange={setDetails}
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                />
            )}
            {step === 3 && (
                <ConfirmStep
                    vendor={vendor}
                    cart={cart}
                    details={details}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                    onBack={() => setStep(2)}
                />
            )}
        </>
    );
}
