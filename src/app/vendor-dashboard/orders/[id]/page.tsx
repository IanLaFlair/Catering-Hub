import { redirect, notFound } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { ArrowLeft, Calendar, Users, MapPin, Package, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import DashboardOrderActions from '../../DashboardOrderActions';

function formatRupiah(n: number) {
    return 'Rp ' + n.toLocaleString('id-ID');
}

const STATUS_CONFIG: Record<string, { label: string; colorClass: string; icon: React.ReactNode }> = {
    PENDING:    { label: 'Menunggu Konfirmasi', colorClass: 'bg-orange-100 text-orange-700 border-orange-200', icon: <Clock className="w-4 h-4" /> },
    CONFIRMED:  { label: 'Menunggu Pembayaran', colorClass: 'bg-blue-100 text-blue-700 border-blue-200', icon: <CheckCircle2 className="w-4 h-4" /> },
    PROCESSING: { label: 'Diproses', colorClass: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: <Loader2 className="w-4 h-4" /> },
    COMPLETED:  { label: 'Selesai', colorClass: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle2 className="w-4 h-4" /> },
    CANCELLED:  { label: 'Dibatalkan', colorClass: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle className="w-4 h-4" /> },
};

export default async function VendorOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const { id } = await params;

    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId: session.user.id },
    });
    if (!vendorProfile) redirect('/');

    const order = await prisma.customerOrder.findFirst({
        where: { id, vendorProfileId: vendorProfile.id },
        include: {
            customer: { select: { name: true, email: true } },
            items: { include: { menu: true } },
        },
    });

    if (!order) notFound();

    const status = STATUS_CONFIG[order.status] ?? { label: order.status, colorClass: 'bg-gray-100 text-gray-700 border-gray-200', icon: null };
    const subtotal = order.items.reduce((s, i) => s + i.subtotal, 0);
    const serviceFee = order.totalAmount ? order.totalAmount - subtotal : 0;

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/vendor-dashboard/orders"
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Semua Pesanan
                </Link>
            </div>

            {/* Order Header Card */}
            <div className="bg-white rounded-xl border border-border-light p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Nomor Pesanan</p>
                        <h1 className="text-xl font-bold text-secondary font-mono">#{order.orderNumber}</h1>
                        <p className="text-xs text-gray-400 mt-1">
                            Masuk {format(order.createdAt, "dd MMM yyyy, HH:mm", { locale: localeId })}
                        </p>
                    </div>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${status.colorClass}`}>
                        {status.icon}
                        {status.label}
                    </span>
                </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-xl border border-border-light p-6">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Informasi Customer</h2>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                        {order.customer.name?.charAt(0).toUpperCase() ?? 'C'}
                    </div>
                    <div>
                        <p className="font-bold text-text-main">{order.customer.name}</p>
                        <p className="text-sm text-text-muted">{order.customer.email}</p>
                    </div>
                </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-xl border border-border-light p-6">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Detail Acara</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                            <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-0.5">Tanggal Acara</p>
                            <p className="font-semibold text-text-main">
                                {format(order.eventDate, "EEEE, dd MMMM yyyy", { locale: localeId })}
                            </p>
                            <p className="text-sm text-gray-500">
                                {format(order.eventDate, "HH:mm")} WIB
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-0.5">Jumlah Tamu</p>
                            <p className="font-semibold text-text-main">{order.guestCount.toLocaleString('id-ID')} pax</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 sm:col-span-2">
                        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-0.5">Jenis Acara</p>
                            <p className="font-semibold text-text-main">{order.eventType}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl border border-border-light p-6">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Menu Dipesan</h2>
                <div className="divide-y divide-[#f3ede7]">
                    {order.items.map((item) => (
                        <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                                {item.menu.image ? (
                                    <img
                                        src={item.menu.image}
                                        alt={item.menu.name}
                                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-100"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                        <Package className="w-5 h-5 text-primary/50" />
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="font-semibold text-text-main truncate">{item.menu.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.quantity} pax × {formatRupiah(item.price)}
                                    </p>
                                </div>
                            </div>
                            <p className="font-bold text-text-main shrink-0">{formatRupiah(item.subtotal)}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[#f3ede7] space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>{formatRupiah(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Biaya Layanan (5%)</span>
                        <span>{formatRupiah(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-text-main text-lg pt-2 border-t border-[#f3ede7]">
                        <span>Total</span>
                        <span className="text-primary">{formatRupiah(order.totalAmount ?? 0)}</span>
                    </div>
                </div>
            </div>

            {/* Payment Info */}
            {order.paidAt && (
                <div className="bg-green-50 rounded-xl border border-green-200 p-6">
                    <h2 className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">Pembayaran Diterima</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-green-700">Dibayar pada</span>
                            <span className="font-semibold text-green-800">
                                {format(order.paidAt, "dd MMM yyyy, HH:mm", { locale: localeId })}
                            </span>
                        </div>
                        {order.duitkuReference && (
                            <div className="flex justify-between">
                                <span className="text-green-700">Referensi</span>
                                <span className="font-mono text-green-800 text-xs">{order.duitkuReference}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Actions */}
            {(order.status === 'PENDING' || order.status === 'PROCESSING') && (
                <div className="bg-white rounded-xl border border-border-light p-6">
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Aksi</h2>
                    <DashboardOrderActions orderId={order.id} status={order.status} />
                </div>
            )}
        </div>
    );
}
