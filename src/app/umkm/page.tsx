import Link from 'next/link';
import { Utensils, Package, Megaphone, HandCoins, Globe, BookOpen } from 'lucide-react';

const benefits = [
    { icon: <Globe className="w-6 h-6" />, title: 'Digitalisasi Bisnis Kuliner', desc: 'Bawa bisnis kuliner UMKM Anda ke ranah digital dan jangkau pasar yang lebih luas.' },
    { icon: <Package className="w-6 h-6" />, title: 'Kelola Produk dengan Mudah', desc: 'Upload menu, atur harga, dan kelola stok dari satu platform yang sederhana dan intuitif.' },
    { icon: <Megaphone className="w-6 h-6" />, title: 'Promosi Tanpa Biaya Besar', desc: 'Tampil di hasil pencarian pelanggan secara organik tanpa perlu iklan berbayar.' },
    { icon: <HandCoins className="w-6 h-6" />, title: 'Akses Pembiayaan', desc: 'Kami bermitra dengan lembaga keuangan untuk membantu UMKM kuliner mendapatkan modal usaha.' },
    { icon: <BookOpen className="w-6 h-6" />, title: 'Pelatihan & Edukasi', desc: 'Akses webinar, panduan bisnis, dan komunitas UMKM kuliner yang aktif dan supportif.' },
    { icon: <Utensils className="w-6 h-6" />, title: 'Fokus Memasak, Kami Urus Sisanya', desc: 'Sistem pemesanan otomatis agar Anda bisa fokus pada kualitas masakan tanpa repot admin.' },
];

const faqs = [
    { q: 'Apakah ada biaya untuk mendaftar?', a: 'Tidak ada biaya pendaftaran. Anda hanya dikenakan komisi kecil ketika berhasil mendapatkan pesanan.' },
    { q: 'Apakah saya perlu memiliki izin usaha?', a: 'Tidak wajib untuk memulai. Namun kami menyarankan memiliki NIB (Nomor Induk Berusaha) untuk meningkatkan kepercayaan pelanggan.' },
    { q: 'Berapa kapasitas minimum yang harus saya miliki?', a: 'Tidak ada minimum. Bahkan UMKM dengan kapasitas 20-50 pax bisa bergabung dan menerima pesanan kecil.' },
    { q: 'Bagaimana cara menerima pembayaran?', a: 'Pembayaran dari pelanggan diproses melalui platform kami dan diteruskan ke rekening Anda setelah pesanan selesai.' },
];

export default function UntukUMKMPage() {
    return (
        <main className="min-h-screen bg-white pt-16">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-white/20 text-white border border-white/30 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                        Program UMKM Kuliner
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
                        Wujudkan Impian UMKM<br />Kuliner Anda Bersama Kami
                    </h1>
                    <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
                        CateringHub hadir untuk memberdayakan pelaku usaha kuliner kecil dan menengah agar bisa bersaing di era digital.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-4 bg-white text-[#1b4332] font-bold rounded-xl hover:bg-white/90 transition-colors text-lg"
                    >
                        Daftar UMKM Sekarang
                    </Link>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 px-4 bg-[#faf8f5]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-extrabold text-[#1b140e] mb-3">Apa yang Kami Tawarkan untuk UMKM?</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">Program khusus yang dirancang untuk kebutuhan usaha kuliner skala kecil dan menengah.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((b, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-[#f3ede7] hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-4">
                                    {b.icon}
                                </div>
                                <h3 className="font-bold text-[#1b140e] mb-2">{b.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-extrabold text-[#1b140e] mb-3">Pertanyaan Umum</h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#faf8f5] rounded-2xl p-6 border border-[#f3ede7]">
                                <h3 className="font-bold text-[#1b140e] mb-2">{faq.q}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4 bg-[#1b4332]">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-4">Mari Bergabung Bersama Kami</h2>
                    <p className="text-white/70 mb-8">Ribuan pelanggan menunggu untuk memesan dari UMKM kuliner seperti Anda.</p>
                    <Link
                        href="/register"
                        className="inline-block px-10 py-4 bg-white text-[#1b4332] font-bold rounded-xl hover:bg-white/90 transition-colors text-lg"
                    >
                        Mulai Sekarang — Gratis
                    </Link>
                </div>
            </section>
        </main>
    );
}
