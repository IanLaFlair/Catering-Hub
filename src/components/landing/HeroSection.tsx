import { Search, MapPin, Users, CalendarDays } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative w-full bg-surface-light">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-[#2B5C8A] bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBgKWKBCrbzQ4FKfwVIgGF6TPIthTzO2vdWJNfAHuG4W9KlJ8XQP851tL4sLLYfd8-cjqYATLyaO5tKYqGQIKTybxpa9WoGwRc7fQ6CgIBTCbrmDbaGLBHe4er2qKmYlMWdintkbyNgqCsf8dCctY6Y9G7fYOwjiYW2OmdDLkzt9WffJIcc7feryO8dPo06w3DnLpW6Fr-ceD9SPmu3Rx-hNdvlR_YvMSOVNgcvI8R5n-zrM1VkTzLxQpY5jgMXaOkmO1dFE3hpDyY')`
                }}
            ></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2B5C8A]/90 to-[#2B5C8A]/60"></div>

            {/* Content Container */}
            <div className="relative max-w-[1440px] mx-auto flex flex-col items-center justify-center min-h-[560px] px-5 py-20">
                <div className="flex flex-col gap-6 text-center max-w-[800px] mb-12">
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                        Temukan Catering Terbaik untuk Acara Anda
                    </h1>
                    <h2 className="text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-[640px] mx-auto">
                        Platform yang menghubungkan customer, vendor catering, dan UMKM kuliner dalam satu ekosistem terpercaya.
                    </h2>
                </div>

                {/* Enhanced Search Bar */}
                <div className="w-full max-w-[960px] bg-white p-4 rounded-xl shadow-xl shadow-blue-900/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        {/* Jenis Acara */}
                        <div className="flex flex-col gap-1.5 md:col-span-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 text-left">Jenis Acara</label>
                            <div className="relative flex items-center h-12 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <CalendarDays className="w-5 h-5 text-gray-400 ml-3" />
                                <input
                                    className="w-full h-full bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-800 placeholder:text-gray-400 pl-2 focus:outline-none"
                                    placeholder="Pernikahan, Rapat..."
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Lokasi */}
                        <div className="flex flex-col gap-1.5 md:col-span-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 text-left">Lokasi</label>
                            <div className="relative flex items-center h-12 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <MapPin className="w-5 h-5 text-gray-400 ml-3" />
                                <input
                                    className="w-full h-full bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-800 placeholder:text-gray-400 pl-2 focus:outline-none"
                                    placeholder="Kota atau Kecamatan"
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Jumlah Tamu */}
                        <div className="flex flex-col gap-1.5 md:col-span-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 text-left">Jumlah Tamu</label>
                            <div className="relative flex items-center h-12 bg-gray-50 rounded-lg border border-gray-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <Users className="w-5 h-5 text-gray-400 ml-3" />
                                <input
                                    className="w-full h-full bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-800 placeholder:text-gray-400 pl-2 focus:outline-none"
                                    placeholder="Contoh: 100"
                                    type="number"
                                />
                            </div>
                        </div>

                        {/* Button */}
                        <div className="flex md:col-span-1 h-full pt-6 md:pt-0">
                            <button className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 active:scale-95">
                                <Search className="w-5 h-5" />
                                Cari Catering
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
