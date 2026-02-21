import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import PhotoGallery from '@/components/vendor/PhotoGallery';
import VendorHeader from '@/components/vendor/VendorHeader';
import MenuGrid from '@/components/vendor/MenuGrid';
import QuotationSidebar from '@/components/vendor/QuotationSidebar';

export default function VendorDetailPage() {
    return (
        <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 pb-20">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 py-6 items-center text-sm">
                <Link href="/" className="text-text-muted hover:text-primary font-medium transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 text-text-muted" />
                <Link href="/cari" className="text-text-muted hover:text-primary font-medium transition-colors">Jakarta Selatan</Link>
                <ChevronRight className="w-4 h-4 text-text-muted" />
                <span className="text-accent font-semibold">Sari Rasa Catering</span>
            </div>

            {/* Hero Gallery */}
            <PhotoGallery />

            {/* Vendor Header Info */}
            <VendorHeader />

            {/* Sticky Navigation Tabs */}
            <div className="sticky top-[73px] z-40 bg-background-light border-b border-gray-200 mb-8 -mx-4 lg:-mx-10 px-4 lg:px-10">
                <div className="flex gap-8 overflow-x-auto hide-scrollbar">
                    <button className="py-4 border-b-2 border-primary text-primary font-bold text-sm whitespace-nowrap">
                        Menu &amp; Paket
                    </button>
                    <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-accent font-medium text-sm whitespace-nowrap transition-colors">
                        Tentang
                    </button>
                    <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-accent font-medium text-sm whitespace-nowrap transition-colors">
                        Review <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded ml-1 text-gray-600">120</span>
                    </button>
                    <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-accent font-medium text-sm whitespace-nowrap transition-colors">
                        Portfolio
                    </button>
                    <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-accent font-medium text-sm whitespace-nowrap transition-colors">
                        Syarat &amp; Ketentuan
                    </button>
                </div>
            </div>

            {/* Content: Menu + Quotation Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
                <MenuGrid />
                <QuotationSidebar />
            </div>
        </main>
    );
}
