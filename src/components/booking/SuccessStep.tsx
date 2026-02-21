import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function SuccessStep() {
    return (
        <div className="max-w-xl mx-auto text-center py-10">
            {/* Animated Checkmark */}
            <div className="relative mx-auto w-24 h-24 mb-8">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                <div className="relative w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border-4 border-green-200">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-3">
                Pesanan Berhasil Dikirim! 🎉
            </h2>
            <p className="text-text-muted max-w-md mx-auto mb-2">
                Permintaan quotation kamu sudah diterima dan dikirim ke vendor.
            </p>
            <p className="text-text-muted max-w-md mx-auto mb-8">
                Vendor akan merespons dalam <span className="font-bold text-accent">1×24 jam kerja</span>.
            </p>

            {/* Order Number */}
            <div className="bg-background-light border border-border-light rounded-xl px-6 py-5 max-w-sm mx-auto mb-8">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Nomor Pesanan</p>
                <p className="text-2xl font-bold text-accent tracking-wide font-mono">#ORD-20260217-001</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-10 text-left">
                <div className="bg-white border border-border-light rounded-lg p-3">
                    <p className="text-[11px] text-text-muted">Vendor</p>
                    <p className="text-sm font-semibold text-text-main">Sari Rasa Catering</p>
                </div>
                <div className="bg-white border border-border-light rounded-lg p-3">
                    <p className="text-[11px] text-text-muted">Estimasi Total</p>
                    <p className="text-sm font-semibold text-primary">Rp 7.665.000</p>
                </div>
                <div className="bg-white border border-border-light rounded-lg p-3">
                    <p className="text-[11px] text-text-muted">Tanggal Acara</p>
                    <p className="text-sm font-semibold text-text-main">15 Mar 2026</p>
                </div>
                <div className="bg-white border border-border-light rounded-lg p-3">
                    <p className="text-[11px] text-text-muted">Jumlah Tamu</p>
                    <p className="text-sm font-semibold text-text-main">100 orang</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <Link
                    href="/pesanan"
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    Lihat Riwayat Pesanan
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                    href="/"
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-text-main font-medium py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                    <Home className="w-4 h-4" />
                    Beranda
                </Link>
            </div>
        </div>
    );
}
