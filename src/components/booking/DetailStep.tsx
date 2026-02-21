'use client';

import { Calendar, Clock, MapPin, Users, MessageSquare, ChevronDown, ArrowLeft } from 'lucide-react';

interface DetailStepProps {
    onNext: () => void;
    onBack: () => void;
}

export default function DetailStep({ onNext, onBack }: DetailStepProps) {
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
                        <select className="appearance-none w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 text-sm bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
                            <option value="">Pilih jenis acara...</option>
                            <option>Pernikahan</option>
                            <option>Acara Kantor / Corporate</option>
                            <option>Ulang Tahun</option>
                            <option>Arisan / Gathering</option>
                            <option>Acara Keagamaan</option>
                            <option>Lainnya</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Date + Time Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-text-main mb-2">
                            Tanggal Acara <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-text-main mb-2">
                            Waktu Acara <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Clock className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="time"
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
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <MapPin className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Nama gedung / alamat lengkap"
                            className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Area / Kota */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">
                        Kota / Area <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <select className="appearance-none w-full border border-gray-300 rounded-xl px-4 py-3 pr-10 text-sm bg-white text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors">
                            <option value="">Pilih kota...</option>
                            <option>Jakarta Selatan</option>
                            <option>Jakarta Pusat</option>
                            <option>Jakarta Barat</option>
                            <option>Jakarta Timur</option>
                            <option>Jakarta Utara</option>
                            <option>Tangerang</option>
                            <option>Bekasi</option>
                            <option>Depok</option>
                            <option>Bogor</option>
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
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Users className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="number"
                            placeholder="100"
                            defaultValue={100}
                            className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                    </div>
                </div>

                {/* Catatan */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2">
                        Catatan Khusus
                    </label>
                    <div className="relative">
                        <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none">
                            <MessageSquare className="w-5 h-5 text-gray-400" />
                        </div>
                        <textarea
                            rows={3}
                            placeholder="Contoh: Tidak ada daging babi, butuh dekorasi meja prasmanan..."
                            className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm bg-white text-text-main placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                        />
                    </div>
                </div>
            </div>

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
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                >
                    Lanjutkan ke Konfirmasi →
                </button>
            </div>
        </div>
    );
}
