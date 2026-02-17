import { BookOpen, ShieldCheck, CalendarCheck, Star } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: BookOpen,
        title: "Ribuan Menu Pilihan",
        description: "Variasi menu dari nusantara hingga internasional.",
    },
    {
        icon: ShieldCheck,
        title: "UMKM Terverifikasi",
        description: "Mitra kami telah melalui proses kurasi ketat.",
    },
    {
        icon: CalendarCheck,
        title: "Booking Mudah",
        description: "Pesan katering dalam hitungan menit secara online.",
    },
    {
        icon: Star,
        title: "Review Terpercaya",
        description: "Ulasan asli dari pelanggan yang telah memesan.",
    },
];

export default function WhySection() {
    return (
        <section className="bg-surface-light py-20">
            <div className="max-w-[1440px] mx-auto px-5 md:px-10">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Left Content */}
                    <div className="flex-1">
                        <h2 className="text-secondary text-3xl md:text-4xl font-bold mb-6">
                            Kenapa CateringHub?
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Kami memastikan setiap pesanan katering Anda berjalan lancar dengan
                            standar kualitas terbaik dan keamanan transaksi yang terjamin.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature) => (
                                <div key={feature.title} className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 w-full relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTimoc1mH_iBmfMH4_DDMg-DwTKKkJAmhfi5lT98NoSCrY3fDRvS4GLABY5l9HcE3zP1Ci4hpbS3FSDzt7fiLMrk4nhFNKTL4F3Ox4bXCuxg4YwOWusQfU8PaIxrLDeGlpN1qHu8uACTfLeAad2x-q9V070Q7URvcWTjyyvGxJJ35aZRLzl4qGqNpd6rlRuW4kI4mHfDHK1SMiwo4YuQ7Io2aNjDsnGWPo4rrhXJMBaa1Qj9DhGBxLH4H4Ah0S1ivErm_THOxdGuQ"
                                alt="Catering terbaik Indonesia"
                                width={800}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-2xl -z-0 hidden md:block"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
