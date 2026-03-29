import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { TrendingUp, ClipboardList, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import DashboardOrderActions from './DashboardOrderActions';

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

export default async function VendorDashboardPage() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId: session.user.id },
    });
    if (!vendorProfile) redirect('/');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [revenueResult, activeCount, completedCount, recentOrders] = await Promise.all([
        prisma.customerOrder.aggregate({
            where: { vendorProfileId: vendorProfile.id, status: 'COMPLETED' },
            _sum: { totalAmount: true },
        }),
        prisma.customerOrder.count({
            where: {
                vendorProfileId: vendorProfile.id,
                status: { in: ['PENDING', 'CONFIRMED', 'PROCESSING'] },
            },
        }),
        prisma.customerOrder.count({
            where: {
                vendorProfileId: vendorProfile.id,
                status: 'COMPLETED',
                createdAt: { gte: thirtyDaysAgo },
            },
        }),
        prisma.customerOrder.findMany({
            where: { vendorProfileId: vendorProfile.id },
            include: { customer: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
            take: 10,
        }),
    ]);

    const totalRevenue = revenueResult._sum.totalAmount ?? 0;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-text-main">Dashboard</h1>
                <p className="text-text-muted text-sm mt-1">{vendorProfile.businessName}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-border-light p-5 flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-text-muted font-medium">Total Pendapatan</p>
                        <p className="text-xl font-bold text-text-main">{formatRupiah(totalRevenue)}</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-border-light p-5 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <ClipboardList className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs text-text-muted font-medium">Pesanan Aktif</p>
                        <p className="text-xl font-bold text-text-main">{activeCount}</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-border-light p-5 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                        <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-xs text-text-muted font-medium">Selesai (30 hari)</p>
                        <p className="text-xl font-bold text-text-main">{completedCount}</p>
                    </div>
                </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-xl border border-border-light overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
                    <h2 className="font-bold text-text-main">Pesanan Terbaru</h2>
                    <Link href="/vendor-dashboard/orders" className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                        Lihat Semua <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {recentOrders.length === 0 ? (
                    <div className="text-center py-16 text-text-muted">
                        <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">Belum ada pesanan masuk</p>
                        <p className="text-sm mt-1">Pesanan dari customer akan muncul di sini</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border-light">
                        {recentOrders.map((order) => {
                            const statusCfg = STATUS_CONFIG[order.status] ?? { label: order.status, color: 'bg-gray-100 text-gray-700' };
                            return (
                                <div key={order.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-semibold text-text-main font-mono text-sm">#{order.orderNumber}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${statusCfg.color}`}>
                                                {statusCfg.label}
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-main font-medium">{order.customer.name}</p>
                                        <p className="text-xs text-text-muted">
                                            {order.eventType} • {format(new Date(order.eventDate), 'dd MMM yyyy', { locale: id })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {order.totalAmount && (
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
