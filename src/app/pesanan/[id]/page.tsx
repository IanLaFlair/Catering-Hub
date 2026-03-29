import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { ArrowLeft, Calendar, Users, MapPin, Clock, CheckCircle2, XCircle, Loader2, Package } from 'lucide-react';
import OrderDetailActions from './OrderDetailActions';

const statusConfig: Record<string, { label: string; colorClass: string; icon: React.ReactNode }> = {
    PENDING: { label: 'Menunggu Konfirmasi', colorClass: 'bg-orange-100 text-orange-700 border-orange-200', icon: <Clock className="w-4 h-4" /> },
    CONFIRMED: { label: 'Dikonfirmasi', colorClass: 'bg-blue-100 text-blue-700 border-blue-200', icon: <CheckCircle2 className="w-4 h-4" /> },
    PROCESSING: { label: 'Diproses', colorClass: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: <Loader2 className="w-4 h-4" /> },
    COMPLETED: { label: 'Selesai', colorClass: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle2 className="w-4 h-4" /> },
    CANCELLED: { label: 'Dibatalkan', colorClass: 'bg-red-100 text-red-700 border-red-200', icon: <XCircle className="w-4 h-4" /> },
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const { id } = await params;

    const order = await prisma.customerOrder.findFirst({
        where: { id, customerId: session.user.id },
        include: {
            vendor: true,
            items: {
                include: { menu: true },
            },
            reviews: true,
        },
    });

    if (!order) notFound();

    const status = statusConfig[order.status] ?? { label: order.status, colorClass: 'bg-gray-100 text-gray-700 border-gray-200', icon: null };

    const subtotal = order.items.reduce((s, i) => s + i.subtotal, 0);
    const serviceFee = order.totalAmount ? order.totalAmount - subtotal : 0;

    return (
        <main className="min-h-screen bg-[#faf8f5] pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                {/* Back */}
                <Link
                    href="/pesanan"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Riwayat Pesanan
                </Link>

                {/* Header Card */}
                <div className="bg-white rounded-2xl border border-[#f3ede7] p-6 mb-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Nomor Pesanan</p>
                            <h1 className="text-xl font-bold text-secondary font-mono">#{order.orderNumber}</h1>
                            <p className="text-xs text-gray-400 mt-1">
                                Dibuat {format(order.createdAt, "dd MMM yyyy, HH:mm", { locale: localeId })}
                            </p>
                        </div>
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${status.colorClass}`}>
                            {status.icon}
                            {status.label}
                        </span>
                    </div>
                </div>

                {/* Vendor */}
                <div className="bg-white rounded-2xl border border-[#f3ede7] p-6 mb-4">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Vendor</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Package className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <p className="font-bold text-[#1b140e] text-lg">{order.vendor.businessName}</p>
                            <p className="text-sm text-gray-500">{order.vendor.city}{order.vendor.province ? `, ${order.vendor.province}` : ''}</p>
                        </div>
                    </div>
                </div>

                {/* Event Details */}
                <div className="bg-white rounded-2xl border border-[#f3ede7] p-6 mb-4">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Detail Acara</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                <Calendar className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-0.5">Tanggal Acara</p>
                                <p className="font-semibold text-[#1b140e]">
                                    {format(order.eventDate, "EEEE, dd MMMM yyyy", { locale: localeId })}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {format(order.eventDate, "HH:mm", { locale: localeId })} WIB
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                <Users className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-0.5">Jumlah Tamu</p>
                                <p className="font-semibold text-[#1b140e]">{order.guestCount.toLocaleString('id-ID')} pax</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 sm:col-span-2">
                            <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-0.5">Jenis Acara</p>
                                <p className="font-semibold text-[#1b140e]">{order.eventType}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl border border-[#f3ede7] p-6 mb-4">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Menu Dipesan</h2>
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
                                        <p className="font-semibold text-[#1b140e] truncate">{item.menu.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.quantity} pax × Rp {item.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-bold text-[#1b140e] shrink-0">
                                    Rp {item.subtotal.toLocaleString('id-ID')}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Price Summary */}
                    <div className="mt-4 pt-4 border-t border-[#f3ede7] space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Biaya Layanan (5%)</span>
                            <span>Rp {serviceFee.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#1b140e] text-lg pt-2 border-t border-[#f3ede7]">
                            <span>Total</span>
                            <span className="text-primary">Rp {(order.totalAmount ?? 0).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Info (if paid) */}
                {order.paidAt && (
                    <div className="bg-green-50 rounded-2xl border border-green-200 p-6 mb-4">
                        <h2 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3">Informasi Pembayaran</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-green-700">Status</span>
                                <span className="font-semibold text-green-800">Lunas</span>
                            </div>
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
                <OrderDetailActions
                    orderId={order.id}
                    orderStatus={order.status}
                    hasReview={order.reviews.length > 0}
                    vendorName={order.vendor.businessName}
                    vendorImage={null}
                    orderNumber={order.orderNumber}
                />
            </div>
        </main>
    );
}
