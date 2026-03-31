'use client';

import { useState, useTransition } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { updateProfile } from './actions';

interface VendorProfile {
    businessName: string;
    description: string | null;
    city: string | null;
    province: string | null;
    address: string | null;
    phone: string | null;
    minPax: number | null;
    maxPax: number | null;
    priceMin: number | null;
    priceMax: number | null;
}

export default function ProfileForm({ profile }: { profile: VendorProfile }) {
    const [isPending, startTransition] = useTransition();
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState({
        businessName: profile.businessName,
        description: profile.description ?? '',
        city: profile.city ?? '',
        province: profile.province ?? '',
        address: profile.address ?? '',
        phone: profile.phone ?? '',
        minPax: String(profile.minPax ?? ''),
        maxPax: String(profile.maxPax ?? ''),
        priceMin: String(profile.priceMin ?? ''),
        priceMax: String(profile.priceMax ?? ''),
    });

    const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm(f => ({ ...f, [key]: e.target.value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(false);
        setError(null);
        startTransition(async () => {
            try {
                await updateProfile({
                    businessName: form.businessName,
                    description: form.description,
                    city: form.city,
                    province: form.province,
                    address: form.address,
                    phone: form.phone,
                    minPax: parseInt(form.minPax) || 0,
                    maxPax: parseInt(form.maxPax) || 0,
                    priceMin: parseInt(form.priceMin) || 0,
                    priceMax: parseInt(form.priceMax) || 0,
                });
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Gagal menyimpan');
            }
        });
    };

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm";
    const labelClass = "block text-sm font-semibold text-text-main mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
            {saved && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Profil berhasil disimpan!
                </div>
            )}

            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-5">
                <h2 className="font-bold text-text-main">Informasi Bisnis</h2>
                <div>
                    <label className={labelClass}>Nama Bisnis <span className="text-red-500">*</span></label>
                    <input type="text" value={form.businessName} onChange={set('businessName')} required className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Deskripsi</label>
                    <textarea value={form.description} onChange={set('description')} rows={4}
                        placeholder="Ceritakan tentang bisnis catering Anda..."
                        className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Nomor Telepon / WhatsApp</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="0812..." className={inputClass} />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-5">
                <h2 className="font-bold text-text-main">Lokasi</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Kota</label>
                        <input type="text" value={form.city} onChange={set('city')} placeholder="Jakarta" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Provinsi</label>
                        <input type="text" value={form.province} onChange={set('province')} placeholder="DKI Jakarta" className={inputClass} />
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Alamat Lengkap</label>
                    <input type="text" value={form.address} onChange={set('address')} placeholder="Jl. ..." className={inputClass} />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border-light p-6 space-y-5">
                <h2 className="font-bold text-text-main">Kapasitas & Harga</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Min. Pax</label>
                        <input type="number" value={form.minPax} onChange={set('minPax')} placeholder="50" min="1" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Maks. Pax</label>
                        <input type="number" value={form.maxPax} onChange={set('maxPax')} placeholder="1000" min="1" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Harga Mulai (Rp)</label>
                        <input type="number" value={form.priceMin} onChange={set('priceMin')} placeholder="50000" min="0" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Harga Maks. (Rp)</label>
                        <input type="number" value={form.priceMax} onChange={set('priceMax')} placeholder="500000" min="0" className={inputClass} />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors disabled:opacity-60"
            >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {isPending ? 'Menyimpan...' : 'Simpan Profil'}
            </button>
        </form>
    );
}
