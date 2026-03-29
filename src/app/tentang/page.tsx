import Link from 'next/link';
import { Target, Heart, Lightbulb } from 'lucide-react';

const values = [
    { icon: <Target className="w-6 h-6" />, title: 'Misi Kami', desc: 'Menghubungkan pelanggan dengan vendor catering terbaik secara mudah, cepat, dan terpercaya di seluruh Indonesia.' },
    { icon: <Heart className="w-6 h-6" />, title: 'Nilai Kami', desc: 'Kepercayaan, transparansi, dan kualitas adalah fondasi dari setiap layanan yang kami bangun untuk vendor dan pelanggan.' },
    { icon: <Lightbulb className="w-6 h-6" />, title: 'Visi Kami', desc: 'Menjadi marketplace catering #1 di Indonesia yang memberdayakan ribuan UMKM kuliner lokal.' },
];

const stats = [
    { value: '500+', label: 'Vendor Terdaftar' },
    { value: '10.000+', label: 'Pesanan Diproses' },
    { value: '50+', label: 'Kota di Indonesia' },
    { value: '4.8', label: 'Rating Rata-rata' },
];

const team = [
    { name: 'Ahmad Fauzi', role: 'CEO & Co-Founder', initial: 'A' },
    { name: 'Siti Rahayu', role: 'CTO & Co-Founder', initial: 'S' },
    { name: 'Budi Prasetyo', role: 'Head of Operations', initial: 'B' },
    { name: 'Dewi Lestari', role: 'Head of Marketing', initial: 'D' },
];

export default function TentangKamiPage() {
    return (
        <main className="min-h-screen bg-white pt-16">
            {/* Hero */}
            <section className="bg-[#faf8f5] py-24 px-4 border-b border-[#f3ede7]">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1b140e] mb-6 leading-tight">
                        Tentang CateringHub
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Kami adalah platform marketplace catering yang lahir dari keinginan untuk mempermudah proses pemesanan catering dan membantu UMKM kuliner Indonesia berkembang di era digital.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-[#1b140e] mb-6">Cerita Kami</h2>
                    <div className="prose prose-gray max-w-none space-y-4 text-gray-600 leading-relaxed">
                        <p>
                            CateringHub lahir pada 2024 dari sebuah frustrasi sederhana — sulitnya menemukan catering yang tepat untuk acara keluarga, kantor, maupun pernikahan. Proses yang berbelit, harga yang tidak transparan, dan minimnya informasi tentang vendor membuat pelanggan kesulitan memilih.
                        </p>
                        <p>
                            Di sisi lain, ribuan pelaku UMKM catering berjuang untuk mendapatkan pelanggan baru di luar jaringan pertemanan mereka. Mereka punya keahlian memasak yang luar biasa, namun terbatas dalam hal pemasaran digital.
                        </p>
                        <p>
                            CateringHub hadir sebagai jembatan antara keduanya — sebuah platform yang membuat pemesanan catering semudah memesan ojek online, sekaligus membantu UMKM kuliner Indonesia tumbuh dan bersaing di era digital.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 px-4 bg-primary">
                <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
                    {stats.map((s, i) => (
                        <div key={i}>
                            <p className="text-4xl font-extrabold text-white mb-1">{s.value}</p>
                            <p className="text-white/70 text-sm">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="py-20 px-4 bg-[#faf8f5]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-extrabold text-[#1b140e] mb-3">Visi, Misi & Nilai</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 border border-[#f3ede7] text-center">
                                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-5">
                                    {v.icon}
                                </div>
                                <h3 className="font-bold text-[#1b140e] text-lg mb-3">{v.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-extrabold text-[#1b140e] mb-3">Tim Kami</h2>
                        <p className="text-gray-500">Orang-orang berdedikasi di balik CateringHub.</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {team.map((t, i) => (
                            <div key={i} className="text-center">
                                <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-4">
                                    {t.initial}
                                </div>
                                <p className="font-bold text-[#1b140e]">{t.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{t.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-[#1b140e]">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-4">Bergabung Bersama Kami</h2>
                    <p className="text-white/60 mb-8">Jadilah bagian dari ekosistem catering digital terbesar di Indonesia.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/cari" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors">
                            Cari Catering
                        </Link>
                        <Link href="/vendor" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors">
                            Daftar sebagai Vendor
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
