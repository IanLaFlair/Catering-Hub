import { auth } from "@/auth";

export default async function VendorDashboardOverview() {
    const session = await auth();

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#1b140e] mb-6">Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-[#f3ede7] hover:shadow-soft transition-shadow">
                    <p className="text-sm font-semibold text-gray-500 mb-2">Total Pendapatan</p>
                    <h3 className="text-3xl font-bold text-primary">Rp 0</h3>
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        +0% bulan ini
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#f3ede7] hover:shadow-soft transition-shadow">
                    <p className="text-sm font-semibold text-gray-500 mb-2">Pesanan Aktif</p>
                    <h3 className="text-3xl font-bold text-[#1b140e]">0</h3>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Sedang diproses</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#f3ede7] hover:shadow-soft transition-shadow">
                    <p className="text-sm font-semibold text-gray-500 mb-2">Total Selesai</p>
                    <h3 className="text-3xl font-bold text-[#1b140e]">0</h3>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Dalam 30 hari terakhir</p>
                </div>
            </div>

            {/* Quick Actions / Recent Activity placeholder */}
            <div className="bg-white rounded-2xl border border-[#f3ede7] p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-[#1b140e]">Pesanan Terbaru</h2>
                </div>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-gray-900 font-semibold mb-1">Belum ada pesanan</h3>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                        Pesanan dari pelanggan Anda akan muncul di sini. Pastikan profil dan menu Anda sudah lengkap!
                    </p>
                </div>
            </div>
        </div>
    );
}
