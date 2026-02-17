export default function CTASection() {
    return (
        <section className="py-20 bg-secondary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center px-5 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    Siap Menemukan Rasa Terbaik?
                </h2>
                <p className="text-white/80 text-lg max-w-2xl mb-8">
                    Daftarkan diri Anda sekarang dan nikmati kemudahan memesan katering untuk momen spesial Anda.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-orange-900/20 transition-all">
                        Daftar Sebagai Customer
                    </button>
                    <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-lg transition-all">
                        Jadi Mitra Vendor
                    </button>
                </div>
            </div>
        </section>
    );
}
