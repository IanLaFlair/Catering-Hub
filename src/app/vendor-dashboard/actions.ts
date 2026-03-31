'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

async function getVendorProfile() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const profile = await prisma.vendorProfile.findUnique({
        where: { userId: session.user.id },
    });
    if (!profile) throw new Error('Vendor profile tidak ditemukan');
    return profile;
}

export async function approveOrder(orderId: string) {
    const vendor = await getVendorProfile();

    await prisma.customerOrder.update({
        where: { id: orderId, vendorProfileId: vendor.id, status: 'PENDING' },
        data: { status: 'CONFIRMED' },
    });

    revalidatePath('/vendor-dashboard');
}

export async function rejectOrder(orderId: string) {
    const vendor = await getVendorProfile();

    await prisma.customerOrder.update({
        where: { id: orderId, vendorProfileId: vendor.id, status: 'PENDING' },
        data: { status: 'CANCELLED' },
    });

    revalidatePath('/vendor-dashboard');
}

export async function completeOrder(orderId: string) {
    const vendor = await getVendorProfile();

    await prisma.customerOrder.update({
        where: { id: orderId, vendorProfileId: vendor.id, status: 'PROCESSING' },
        data: { status: 'COMPLETED' },
    });

    revalidatePath('/vendor-dashboard');
}

export async function checkPaymentStatus(orderId: string): Promise<{ status: string; message: string }> {
    const vendor = await getVendorProfile();

    const order = await prisma.customerOrder.findFirst({
        where: { id: orderId, vendorProfileId: vendor.id, status: 'CONFIRMED' },
    });
    if (!order?.duitkuReference) throw new Error('Referensi pembayaran tidak ditemukan');

    const merchantCode = process.env.DUITKU_MERCHANT_CODE!;
    const apiKey = process.env.DUITKU_API_KEY!;
    const baseUrl = process.env.DUITKU_BASE_URL!;
    const signature = crypto.createHash('md5')
        .update(`${merchantCode}${order.orderNumber}${apiKey}`)
        .digest('hex');

    const res = await fetch(`${baseUrl}/transactionStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantCode, merchantOrderId: order.orderNumber, signature }),
    });

    const data = await res.json();
    console.log('[CheckPayment]', data);

    // statusCode '00' = success
    if (data.statusCode === '00') {
        await prisma.customerOrder.update({
            where: { id: order.id },
            data: { status: 'PROCESSING', paidAt: new Date() },
        });
        revalidatePath('/vendor-dashboard');
        revalidatePath('/vendor-dashboard/orders');
        return { status: 'PROCESSING', message: 'Pembayaran dikonfirmasi! Status diupdate ke Diproses.' };
    }

    return { status: data.statusCode, message: data.statusMessage ?? 'Pembayaran belum diterima' };
}
