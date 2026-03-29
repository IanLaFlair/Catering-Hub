import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import DashboardOrderActions from '../DashboardOrderActions';

function formatRupiah(n: number) {
    if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)}M`;
    if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
    return 'Rp ' + n.toLocaleString('id-ID');
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
    PENDING:    { label: 'Menunggu Konfirmasi', color: 'bg-orange-100 text-orange-700' },
    CONFIRMED:  { label: 'Menunggu Pembayaran', color: 'bg-blue-100 text-blue-700' },
    PROCESSING: { label: 'Diproses', color: 'bg-indigo-100 text-indigo-700' },
    COMPLETED:  { label: 'Selesai', color: 'bg-green-100 text-green-700' },
    CANCELLED:  { label: 'Dibatalkan', color: 'bg-red-100 text-red-700' },
};

const STATUS_TABS = [
    { key: 'all', label: 'Semua' },
    { key: 'PENDING', label: 'Menunggu' },
    { key: 'CONFIRMED', label: 'Dikonfirmasi' },
    { key: 'PROCESSING', label: 'Diproses' },
    { key: 'COMPLETED', label: 'Selesai' },
    { key: 'CANCELLED', label: 'Dibatalkan' },
];

export default async function VendorOrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const { status } = await searchParams;

    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId: session.user.id },
    });
    if (!vendorProfile) redirect('/');

    const activeTab = status && STATUS_TABS.find(t => t.key === status) ? status : 'all';

    const orders = await prisma.customerOrder.findMany({
        where: {
            vendorProfileId: vendorProfile.id,
            ...(activeTab !== 'all' ? { status: activeTab } : {}),
        },
        include: {
            customer: { select: { name: true, email: true } },
            items: { include: { menu: { select: { name: true } } } },
        },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/vendor-dashboard"
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Dashboard
                </Link>
                <h1 className="text-2xl font-bold text-text-main">Semua Pesanan</h1>
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap gap-2">
                {STATUS_TABS.map((tab) => (
                    <Link
                        key={tab.key}
                        href={tab.key === 'all' ? '/vendor-dashboard/orders' : `/vendor-dashboard/orders?status=${tab.key}`}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                            activeTab === tab.key
                                ? 'bg-primary text-white'
                                : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                        }`}
                    >
                        {tab.label}
                    </Link>
                ))}
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl border border-border-light overflow-hidden">
                {orders.length === 0 ? (
                    <div className="text-center py-16 text-text-muted">
                        <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">Tidak ada pesanan</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border-light">
                        {orders.map((order) => {
                            const statusCfg = STATUS_CONFIG[order.status] ?? { label: order.status, color: 'bg-gray-100 text-gray-700' };
                            const menuSummary = order.items.map(i => i.menu.name).join(', ');

                            return (
                                <div key={order.id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                            <span className="font-semibold text-text-main font-mono text-sm">#{order.orderNumber}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusCfg.color}`}>
                                                {statusCfg.label}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-text-main">{order.customer.name}</p>
                                        <p className="text-xs text-text-muted truncate max-w-xs">{menuSummary}</p>
                                        <p className="text-xs text-text-muted mt-1">
                                            {order.eventType} • {format(new Date(order.eventDate), 'dd MMM yyyy', { locale: id })} • {order.guestCount} pax
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4 shrink-0">
                                        {order.totalAmount != null && (
                                            <span className="font-bold text-text-main whitespace-nowrap">
                                                {formatRupiah(order.totalAmount)}
                                            </span>
                                        )}
                                        <DashboardOrderActions orderId={order.id} status={order.status} />
                                        <Link
                                            href={`/vendor-dashboard/orders/${order.id}`}
                                            className="text-xs text-primary font-semibold hover:underline whitespace-nowrap"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
