'use client';

import { ChevronDown, SlidersHorizontal, Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const LOKASI = [
    'Jakarta Selatan',
    'Jakarta Pusat',
    'Jakarta Barat',
    'Jakarta Timur',
    'Jakarta Utara',
    'Bekasi',
    'Depok',
    'Tangerang',
    'Bogor',
];

const JENIS_ACARA = [
    'Pernikahan',
    'Kantor/Corporate',
    'Ulang Tahun',
    'Nasi Box',
    'Seminar',
    'Gathering',
];

const HARGA_OPTIONS = [
    { label: 'Di bawah Rp 30k', min: 0, max: 30000 },
    { label: 'Rp 30k - 60k', min: 30000, max: 60000 },
    { label: 'Rp 60k - 100k', min: 60000, max: 100000 },
    { label: 'Di atas Rp 100k', min: 100000, max: undefined },
];

export default function SearchFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCity = searchParams.get('city') ?? '';
    const currentPriceMin = searchParams.get('priceMin') ?? '';
    const currentPriceMax = searchParams.get('priceMax') ?? '';

    const updateParam = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete('page');
        router.push(`/cari?${params.toString()}`);
    };

    const handleCityChange = (city: string, checked: boolean) => {
        updateParam('city', checked ? city : null);
    };

    const handleHargaChange = (min: number, max: number | undefined) => {
        const params = new URLSearchParams(searchParams.toString());
        const sameMin = params.get('priceMin') === String(min);
        const sameMax = params.get('priceMax') === String(max ?? '');

        if (sameMin && sameMax) {
            params.delete('priceMin');
            params.delete('priceMax');
        } else {
            params.set('priceMin', String(min));
            if (max) params.set('priceMax', String(max));
            else params.delete('priceMax');
        }
        params.delete('page');
        router.push(`/cari?${params.toString()}`);
    };

    const handleReset = () => {
        router.push('/cari');
    };

    return (
        <aside className="w-full lg:w-[280px] flex-shrink-0 space-y-4">
            <div className="sticky top-24 space-y-3">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-text-main">Filter</h3>
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-text-muted" />
                        {(currentCity || currentPriceMin) && (
                            <button
                                onClick={handleReset}
                                className="text-xs text-primary font-medium hover:underline"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter: Lokasi */}
                <details className="group bg-white rounded-lg border border-border-light overflow-hidden" open>
                    <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-sm text-text-main">Lokasi</span>
                        <ChevronDown className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-4 pt-0 space-y-2">
                        {LOKASI.map((kota) => (
                            <label key={kota} className="flex items-center gap-3 cursor-pointer group/item">
                                <input
                                    type="checkbox"
                                    checked={currentCity === kota}
                                    onChange={(e) => handleCityChange(kota, e.target.checked)}
                                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary"
                                />
                                <span className="text-sm text-text-main group-hover/item:text-primary transition-colors">
                                    {kota}
                                </span>
                            </label>
                        ))}
                    </div>
                </details>

                {/* Filter: Jenis Acara (UI only for now) */}
                <details className="group bg-white rounded-lg border border-border-light overflow-hidden" open>
                    <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-sm text-text-main">Jenis Acara</span>
                        <ChevronDown className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-4 pt-0 space-y-2">
                        {JENIS_ACARA.map((acara) => (
                            <label key={acara} className="flex items-center gap-3 cursor-pointer group/item">
                                <input
                                    type="checkbox"
                                    className="form-checkbox rounded text-primary border-gray-300 focus:ring-primary"
                                />
                                <span className="text-sm text-text-main group-hover/item:text-primary transition-colors">
                                    {acara}
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
                    <div className="px-4 pb-4 pt-0 space-y-2">
                        {HARGA_OPTIONS.map((opt) => {
                            const isActive =
                                currentPriceMin === String(opt.min) &&
                                currentPriceMax === String(opt.max ?? '');
                            return (
                                <label key={opt.label} className="flex items-center gap-3 cursor-pointer group/item">
                                    <input
                                        type="radio"
                                        name="harga"
                                        checked={isActive}
                                        onChange={() => handleHargaChange(opt.min, opt.max)}
                                        className="form-radio text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="text-sm text-text-main group-hover/item:text-primary transition-colors">
                                        {opt.label}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </details>

                {/* Filter: Rating */}
                <details className="group bg-white rounded-lg border border-border-light overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-sm text-text-main">Rating Minimum</span>
                        <ChevronDown className="w-5 h-5 text-text-muted transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="px-4 pb-4 pt-0 space-y-2">
                        {[4, 3, 2].map((r) => (
                            <label key={r} className="flex items-center gap-3 cursor-pointer group/item">
                                <input
                                    type="radio"
                                    name="rating"
                                    className="form-radio text-primary border-gray-300 focus:ring-primary"
                                />
                                <div className="flex items-center text-amber-400">
                                    {Array.from({ length: r }).map((_, i) => (
                                        <Star key={i} className="w-[16px] h-[16px] fill-current" />
                                    ))}
                                    {Array.from({ length: 5 - r }).map((_, i) => (
                                        <Star key={i} className="w-[16px] h-[16px] text-gray-300" />
                                    ))}
                                </div>
                                <span className="text-sm text-text-main">& Up</span>
                            </label>
                        ))}
                    </div>
                </details>
            </div>
        </aside>
    );
}
