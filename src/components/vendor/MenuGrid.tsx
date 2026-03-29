'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { VendorMenu } from '@prisma/client';

interface MenuGridProps {
    menus: VendorMenu[];
    vendorSlug: string;
}

function formatPrice(price: number) {
    if (price >= 1_000_000) return `Rp ${(price / 1_000_000).toFixed(1).replace('.0', '')}jt`;
    if (price >= 1_000) return `Rp ${(price / 1_000).toFixed(0)}k`;
    return `Rp ${price.toLocaleString('id-ID')}`;
}

export default function MenuGrid({ menus, vendorSlug }: MenuGridProps) {
    const router = useRouter();
    const categories = ['Semua', ...Array.from(new Set(menus.map((m) => m.category)))];
    const [activeCategory, setActiveCategory] = useState('Semua');

    const filtered = activeCategory === 'Semua'
        ? menus
        : menus.filter((m) => m.category === activeCategory);

    return (
        <div className="lg:col-span-8">
            {/* Category Filter */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-6 mb-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                            activeCategory === cat
                                ? 'bg-accent text-white shadow-sm font-semibold'
                                : 'bg-white border border-gray-200 hover:border-accent text-gray-700'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <p>Belum ada menu tersedia</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((item) => {
                        const itemsList = Array.isArray(item.items)
                            ? (item.items as string[]).join(', ')
                            : item.description ?? '';

                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
                            >
                                <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
                                    <div
                                        className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                                        style={{ backgroundImage: `url("${item.image ?? '/placeholder-vendor.jpg'}")` }}
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-accent">
                                        {item.category}
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-lg text-text-main line-clamp-1 mb-2">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{itemsList}</p>

                                    <div className="mt-auto pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                                Min. {item.minOrderPax} pax
                                            </span>
                                        </div>
                                        <div className="flex items-end justify-between gap-2">
                                            <div>
                                                <span className="text-xs text-gray-400 block">Mulai dari</span>
                                                <span className="text-primary font-bold text-lg">
                                                    {formatPrice(item.pricePerPax)}
                                                    <span className="text-xs font-normal text-gray-500">/pax</span>
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => router.push(`/booking?vendor=${vendorSlug}`)}
                                                className="bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-lg p-2 transition-colors flex items-center justify-center"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
