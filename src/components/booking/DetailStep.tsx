'use client';

import { Calendar, Clock, MapPin, Users, MessageSquare, ChevronDown, ArrowLeft } from 'lucide-react';
import type { EventDetails } from '@/app/booking/BookingClient';

interface DetailStepProps {
    details: EventDetails;
    onDetailsChange: (d: EventDetails) => void;
    onNext: () => void;
    onBack: () => void;
}

const EVENT_TYPES = ['Pernikahan', 'Acara Kantor / Corporate', 'Ulang Tahun', 'Arisan / Gathering', 'Syukuran', 'Acara Keagamaan', 'Lainnya'];
const KOTA = ['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Utara', 'Tangerang', 'Bekasi', 'Depok', 'Bogor'];

export default function DetailStep({ details, onDetailsChange, onNext, onBack }: DetailStepProps) {
    const set = (key: keyof EventDetails, value: string | number) =>
        onDetailsChange({ ...details, [key]: value });

    const isValid = details.eventType && details.eventDate && details.location && details.city && details.guestCount > 0;

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-text-main mb-6">Detail Acara Anda</h2>

            <div className="bg-white rounded-xl border border-border-light p-6 space-y-5 mb-8">
                {/* Jenis Acara */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">
                        Jenis Acara <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={details.eventType}
                            onChange={(e) => set('eventType', e.target.value)}
                            className="appearance-none w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 text-sm bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        >
                            <option value="">Pilih jenis acara...</option>
                            {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-text-main mb-2">
                            Tanggal Acara <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="date"
                                value={details.eventDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => set('eventDate', e.target.value)}
                                className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-text-main mb-2">Waktu Acara</label>
                        <div className="relative">
                            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="time"
                                value={details.eventTime}
                                onChange={(e) => set('eventTime', e.target.value)}
                                className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Lokasi */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">
                        Lokasi Acara <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={details.location}
                            placeholder="Nama gedung / alamat lengkap"
                            onChange={(e) => set('location', e.target.value)}
                            className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Kota */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">
                        Kota / Area <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <select
                            value={details.city}
                            onChange={(e) => set('city', e.target.value)}
                            className="appearance-none w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 text-sm bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        >
                            <option value="">Pilih kota...</option>
                            {KOTA.map((k) => <option key={k}>{k}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Jumlah Tamu */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">
                        Jumlah Tamu <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="number"
                            value={details.guestCount}
                            min={1}
                            onChange={(e) => set('guestCount', Number(e.target.value))}
                            className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Catatan */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">Catatan Khusus</label>
                    <div className="relative">
                        <MessageSquare className="absolute top-3.5 left-3.5 w-5 h-5 text-gray-400" />
                        <textarea
                            rows={3}
                            value={details.notes}
                            placeholder="Contoh: Tidak ada daging babi, butuh dekorasi meja prasmanan..."
                            onChange={(e) => set('notes', e.target.value)}
                            className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                        />
                    </div>
                </div>
            </div>

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
                    disabled={!isValid}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Lanjutkan ke Konfirmasi →
                </button>
            </div>
        </div>
    );
}
