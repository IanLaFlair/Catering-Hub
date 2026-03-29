'use client';

import { ArrowLeft, Calendar, MapPin, Users, ShieldCheck, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import type { Vendor, CartItem, EventDetails } from '@/app/booking/BookingClient';

function formatRupiah(n: number) {
    return 'Rp ' + n.toLocaleString('id-ID');
}

interface ConfirmStepProps {
    vendor: Vendor;
    cart: CartItem[];
    details: EventDetails;
    isSubmitting: boolean;
    onSubmit: () => void;
    onBack: () => void;
}

export default function ConfirmStep({ vendor, cart, details, isSubmitting, onSubmit, onBack }: ConfirmStepProps) {
    const subtotal = cart.reduce((s, c) => s + c.pricePerPax * c.qty, 0);
    const serviceFee = Math.round(subtotal * 0.05);
    const total = subtotal + serviceFee;

    const initials = vendor.businessName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    const eventDate = details.eventDate
        ? format(new Date(details.eventDate), 'EEEE, dd MMMM yyyy', { locale: id })
        : '-';

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-text-main mb-6">Konfirmasi Pesanan</h2>

            {/* Vendor */}
            <div className="bg-white rounded-xl border border-border-light p-5 mb-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold text-lg">
                    {initials}
                </div>
                <div>
                    <h3 className="font-bold text-text-main">{vendor.businessName}</h3>
                    <p className="text-sm text-text-muted">{vendor.city}</p>
                </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-xl border border-border-light p-5 mb-4">
                <h4 className="font-bold text-text-main mb-4 pb-3 border-b border-border-light">Detail Acara</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-50 rounded-lg text-primary"><Calendar className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-text-muted">Tanggal & Waktu</p>
                            <p className="font-semibold text-text-main text-sm">{eventDate}</p>
                            <p className="text-xs text-text-muted">{details.eventTime} WIB</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Users className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-text-muted">Tamu & Jenis Acara</p>
                            <p className="font-semibold text-text-main text-sm">{details.guestCount} orang</p>
                            <p className="text-xs text-text-muted">{details.eventType}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 sm:col-span-2">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600"><MapPin className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-text-muted">Lokasi</p>
                            <p className="font-semibold text-text-main text-sm">{details.location}</p>
                            <p className="text-xs text-text-muted">{details.city}</p>
                        </div>
                    </div>
                </div>
                {details.notes && (
                    <div className="mt-4 pt-3 border-t border-border-light">
                        <p className="text-xs text-text-muted mb-1">Catatan Khusus</p>
                        <p className="text-sm text-text-main">{details.notes}</p>
                    </div>
                )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl border border-border-light p-5 mb-4">
                <h4 className="font-bold text-text-main mb-4 pb-3 border-b border-border-light">Rincian Menu</h4>
                <div className="space-y-3">
                    {cart.map((item) => (
                        <div key={item.menuId} className="flex justify-between items-center py-2">
                            <div>
                                <p className="font-medium text-text-main text-sm">{item.name}</p>
                                <p className="text-xs text-text-muted">{item.qty} pax × {formatRupiah(item.pricePerPax)}</p>
                            </div>
                            <span className="font-semibold text-text-main">{formatRupiah(item.pricePerPax * item.qty)}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t border-border-light mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Subtotal</span>
                        <span className="text-text-main font-medium">{formatRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Biaya Layanan (5%)</span>
                        <span className="text-text-main font-medium">{formatRupiah(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border-light pt-3 mt-3">
                        <span className="font-bold text-text-main text-lg">Estimasi Total</span>
                        <span className="font-bold text-primary text-2xl">{formatRupiah(total)}</span>
                    </div>
                </div>
                <p className="text-[11px] text-text-muted mt-2 text-right">*Harga final akan dikonfirmasi oleh vendor</p>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 px-1 mb-6 cursor-pointer group">
                <input type="checkbox" defaultChecked className="form-checkbox mt-0.5 rounded text-primary border-gray-300 focus:ring-primary" />
                <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">
                    Saya menyetujui <a href="#" className="text-primary underline underline-offset-2">Syarat & Ketentuan</a> dan{' '}
                    <a href="#" className="text-primary underline underline-offset-2">Kebijakan Privasi</a> CateringHub.
                </span>
            </label>

            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-gray-300 text-text-main font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </button>
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Mengirim...</>
                    ) : (
                        <><ShieldCheck className="w-5 h-5" /> Kirim Pesanan</>
                    )}
                </button>
            </div>
        </div>
    );
}
