'use client';

import { Minus, Plus, Star, Trash2, MapPin, PlusCircle } from 'lucide-react';

interface MenuItem {
    id: string;
    name: string;
    price: number;
    unit: string;
    qty: number;
    image: string;
}

const INITIAL_ITEMS: MenuItem[] = [
    {
        id: '1',
        name: 'Paket Gold Prasmanan',
        price: 55000,
        unit: 'pax',
        qty: 100,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA2pchfo3HJOPftiQMUh8S48WX_FHYaCqpG5bauAN8-6JYsVkWPfvVTedpAvJzHp8U082BfjV0gU_WnXMJ3laTD2Q9mphzIjgopcgF1ENtF3qKLXa-OPEVkg7whToN72HY5ZDLmy7EdhFAN_a16qpji9ia-jVLB_dIMcVv3Wi2OTaVbF07ZaHmDS-0IA9PjyumT7BXS5H5uRFutX9q-1OdqV9B6-C9Mb2dGo9wjjOsOcTctFqkV25dANJUvOmFUM1xW-cxOEsK7z4',
    },
    {
        id: '2',
        name: 'Zuppa Soup',
        price: 18000,
        unit: 'pax',
        qty: 100,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyW0-iucCB1OhaAo6LtIpYcG8zCbKUvdrejL5eAA0S7wX07XAk66z_cUq0KluwMTFMnWq-S-4Ks0ctNFgbc4m4vc2XsGRzY1C037kpHdL5IyDY9SH9sZVQFFBNtNNmUdqDCrnrC3kPm8zbe10iSlLr3f8sxl8QPQX-8CVujTPURwcCabc4qyvWrD_K91lLyEqoFAv9iyNJ81CQBhd64oZHBcf_hGlq5A94r1VS5bdpo-1FwUy1SJRg6KIpfNz-oa-OT5faI2GRTaw',
    },
];

function formatRupiah(n: number) {
    return 'Rp ' + n.toLocaleString('id-ID');
}

interface MenuStepProps {
    onNext: () => void;
}

export default function MenuStep({ onNext }: MenuStepProps) {
    return (
        <div className="max-w-3xl mx-auto">
            {/* Vendor Info */}
            <div className="bg-white rounded-xl border border-border-light p-5 mb-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                    SR
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-text-main">Sari Rasa Catering</h3>
                    <div className="flex items-center gap-3 text-sm text-text-muted mt-0.5">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="font-semibold text-text-main">4.8</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Jakarta Selatan
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Title */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-main">Menu Dipilih</h2>
                <span className="text-sm text-text-muted">{INITIAL_ITEMS.length} item</span>
            </div>

            {/* Menu Items */}
            <div className="space-y-4 mb-6">
                {INITIAL_ITEMS.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-border-light p-4 flex gap-4 group hover:shadow-soft transition-shadow">
                        <div
                            className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
                            style={{ backgroundImage: `url("${item.image}")` }}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold text-text-main">{item.name}</h4>
                                <button className="text-gray-300 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="text-sm text-text-muted mt-0.5">{formatRupiah(item.price)}/{item.unit}</p>

                            {/* Qty Control + Line Total */}
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-1 bg-gray-50 rounded-lg border border-gray-200">
                                    <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-semibold text-sm text-text-main">{item.qty}</span>
                                    <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <span className="font-bold text-primary text-lg">{formatRupiah(item.price * item.qty)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add More */}
            <button className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-primary rounded-xl text-sm font-medium text-text-muted hover:text-primary transition-colors flex items-center justify-center gap-2 mb-8">
                <PlusCircle className="w-5 h-5" />
                Tambah Menu Lain
            </button>

            {/* Subtotal + Next */}
            <div className="bg-background-light rounded-xl border border-border-light p-5">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-text-muted font-medium">Subtotal ({INITIAL_ITEMS.reduce((s, i) => s + i.qty, 0)} pax)</span>
                    <span className="text-2xl font-bold text-primary">
                        {formatRupiah(INITIAL_ITEMS.reduce((s, i) => s + i.price * i.qty, 0))}
                    </span>
                </div>
                <button
                    onClick={onNext}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                >
                    Lanjutkan ke Detail Acara →
                </button>
            </div>
        </div>
    );
}
