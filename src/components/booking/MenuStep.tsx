'use client';

import { Minus, Plus, Star, Trash2, MapPin } from 'lucide-react';
import type { Vendor, CartItem, VendorMenu } from '@/app/booking/BookingClient';

function formatRupiah(n: number) {
    return 'Rp ' + n.toLocaleString('id-ID');
}

interface MenuStepProps {
    vendor: Vendor;
    cart: CartItem[];
    onCartChange: (cart: CartItem[]) => void;
    onNext: () => void;
}

export default function MenuStep({ vendor, cart, onCartChange, onNext }: MenuStepProps) {
    const addToCart = (menu: VendorMenu) => {
        const existing = cart.find((c) => c.menuId === menu.id);
        if (existing) {
            onCartChange(cart.map((c) =>
                c.menuId === menu.id ? { ...c, qty: c.qty + menu.minOrderPax } : c
            ));
        } else {
            onCartChange([...cart, {
                menuId: menu.id,
                name: menu.name,
                pricePerPax: menu.pricePerPax,
                qty: menu.minOrderPax,
                image: menu.image,
            }]);
        }
    };

    const updateQty = (menuId: string, delta: number) => {
        const menu = vendor.menus.find((m) => m.id === menuId)!;
        onCartChange(cart.map((c) => {
            if (c.menuId !== menuId) return c;
            const newQty = Math.max(menu.minOrderPax, c.qty + delta);
            return { ...c, qty: newQty };
        }));
    };

    const removeFromCart = (menuId: string) => {
        onCartChange(cart.filter((c) => c.menuId !== menuId));
    };

    const subtotal = cart.reduce((s, c) => s + c.pricePerPax * c.qty, 0);
    const totalPax = cart.reduce((s, c) => s + c.qty, 0);

    const initials = vendor.businessName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="max-w-3xl mx-auto">
            {/* Vendor Info */}
            <div className="bg-white rounded-xl border border-border-light p-5 mb-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent font-bold text-xl">
                    {initials}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-text-main">{vendor.businessName}</h3>
                    <div className="flex items-center gap-3 text-sm text-text-muted mt-0.5">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="font-semibold text-text-main">{vendor.rating.toFixed(1)}</span>
                        </div>
                        {vendor.city && (
                            <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {vendor.city}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Pilih Menu dari Daftar Vendor */}
            <h2 className="text-xl font-bold text-text-main mb-4">Pilih Menu</h2>
            <div className="space-y-3 mb-6">
                {vendor.menus.map((menu) => {
                    const inCart = cart.find((c) => c.menuId === menu.id);
                    return (
                        <div key={menu.id} className="bg-white rounded-xl border border-border-light p-4 flex gap-4">
                            <div
                                className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0 bg-gray-100"
                                style={{ backgroundImage: menu.image ? `url("${menu.image}")` : undefined }}
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h4 className="font-semibold text-text-main">{menu.name}</h4>
                                        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-medium">
                                            {menu.category.replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                    {inCart ? (
                                        <button
                                            onClick={() => removeFromCart(menu.id)}
                                            className="text-gray-300 hover:text-red-400 transition-colors p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    ) : null}
                                </div>
                                <p className="text-sm text-text-muted mt-1">{formatRupiah(menu.pricePerPax)}/pax • Min. {menu.minOrderPax} pax</p>

                                {inCart ? (
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-1 bg-gray-50 rounded-lg border border-gray-200">
                                            <button
                                                onClick={() => updateQty(menu.id, -menu.minOrderPax)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-14 text-center font-semibold text-sm">{inCart.qty} pax</span>
                                            <button
                                                onClick={() => updateQty(menu.id, menu.minOrderPax)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="font-bold text-primary">{formatRupiah(menu.pricePerPax * inCart.qty)}</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(menu)}
                                        className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary/30 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Tambah
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary + Next */}
            <div className="bg-background-light rounded-xl border border-border-light p-5">
                {cart.length === 0 ? (
                    <p className="text-center text-text-muted text-sm py-2">Pilih minimal 1 menu untuk melanjutkan</p>
                ) : (
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-text-muted font-medium">Subtotal ({totalPax} pax)</span>
                        <span className="text-2xl font-bold text-primary">{formatRupiah(subtotal)}</span>
                    </div>
                )}
                <button
                    onClick={onNext}
                    disabled={cart.length === 0}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Lanjutkan ke Detail Acara →
                </button>
            </div>
        </div>
    );
}
