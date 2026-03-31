'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Eye, EyeOff, Package } from 'lucide-react';
import { toggleMenuAvailability, deleteMenu } from './actions';

interface Menu {
    id: string;
    name: string;
    category: string;
    pricePerPax: number;
    minOrderPax: number;
    isAvailable: boolean;
    image: string | null;
    description: string | null;
    items: string[];
}

export default function MenuCard({ menu }: { menu: Menu }) {
    const [available, setAvailable] = useState(menu.isAvailable);
    const [isPending, startTransition] = useTransition();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleToggle = () => {
        startTransition(async () => {
            setAvailable(!available);
            await toggleMenuAvailability(menu.id, !available);
        });
    };

    const handleDelete = () => {
        if (!confirmDelete) { setConfirmDelete(true); return; }
        startTransition(async () => {
            await deleteMenu(menu.id);
        });
    };

    return (
        <div className={`bg-white rounded-2xl border transition-all ${available ? 'border-border-light' : 'border-gray-100 opacity-60'}`}>
            <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-orange-50 flex items-center justify-center">
                    {menu.image ? (
                        <img src={menu.image} alt={menu.name} className="w-full h-full object-cover" />
                    ) : (
                        <Package className="w-8 h-8 text-primary/30" />
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <p className="font-bold text-text-main truncate">{menu.name}</p>
                            <span className="inline-block text-[11px] font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full mt-0.5">
                                {menu.category}
                            </span>
                        </div>
                        <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {available ? 'Aktif' : 'Nonaktif'}
                        </span>
                    </div>
                    <p className="text-sm font-bold text-primary mt-1.5">
                        Rp {menu.pricePerPax.toLocaleString('id-ID')}<span className="font-normal text-text-muted">/pax</span>
                    </p>
                    <p className="text-xs text-text-muted">Min. {menu.minOrderPax} pax</p>
                </div>
            </div>

            {/* Items preview */}
            {menu.items.length > 0 && (
                <div className="px-4 pb-3">
                    <p className="text-xs text-text-muted line-clamp-1">
                        {menu.items.slice(0, 4).join(' • ')}{menu.items.length > 4 ? ` +${menu.items.length - 4} lagi` : ''}
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="px-4 py-3 border-t border-border-light flex items-center gap-2">
                <button
                    onClick={handleToggle}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-gray-300 transition-colors disabled:opacity-50"
                >
                    {available ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {available ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
                <Link
                    href={`/vendor-dashboard/menus/${menu.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-primary hover:text-primary transition-colors"
                >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
                        confirmDelete
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'border border-gray-200 text-red-500 hover:border-red-300'
                    }`}
                    onBlur={() => setConfirmDelete(false)}
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    {confirmDelete ? 'Yakin hapus?' : 'Hapus'}
                </button>
            </div>
        </div>
    );
}
