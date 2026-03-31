import { Facebook, Instagram, Twitter, Lock } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-[1440px] mx-auto px-5 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <Logo size={34} />
                        </div>
                        <p className="text-gray-500 mb-6 max-w-sm">
                            Solusi terbaik untuk menemukan dan memesan katering berkualitas untuk berbagai acara spesial Anda di seluruh Indonesia.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Perusahaan</h4>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Karir</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Kontak</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Layanan</h4>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Cari Catering</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Gabung Vendor</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Program UMKM</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Bantuan</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
                        <ul className="flex flex-col gap-4">
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-primary transition-colors">Kebijakan Privasi</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">© 2023 CateringHub Indonesia. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Lock className="w-4 h-4" /> Secure Transaction
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
