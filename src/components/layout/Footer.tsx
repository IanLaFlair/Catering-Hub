import { Facebook, Instagram, Twitter, Lock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-[1440px] mx-auto px-5 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 text-secondary">
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-secondary text-xl font-bold">CateringHub</h2>
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
