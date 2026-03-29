import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyDuitkuCallback } from '@/lib/duitku';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            merchantCode,
            amount,
            merchantOrderId,
            resultCode,
            reference,
            signature,
        } = body;

        // Verifikasi signature dari Duitku
        const isValid = verifyDuitkuCallback({ merchantCode, amount, merchantOrderId, signature });
        if (!isValid) {
            console.error('[Duitku Callback] Invalid signature for order:', merchantOrderId);
            return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
        }

        const order = await prisma.customerOrder.findUnique({
            where: { orderNumber: merchantOrderId },
        });

        if (!order) {
            console.error('[Duitku Callback] Order not found:', merchantOrderId);
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        if (resultCode === '00') {
            // Pembayaran berhasil
            await prisma.customerOrder.update({
                where: { id: order.id },
                data: {
                    status: 'PROCESSING',
                    duitkuReference: reference,
                    paidAt: new Date(),
                },
            });
            console.log('[Duitku Callback] Payment success for order:', merchantOrderId);
        } else if (resultCode === '01') {
            // Pending - tidak perlu update
            console.log('[Duitku Callback] Payment pending for order:', merchantOrderId);
        } else {
            // Gagal / cancelled
            await prisma.customerOrder.update({
                where: { id: order.id },
                data: { status: 'CANCELLED' },
            });
            console.log('[Duitku Callback] Payment failed for order:', merchantOrderId);
        }

        return NextResponse.json({ message: 'OK' }, { status: 200 });
    } catch (err) {
        console.error('[Duitku Callback] Error:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
