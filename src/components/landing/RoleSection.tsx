import { UtensilsCrossed, ChefHat, Store, ArrowRight } from "lucide-react";
import Link from "next/link";

const roles = [
    {
        icon: UtensilsCrossed,
        title: "Untuk Customer",
        description:
            "Temukan ribuan menu lezat untuk segala acara, dari pernikahan hingga makan siang kantor.",
        cta: "Mulai Mencari",
        href: "/cari",
        color: "text-secondary",
        bg: "bg-blue-50",
    },
    {
        icon: ChefHat,
        title: "Untuk Vendor Catering",
        description:
            "Jangkau lebih banyak pelanggan potensial dan kelola pesanan katering dengan sistem terintegrasi.",
        cta: "Gabung Mitra",
        href: "/register?role=vendor",
        color: "text-secondary",
        bg: "bg-blue-50",
    },
    {
        icon: Store,
        title: "Untuk UMKM Kuliner",
        description:
            "Tingkatkan penjualan dan branding usaha kuliner rumahan Anda ke pasar yang lebih luas.",
        cta: "Daftar Sekarang",
        href: "/register?role=umkm",
        color: "text-secondary",
        bg: "bg-blue-50",
    },
];

export default function RoleSection() {
    return (
        <section className="py-20 px-5 md:px-10 max-w-[1440px] mx-auto">
            <div className="flex flex-col gap-4 mb-10 text-center">
                <h2 className="text-secondary text-3xl md:text-4xl font-bold">
                    Pilih Peran Anda
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Bergabunglah dengan ekosistem katering terbesar di Indonesia sesuai
                    kebutuhan Anda.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {roles.map((role) => (
                    <div
                        key={role.title}
                        className="group flex flex-col bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                    >
                        <div
                            className={`w-14 h-14 rounded-full ${role.bg} ${role.color} flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors`}
                        >
                            <role.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {role.title}
                        </h3>
                        <p className="text-gray-500 mb-8 flex-1">
                            {role.description}
                        </p>
                        <Link
                            href={role.href}
                            className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
                        >
                            {role.cta}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
