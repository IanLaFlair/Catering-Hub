import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BookingClient from './BookingClient';

export default async function BookingPage({
    searchParams,
}: {
    searchParams: Promise<{ vendor?: string }>;
}) {
    const { vendor: slug } = await searchParams;

    if (!slug) redirect('/cari');

    const vendor = await prisma.vendorProfile.findUnique({
        where: { slug },
        include: {
            menus: {
                where: { isAvailable: true },
                orderBy: { category: 'asc' },
            },
        },
    });

    if (!vendor) redirect('/cari');

    // Serialize untuk client component
    const vendorData = {
        id: vendor.id,
        slug: vendor.slug,
        businessName: vendor.businessName,
        city: vendor.city ?? '',
        rating: vendor.rating,
        menus: vendor.menus.map((m) => ({
            id: m.id,
            name: m.name,
            category: m.category,
            description: m.description ?? '',
            items: Array.isArray(m.items) ? (m.items as string[]) : [],
            pricePerPax: m.pricePerPax,
            minOrderPax: m.minOrderPax,
            image: m.image,
        })),
    };

    return (
        <main className="min-h-screen bg-background-light">
            <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-10 pb-20">
                <BookingClient vendor={vendorData} />
            </div>
        </main>
    );
}
