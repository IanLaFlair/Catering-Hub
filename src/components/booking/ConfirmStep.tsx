'use client';

import { ArrowLeft, Calendar, Clock, MapPin, Users, ShieldCheck } from 'lucide-react';

interface ConfirmStepProps {
    onNext: () => void;
    onBack: () => void;
}

export default function ConfirmStep({ onNext, onBack }: ConfirmStepProps) {
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-text-main mb-6">Konfirmasi Pesanan</h2>

            {/* Vendor */}
            <div className="bg-white rounded-xl border border-border-light p-5 mb-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold text-lg">SR</div>
                <div>
                    <h3 className="font-bold text-text-main">Sari Rasa Catering</h3>
                    <p className="text-sm text-text-muted">Jakarta Selatan</p>
                </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-xl border border-border-light p-5 mb-4">
                <h4 className="font-bold text-text-main mb-4 pb-3 border-b border-border-light">Detail Acara</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-orange-50 rounded-lg text-primary"><Calendar className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-text-muted">Tanggal</p>
                            <p className="font-semibold text-text-main text-sm">Sabtu, 15 Maret 2026</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-accent"><Clock className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-text-muted">Waktu</p>
                            <p className="font-semibold text-text-main text-sm">11:00 WIB</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600"><MapPin className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-text-muted">Lokasi</p>
                            <p className="font-semibold text-text-main text-sm">Gedung Balai Kartini, Jakarta Selatan</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Users className="w-5 h-5" /></div>
                        <div>
                            <p className="text-xs text-text-muted">Jumlah Tamu</p>
                            <p className="font-semibold text-text-main text-sm">100 orang</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border-light">
                    <p className="text-xs text-text-muted mb-1">Catatan Khusus</p>
                    <p className="text-sm text-text-main">Tidak ada daging babi, butuh dekorasi meja prasmanan warna putih.</p>
                </div>
            </div>

            {/* Order Summary Table */}
            <div className="bg-white rounded-xl border border-border-light p-5 mb-4">
                <h4 className="font-bold text-text-main mb-4 pb-3 border-b border-border-light">Rincian Menu</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                        <div>
                            <p className="font-medium text-text-main text-sm">Paket Gold Prasmanan</p>
                            <p className="text-xs text-text-muted">100 pax × Rp 55.000</p>
                        </div>
                        <span className="font-semibold text-text-main">Rp 5.500.000</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <div>
                            <p className="font-medium text-text-main text-sm">Zuppa Soup</p>
                            <p className="text-xs text-text-muted">100 pax × Rp 18.000</p>
                        </div>
                        <span className="font-semibold text-text-main">Rp 1.800.000</span>
                    </div>
                </div>

                <div className="border-t border-border-light mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Subtotal</span>
                        <span className="text-text-main font-medium">Rp 7.300.000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-text-muted">Biaya Layanan (5%)</span>
                        <span className="text-text-main font-medium">Rp 365.000</span>
                    </div>
                    <div className="flex justify-between border-t border-border-light pt-3 mt-3">
                        <span className="font-bold text-text-main text-lg">Estimasi Total</span>
                        <span className="font-bold text-primary text-2xl">Rp 7.665.000</span>
                    </div>
                </div>
                <p className="text-[11px] text-text-muted mt-2 text-right">*Harga final akan dikonfirmasi oleh vendor</p>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 px-1 mb-6 cursor-pointer group">
                <input type="checkbox" defaultChecked className="form-checkbox mt-0.5 rounded text-primary border-gray-300 focus:ring-primary" />
                <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">
                    Saya menyetujui <a href="#" className="text-primary underline underline-offset-2">Syarat & Ketentuan</a> dan <a href="#" className="text-primary underline underline-offset-2">Kebijakan Privasi</a> CateringHub.
                </span>
            </label>

            {/* Navigation */}
            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-gray-300 text-text-main font-medium hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <ShieldCheck className="w-5 h-5" />
                    Kirim Pesanan
                </button>
            </div>
        </div>
    );
}
