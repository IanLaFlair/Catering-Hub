import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import OrderList from '@/components/pesanan/OrderList';

export default async function OrderHistoryPage() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const orders = await prisma.customerOrder.findMany({
        where: { customerId: session.user.id },
        include: {
            vendor: {
                select: {
                    businessName: true,
                    menus: {
                        take: 1,
                        select: { image: true },
                    },
                },
            },
            items: {
                take: 2,
                include: {
                    menu: { select: { name: true } },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    const mapped = orders.map((o) => {
        const vendorImage = o.vendor.menus[0]?.image ?? null;
        const firstItem = o.items[0]?.menu.name ?? '';
        const extra = o.items.length > 1 ? ` + ${o.items.length - 1} Menu Lainnya` : '';
        const itemsSummary = firstItem ? `${firstItem}${extra}` : 'Lihat detail pesanan';

        return {
            id: o.id,
            orderNumber: o.orderNumber,
            vendorName: o.vendor.businessName,
            vendorImage,
            eventType: o.eventType,
            eventDate: o.eventDate.toISOString(),
            status: o.status,
            totalAmount: o.totalAmount ?? 0,
            itemsSummary,
        };
    });

    return (
        <div className="min-h-screen bg-[#fcfaf8] py-8 lg:py-12">
            <div className="max-w-5xl mx-auto px-5">
                <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-[#1b140e] mb-2 text-center lg:text-left">
                        Riwayat Pesanan
                    </h1>
                    <p className="text-gray-600 text-center lg:text-left">
                        Lacak status pesanan catering Anda
                    </p>
                </div>

                <OrderList orders={mapped} />
            </div>
        </div>
    );
}
