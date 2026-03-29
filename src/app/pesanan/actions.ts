'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createDuitkuTransaction } from '@/lib/duitku';

export async function getPaymentMethods(_orderId: string) {
    // Static list of Duitku payment methods (sandbox & production)
    return [
        { code: 'BC', name: 'BCA Virtual Account', image: '', fee: '4000' },
        { code: 'M2', name: 'Mandiri Virtual Account', image: '', fee: '4000' },
        { code: 'I1', name: 'BRI Virtual Account', image: '', fee: '4000' },
        { code: 'B1', name: 'BNI Virtual Account', image: '', fee: '4000' },
        { code: 'BT', name: 'Permata Virtual Account', image: '', fee: '4000' },
        { code: 'OV', name: 'OVO', image: '', fee: '0' },
        { code: 'SA', name: 'ShopeePay', image: '', fee: '0' },
        { code: 'GP', name: 'GoPay', image: '', fee: '0' },
        { code: 'FT', name: 'Alfamart / Indomaret', image: '', fee: '2500' },
        { code: 'VC', name: 'Kartu Kredit / Debit', image: '', fee: '0' },
    ];
}

export async function submitReview(orderId: string, rating: number, comment: string) {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    // Pastikan order milik user ini dan statusnya COMPLETED
    const order = await prisma.customerOrder.findFirst({
        where: { id: orderId, customerId: session.user.id, status: 'COMPLETED' },
        include: { vendor: true },
    });

    if (!order) throw new Error('Order tidak ditemukan atau tidak bisa diulas');

    // Cek belum pernah review order ini
    const existing = await prisma.review.findFirst({ where: { customerOrderId: orderId } });
    if (existing) throw new Error('Order ini sudah diulas');

    // Buat review
    await prisma.review.create({
        data: {
            reviewerId: session.user.id,
            customerOrderId: orderId,
            rating,
            comment: comment || null,
        },
    });

    // Update rata-rata rating vendor
    const reviews = await prisma.review.findMany({
        where: {
            customerOrder: { vendorProfileId: order.vendorProfileId },
        },
        select: { rating: true },
    });

    const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

    await prisma.vendorProfile.update({
        where: { id: order.vendorProfileId },
        data: { rating: Math.round(avgRating * 10) / 10 },
    });

    revalidatePath('/pesanan');
}

export async function createPayment(orderId: string, paymentMethod: string): Promise<{ paymentUrl: string }> {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const order = await prisma.customerOrder.findFirst({
        where: { id: orderId, customerId: session.user.id, status: 'CONFIRMED' },
        include: { customer: true },
    });

    if (!order) throw new Error('Order tidak ditemukan atau belum dikonfirmasi vendor');
    if (!order.totalAmount) throw new Error('Jumlah pembayaran tidak valid');

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const { reference, paymentUrl } = await createDuitkuTransaction({
        merchantOrderId: order.orderNumber,
        paymentAmount: order.totalAmount,
        paymentMethod,
        productDetails: `CateringHub Order #${order.orderNumber}`,
        customerName: order.customer.name ?? 'Customer',
        customerEmail: order.customer.email ?? '',
        callbackUrl: `${appUrl}/api/payment/callback`,
        returnUrl: `${appUrl}/pesanan?payment=success`,
    });

    // Simpan reference Duitku
    await prisma.customerOrder.update({
        where: { id: order.id },
        data: { duitkuReference: reference },
    });

    return { paymentUrl };
}
