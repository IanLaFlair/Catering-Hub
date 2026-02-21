import { Calendar, Users, MessageSquare, ReceiptText } from 'lucide-react';
import Link from 'next/link';

export default function QuotationSidebar() {
    return (
        <div className="lg:col-span-4 relative h-full">
            <div className="sticky top-28 space-y-4">
                {/* Quotation Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-5 border-b border-gray-100 bg-accent/5">
                        <h3 className="font-bold text-lg text-accent flex items-center gap-2">
                            <ReceiptText className="w-5 h-5" />
                            Request Quotation
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">Dapatkan penawaran terbaik untuk acaramu.</p>
                    </div>

                    <div className="p-5 space-y-4">
                        {/* Date Picker */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal Acara</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Guest Count */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Jumlah Tamu</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Users className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    placeholder="Contoh: 100"
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Selected Items (Mini Cart) */}
                        <div className="bg-background-light rounded-lg p-3 border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Item Dipilih</span>
                                <span className="text-xs text-primary cursor-pointer hover:underline">Edit</span>
                            </div>
                            <div className="space-y-2 max-h-40 overflow-y-auto hide-scrollbar">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-800 line-clamp-1">1x Paket Gold Prasmanan</span>
                                    <span className="font-medium text-gray-600 text-xs whitespace-nowrap">@55rb</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-800 line-clamp-1">1x Zuppa Soup (100 pax)</span>
                                    <span className="font-medium text-gray-600 text-xs whitespace-nowrap">@18rb</span>
                                </div>
                            </div>
                        </div>

                        {/* Total + Buttons */}
                        <div className="border-t border-gray-100 pt-4 mt-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-gray-600">Estimasi Total</span>
                                <span className="text-xl font-bold text-primary">Rp 5.500.000*</span>
                            </div>
                            <p className="text-[10px] text-gray-400 text-right mb-4">*Harga dapat berubah sesuai negosiasi</p>

                            <Link href="/booking" className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] mb-3 text-center">
                                Kirim Request Quotation
                            </Link>
                            <button className="w-full bg-white border border-accent text-accent hover:bg-accent/5 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Chat Vendor
                            </button>
                        </div>
                    </div>
                </div>

                {/* Helper */}
                <div className="text-center">
                    <p className="text-xs text-gray-400">
                        Butuh bantuan? <a className="text-accent underline" href="#">Hubungi CS CateringHub</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
