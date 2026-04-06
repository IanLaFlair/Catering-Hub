import SearchFilters from '@/components/search/SearchFilters';
import VendorCard from '@/components/search/VendorCard';
import Pagination from '@/components/search/Pagination';
import { prisma } from '@/lib/prisma';

const PAGE_SIZE = 8;

function formatPrice(price: number) {
    if (price >= 1_000_000) return `Rp ${(price / 1_000_000).toFixed(0)}jt`;
    if (price >= 1_000) return `Rp ${(price / 1_000).toFixed(0)}k`;
    return `Rp ${price}`;
}

export default async function CariPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;
    const page = Math.max(1, Number(params.page) || 1);
    const city = params.city;
    const sort = params.sort || 'rating';
    const priceMin = params.priceMin ? Number(params.priceMin) : undefined;
    const priceMax = params.priceMax ? Number(params.priceMax) : undefined;

    const where = {
        isActive: true,
        ...(city && { city: { contains: city, mode: 'insensitive' as const } }),
        ...(priceMin && { priceMax: { gte: priceMin } }),
        ...(priceMax && { priceMin: { lte: priceMax } }),
    };

    const [vendors, total] = await Promise.all([
        prisma.vendorProfile.findMany({
            where,
            include: {
                menus: {
                    where: { isAvailable: true },
                    select: { category: true },
                    take: 4,
                },
                _count: { select: { orders: true } },
            },
            orderBy: sort === 'price' ? { priceMin: 'asc' } : { rating: 'desc' },
            skip: (page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
        }),
        prisma.vendorProfile.count({ where }),
    ]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const vendorCards = vendors.map((v: typeof vendors[number]) => {
        const categories = [...new Set(v.menus.map((m: { category: string }) => m.category as string))];
        const image = v.logo ?? v.coverImage ?? null;

        return {
            name: v.businessName,
            slug: v.slug,
            location: [v.city, v.province].filter(Boolean).join(', ') || v.address || '-',
            rating: v.rating,
            reviewCount: v._count.orders,
            description: v.description ?? '',
            tags: categories,
            price: v.priceMin ? formatPrice(v.priceMin) : 'Hubungi',
            priceUnit: 'pax',
            image,
            badge: v.isVerified ? ('verified' as const) : undefined,
        };
    });

    return (
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 lg:px-10 py-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-main">
                    {total} Vendor Ditemukan{city ? ` di ${city}` : ''}
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <SearchFilters />

                <div className="flex-1">
                    {vendorCards.length === 0 ? (
                        <div className="text-center py-20 text-text-muted">
                            <p className="text-lg font-medium">Belum ada vendor yang terdaftar</p>
                            <p className="text-sm mt-1">Coba ubah filter pencarian</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {vendorCards.map((vendor) => (
                                <VendorCard key={vendor.slug} {...vendor} />
                            ))}
                        </div>
                    )}
                    {totalPages > 1 && (
                        <Pagination currentPage={page} totalPages={totalPages} />
                    )}
                </div>
            </div>
        </main>
    );
}
