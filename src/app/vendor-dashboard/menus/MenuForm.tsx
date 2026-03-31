'use client';

import { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, Loader2, ImagePlus } from 'lucide-react';
import { createMenu, updateMenu, MenuFormData } from './actions';

const CATEGORIES = [
    { value: 'PRASMANAN', label: 'Prasmanan' },
    { value: 'NASI_BOX', label: 'Nasi Box' },
    { value: 'SNACK_BOX', label: 'Snack Box' },
    { value: 'WEDDING', label: 'Wedding' },
    { value: 'CORPORATE', label: 'Corporate' },
    { value: 'LAINNYA', label: 'Lainnya' },
];

interface Props {
    menuId?: string;
    defaultValues?: Partial<MenuFormData & { items: string[] }>;
}

export default function MenuForm({ menuId, defaultValues }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState(defaultValues?.name ?? '');
    const [description, setDescription] = useState(defaultValues?.description ?? '');
    const [category, setCategory] = useState(defaultValues?.category ?? 'PRASMANAN');
    const [pricePerPax, setPricePerPax] = useState(String(defaultValues?.pricePerPax ?? ''));
    const [minOrderPax, setMinOrderPax] = useState(String(defaultValues?.minOrderPax ?? '50'));
    const [image, setImage] = useState(defaultValues?.image ?? '');
    const [items, setItems] = useState<string[]>(defaultValues?.items?.length ? defaultValues.items : ['']);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        setError(null);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? 'Upload gagal');
            setImage(data.url);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Upload gagal');
        } finally {
            setIsUploading(false);
        }
    };

    const addItem = () => setItems([...items, '']);
    const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
    const updateItem = (i: number, val: string) => {
        const next = [...items];
        next[i] = val;
        setItems(next);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name || !pricePerPax || !minOrderPax) {
            setError('Nama, harga, dan minimum pax wajib diisi.');
            return;
        }

        const data: MenuFormData = {
            name,
            description,
            category,
            pricePerPax: parseInt(pricePerPax),
            minOrderPax: parseInt(minOrderPax),
            items: items.filter(Boolean),
            image,
        };

        startTransition(async () => {
            try {
                if (menuId) {
                    await updateMenu(menuId, data);
                } else {
                    await createMenu(data);
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Gagal menyimpan menu');
            }
        });
    };

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm";
    const labelClass = "block text-sm font-semibold text-text-main mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}

            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-5">
                <h2 className="font-bold text-text-main">Informasi Menu</h2>

                <div>
                    <label className={labelClass}>Nama Menu <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="cth: Paket Prasmanan Silver"
                        className={inputClass}
                        required
                    />
                </div>

                <div>
                    <label className={labelClass}>Kategori <span className="text-red-500">*</span></label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass}>
                        {CATEGORIES.map(c => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Deskripsi</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Deskripsi singkat tentang paket menu ini..."
                        rows={3}
                        className={inputClass}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-5">
                <h2 className="font-bold text-text-main">Harga & Kapasitas</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Harga per Pax (Rp) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            value={pricePerPax}
                            onChange={e => setPricePerPax(e.target.value)}
                            placeholder="50000"
                            min="1000"
                            className={inputClass}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Minimum Order (Pax) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            value={minOrderPax}
                            onChange={e => setMinOrderPax(e.target.value)}
                            placeholder="50"
                            min="1"
                            className={inputClass}
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-text-main">Item dalam Paket</h2>
                    <button
                        type="button"
                        onClick={addItem}
                        className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Item
                    </button>
                </div>
                <p className="text-xs text-text-muted">Daftar makanan/minuman yang termasuk dalam paket ini.</p>

                <div className="space-y-2">
                    {items.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                type="text"
                                value={item}
                                onChange={e => updateItem(i, e.target.value)}
                                placeholder={`cth: Nasi putih, Ayam bakar, Sayur sop...`}
                                className={inputClass}
                            />
                            {items.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeItem(i)}
                                    className="p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-4">
                <h2 className="font-bold text-text-main">Foto Menu</h2>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-colors ${
                        image ? 'border-primary/30' : 'border-gray-200 hover:border-primary/50'
                    }`}
                >
                    {image ? (
                        <div className="relative">
                            <img src={image} alt="preview" className="w-full h-48 object-cover rounded-xl" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                <p className="text-white text-sm font-semibold">Klik untuk ganti foto</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                            {isUploading ? (
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            ) : (
                                <>
                                    <ImagePlus className="w-8 h-8 mb-2" />
                                    <p className="text-sm font-medium">Klik untuk upload foto</p>
                                    <p className="text-xs mt-1">JPG, PNG, WebP — maks 5MB</p>
                                </>
                            )}
                        </div>
                    )}
                    {isUploading && image && (
                        <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                    )}
                </div>
                {image && (
                    <button
                        type="button"
                        onClick={() => setImage('')}
                        className="text-xs text-red-500 hover:underline"
                    >
                        Hapus foto
                    </button>
                )}
            </div>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={() => router.push('/vendor-dashboard/menus')}
                    className="px-6 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors disabled:opacity-60"
                >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isPending ? 'Menyimpan...' : menuId ? 'Simpan Perubahan' : 'Tambah Menu'}
                </button>
            </div>
        </form>
    );
}
