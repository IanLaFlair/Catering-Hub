import { Calendar, Users, MessageSquare, ReceiptText } from 'lucide-react';
import Link from 'next/link';

interface QuotationSidebarProps {
    vendorSlug: string;
    priceMin: number | null;
    priceMax: number | null;
}

function formatPrice(price: number) {
    if (price >= 1_000_000) return `Rp ${(price / 1_000_000).toFixed(1).replace('.0', '')}jt`;
    if (price >= 1_000) return `Rp ${(price / 1_000).toFixed(0)}k`;
    return `Rp ${price.toLocaleString('id-ID')}`;
}

export default function QuotationSidebar({ vendorSlug, priceMin, priceMax }: QuotationSidebarProps) {
    const priceRange = priceMin && priceMax
        ? `${formatPrice(priceMin)} – ${formatPrice(priceMax)}/pax`
        : priceMin
        ? `Mulai ${formatPrice(priceMin)}/pax`
        : 'Hubungi vendor';

    return (
        <div className="lg:col-span-4 relative h-full">
            <div className="sticky top-28 space-y-4">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-accent/5">
                        <h3 className="font-bold text-lg text-accent flex items-center gap-2">
                            <ReceiptText className="w-5 h-5" />
                            Request Quotation
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Harga: <span className="font-semibold text-accent">{priceRange}</span>
                        </p>
                    </div>

                    <div className="p-5 space-y-4">
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

                        <div className="border-t border-gray-100 pt-4 mt-2">
                            <Link
                                href={`/booking?vendor=${vendorSlug}`}
                                className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] mb-3 text-center"
                            >
                                Kirim Request Quotation
                            </Link>
                            <button className="w-full bg-white border border-accent text-accent hover:bg-accent/5 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Chat Vendor
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-xs text-gray-400">
                        Butuh bantuan? <a className="text-accent underline" href="#">Hubungi CS CateringHub</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
