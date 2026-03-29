import Link from 'next/link';
import { CheckCircle2, TrendingUp, Users, ShieldCheck, BarChart3, Star } from 'lucide-react';

const benefits = [
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Jangkau Lebih Banyak Pelanggan', desc: 'Tampil di hadapan ribuan calon pelanggan yang aktif mencari catering untuk acara mereka.' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Dashboard Manajemen Lengkap', desc: 'Kelola pesanan, pantau pendapatan, dan update menu dari satu dashboard yang mudah digunakan.' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'Pembayaran Aman & Terjamin', desc: 'Dana masuk langsung ke rekening Anda setelah pesanan selesai. Kami menjamin keamanan transaksi.' },
    { icon: <Star className="w-6 h-6" />, title: 'Bangun Reputasi Online', desc: 'Kumpulkan ulasan dari pelanggan puas dan tingkatkan rating bisnis Anda secara organik.' },
    { icon: <Users className="w-6 h-6" />, title: 'Tanpa Biaya Pendaftaran', desc: 'Daftar gratis dan mulai menerima pesanan. Kami hanya mengambil komisi kecil dari setiap transaksi.' },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Dukungan Tim CateringHub', desc: 'Tim kami siap membantu Anda setup profil dan memaksimalkan potensi bisnis catering Anda.' },
];

const steps = [
    { num: '01', title: 'Daftar Akun Vendor', desc: 'Buat akun vendor secara gratis dalam 2 menit.' },
    { num: '02', title: 'Lengkapi Profil Bisnis', desc: 'Upload foto, deskripsi, dan paket menu catering Anda.' },
    { num: '03', title: 'Mulai Terima Pesanan', desc: 'Pelanggan akan menemukan dan memesan catering Anda.' },
];

export default function UntukVendorPage() {
    return (
        <main className="min-h-screen bg-white pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#1b140e] to-[#3d2c1e] text-white py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-primary/20 text-primary border border-primary/30 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                        Untuk Vendor Catering
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                        Kembangkan Bisnis Catering<br />Anda Bersama CateringHub
                    </h1>
                    <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
                        Bergabung dengan ratusan vendor catering terpercaya dan jangkau pelanggan baru setiap hari tanpa biaya pendaftaran.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors text-lg"
                        >
                            Daftar Sekarang — Gratis
                        </Link>
                        <Link
                            href="/cari"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors text-lg"
                        >
                            Lihat Contoh Profil
                        </Link>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 px-4 bg-[#faf8f5]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-extrabold text-[#1b140e] mb-3">Mengapa Bergabung dengan CateringHub?</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">Platform kami dirancang untuk membantu bisnis catering Anda tumbuh lebih cepat.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((b, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-[#f3ede7] hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                                    {b.icon}
                                </div>
                                <h3 className="font-bold text-[#1b140e] mb-2">{b.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-extrabold text-[#1b140e] mb-3">Cara Memulai</h2>
                        <p className="text-gray-500">Mulai terima pesanan dalam waktu kurang dari 24 jam.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center">
                        {steps.map((s, i) => (
                            <div key={i} className="flex-1 text-center">
                                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-black mx-auto mb-4">
                                    {s.num}
                                </div>
                                <h3 className="font-bold text-[#1b140e] mb-2">{s.title}</h3>
                                <p className="text-sm text-gray-500">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-primary">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-4">Siap Bergabung?</h2>
                    <p className="text-white/80 mb-8">Daftarkan bisnis catering Anda sekarang dan mulai terima pesanan hari ini.</p>
                    <Link
                        href="/register"
                        className="inline-block px-10 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors text-lg"
                    >
                        Daftar Gratis Sekarang
                    </Link>
                </div>
            </section>
        </main>
    );
}
