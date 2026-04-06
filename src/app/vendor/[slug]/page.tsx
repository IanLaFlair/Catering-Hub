import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import VendorHeader from '@/components/vendor/VendorHeader';
import MenuGrid from '@/components/vendor/MenuGrid';
import QuotationSidebar from '@/components/vendor/QuotationSidebar';

export default async function VendorDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const vendor = await prisma.vendorProfile.findUnique({
        where: { slug },
        include: {
            menus: {
                where: { isAvailable: true },
                orderBy: { createdAt: 'asc' },
            },
            _count: { select: { orders: true } },
        },
    });

    if (!vendor) notFound();

    return (
        <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 pb-20">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 py-6 items-center text-sm">
                <Link href="/" className="text-text-muted hover:text-primary font-medium transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4 text-text-muted" />
                <Link href="/cari" className="text-text-muted hover:text-primary font-medium transition-colors">
                    {vendor.city ?? 'Cari Vendor'}
                </Link>
                <ChevronRight className="w-4 h-4 text-text-muted" />
                <span className="text-accent font-semibold">{vendor.businessName}</span>
            </div>

            {/* Cover Image */}
            <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 bg-orange-50">
                {vendor.coverImage ? (
                    <img
                        src={vendor.coverImage}
                        alt={vendor.businessName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl opacity-30">🍽️</span>
                    </div>
                )}
            </div>

            <VendorHeader
                businessName={vendor.businessName}
                rating={vendor.rating}
                reviewCount={vendor._count.orders}
                city={vendor.city}
                province={vendor.province}
                isVerified={vendor.isVerified}
                minPax={vendor.minPax}
                maxPax={vendor.maxPax}
                createdAt={vendor.createdAt}
                orderCount={vendor._count.orders}
            />

            {/* Navigation Tabs */}
            <div className="sticky top-[73px] z-40 bg-background-light border-b border-gray-200 mb-8 -mx-4 lg:-mx-10 px-4 lg:px-10">
                <div className="flex gap-8 overflow-x-auto hide-scrollbar">
                    <button className="py-4 border-b-2 border-primary text-primary font-bold text-sm whitespace-nowrap">
                        Menu &amp; Paket
                    </button>
                    <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-accent font-medium text-sm whitespace-nowrap transition-colors">
                        Tentang
                    </button>
                    <button className="py-4 border-b-2 border-transparent text-gray-500 hover:text-accent font-medium text-sm whitespace-nowrap transition-colors">
                        Review <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded ml-1 text-gray-600">{vendor._count.orders}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
                <MenuGrid menus={vendor.menus} vendorSlug={slug} />
                <QuotationSidebar
                    vendorSlug={slug}
                    priceMin={vendor.priceMin}
                    priceMax={vendor.priceMax}
                />
            </div>
        </main>
    );
}
