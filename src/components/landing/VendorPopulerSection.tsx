import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";

const vendors = [
    {
        name: "Berkah Catering",
        location: "Jakarta Selatan",
        rating: 4.8,
        price: "Rp 35.000",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE8w59S_In0D_KE-_YMe4YRWJV-BqZFWg0Fsw3il8jBO-iaYpojDRq4EQkMuoj5zpo5nYjeMDyYAc-lN9MYsr2X2x2dK9oB18igpZDIEjFcJPDCph5CooUx8pmTuBvwZEgSXIBIY_6hZpxbLFmVnm4IkrGxvk4kLmdFe68HmNu6YtHFnYNWBMR27A4Dgm5tTFy8oOuxnlp5zVmC0NM63MRJjLIBe2Qgc-S_EWlnYOqxpvU-dFMN0m8i31Re5EKiZxiYyZ1INF2sQ8",
        slug: "berkah-catering",
    },
    {
        name: "Dapur Bunda",
        location: "Bandung",
        rating: 4.9,
        price: "Rp 45.000",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxWvJSt2ET7mz1KvDC2O21K3HIiiNzLhygar4W69oedszjebJK_qdqJzGWb4qQbZTiMkQbK6cm3aZ10xJ8eQu8c-XuRiAnVrW89rgRAUvT_Jet56MbVc06leoxUpSNgg3hjGYXDY7ZFF0Rhkx5nkWL8_I5VsMUqbndzbxeJ26bAlVZy1xuFtg5W_U70LduhqlKXP5C8HcsIxsKAXQm-X56rhvok-DqxQ8qgA6VmuqDSHF3-RcnFjNNSirmvO3YbKReOIhOjakHfVI",
        slug: "dapur-bunda",
    },
    {
        name: "Rasa Nusantara",
        location: "Surabaya",
        rating: 4.7,
        price: "Rp 25.000",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5PDTFsxs7KoXZJIvYX2snzzYxjeDFCAMMQ9MuuEwVabyHVhv-dRiQxfDX6mFuaq4XGqO4ZV4PCG9KILk25jFJG3kjhLZXXhQZWhR-p-oAvZCNEZPiNWrnA1xdigS_j69LhB0ugletuyg1XiNIPkAnoE4p4vTRq45tKKNN4rIlOriDea4NftF2ykcMZx7Z7z4qp0iMv-6CgfjJCA2vCYJ5Fme9M2AXvkROoBIEu2Bm0QKYwv_2AunXkKE0Q0MpnAzJWAbin0eXRgM",
        slug: "rasa-nusantara",
    },
    {
        name: "Sweet Treats",
        location: "Tangerang",
        rating: 4.9,
        price: "Rp 15.000",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeXihyl18OXxNh8eNMzRIkOL4fKIwWy04QIGE8NZZ8iT8WUC7p7Lp3HGjvOZLyoFuzcpkiU51Rowwm5Q9RwyuPmzO1i2SVK72VCoZ1f1ScrRSeMXSoLhBmVT99-BOqVtAfT8aXLD0YzVSZidrS6QeDyc8kdkOM03TF9Jysc_oVpXF0a0TULSXOQ-qWjhiBP9LCeinSNoD_twx1kNT6RWhoGfZh9ENBaHijkT6W5mRLZ-nRsDaSNG41vdellPTF7obcR__DSWdAPsQ",
        slug: "sweet-treats",
    },
];

export default function VendorPopulerSection() {
    return (
        <section className="py-20 px-5 md:px-10 max-w-[1440px] mx-auto">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-secondary text-3xl md:text-4xl font-bold mb-2">
                        Vendor Terpopuler
                    </h2>
                    <p className="text-gray-600">Pilihan favorit pelanggan bulan ini</p>
                </div>
                <Link
                    href="/cari"
                    className="hidden md:flex items-center gap-1 text-primary font-bold hover:text-orange-600 transition-colors"
                >
                    Lihat Semua <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {vendors.map((vendor) => (
                    <div
                        key={vendor.slug}
                        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                                src={vendor.image}
                                alt={vendor.name}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                {vendor.rating}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">
                                {vendor.name}
                            </h3>
                            <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                                <MapPin className="w-4 h-4" /> {vendor.location}
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 mb-0.5">Mulai dari</p>
                                    <p className="text-primary font-bold text-base">
                                        {vendor.price}
                                        <span className="text-xs font-normal text-gray-400">
                                            /pax
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center md:hidden">
                <Link
                    href="/cari"
                    className="inline-flex items-center gap-1 text-primary font-bold hover:text-orange-600 transition-colors"
                >
                    Lihat Semua <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </section>
    );
}
