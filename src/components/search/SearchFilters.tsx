'use client';

import { ChevronDown, SlidersHorizontal, Star, X } from 'lucide-react';

const LOKASI = [
    { name: 'Jakarta Selatan', count: 128, checked: true },
    { name: 'Jakarta Pusat', count: 85, checked: false },
    { name: 'Jakarta Barat', count: 64, checked: false },
];

const JENIS_ACARA = [
    { name: 'Pernikahan', checked: true },
    { name: 'Kantor/Corporate', checked: false },
    { name: 'Ulang Tahun', checked: false },
    { name: 'Nasi Box', checked: false },
];

export default function SearchFilters() {
    return (
        <aside className="w-full lg:w-[280px] flex-shrink-0 space-y-4">
            <div className="sticky top-24 space-y-3">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-text-main">Filter</h3>
                    <SlidersHorizontal className="w-5 h-5 text-text-muted" />
                </div>

                {/* Filter: Lokasi */}
                <details className="group bg-white rounded-lg border border-border-light overflow-hidden" open>
                    <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-sm text-text-main">Lokasi</span>
                        <ChevronDown className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-4 pt-0 space-y-2">
                        {LOKASI.map((item) => (
                            <label key={item.name} className="flex items-center gap-3 cursor-pointer group/item">
                                <input
                                    type="checkbox"
                                    defaultChecked={item.checked}
                                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary"
                                />
                                <span className="text-sm text-text-main group-hover/item:text-primary transition-colors">
                                    {item.name}
                                </span>
                                <span className="text-xs text-text-muted ml-auto">({item.count})</span>
                            </label>
                        ))}
                        <button className="text-xs font-medium text-primary hover:underline mt-2">+ Lihat lainnya</button>
                    </div>
                </details>

                {/* Filter: Jenis Acara */}
                <details className="group bg-white rounded-lg border border-border-light overflow-hidden" open>
                    <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-sm text-text-main">Jenis Acara</span>
                        <ChevronDown className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-4 pt-0 space-y-2">
                        {JENIS_ACARA.map((item) => (
                            <label key={item.name} className="flex items-center gap-3 cursor-pointer group/item">
                                <input
                                    type="checkbox"
                                    defaultChecked={item.checked}
                                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary"
                                />
                                <span className="text-sm text-text-main group-hover/item:text-primary transition-colors">
                                    {item.name}
                                </span>
                            </label>
                        ))}
                    </div>
                </details>

                {/* Filter: Range Harga */}
                <details className="group bg-white rounded-lg border border-border-light overflow-hidden" open>
                    <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-sm text-text-main">Range Harga /pax</span>
                        <ChevronDown className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-6 pt-2">
                        <div className="relative w-full h-1 bg-gray-200 rounded-lg mb-6">
                            <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-lg"></div>
                            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
                            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-medium text-text-main">
                            <div className="px-2 py-1 bg-background-light border border-border-light rounded">Rp 25k</div>
                            <div className="h-[1px] w-3 bg-text-muted"></div>
                            <div className="px-2 py-1 bg-background-light border border-border-light rounded">Rp 50k</div>
                        </div>
                    </div>
                </details>

                {/* Filter: Rating */}
                <details className="group bg-white rounded-lg border border-border-light overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-sm text-text-main">Rating Minimum</span>
                        <ChevronDown className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-4 pt-0 space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer group/item">
                            <input type="radio" name="rating" className="form-radio text-primary border-gray-300 focus:ring-primary" />
                            <div className="flex items-center text-amber-400">
                                {[1, 2, 3, 4].map(i => <Star key={i} className="w-[18px] h-[18px] fill-current" />)}
                                <Star className="w-[18px] h-[18px] text-gray-300" />
                            </div>
                            <span className="text-sm text-text-main">& Up</span>
                        </label>
                    </div>
                </details>
            </div>
        </aside>
    );
}
