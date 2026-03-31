import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyDuitkuCallback } from '@/lib/duitku';

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get('content-type') ?? '';

        let merchantCode: string, amount: string, merchantOrderId: string;
        let resultCode: string, reference: string, signature: string;

        // Duitku sends form-encoded, but handle JSON fallback too
        if (contentType.includes('application/json')) {
            const body = await req.json();
            ({ merchantCode, amount, merchantOrderId, resultCode, reference, signature } = body);
        } else {
            const text = await req.text();
            console.log('[Duitku Callback] raw body:', text);
            const params = new URLSearchParams(text);
            merchantCode = params.get('merchantCode') ?? '';
            amount = params.get('amount') ?? '';
            merchantOrderId = params.get('merchantOrderId') ?? '';
            resultCode = params.get('resultCode') ?? '';
            reference = params.get('reference') ?? '';
            signature = params.get('signature') ?? '';
        }

        console.log('[Duitku Callback]', { merchantOrderId, resultCode, reference });

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
            await prisma.customerOrder.update({
                where: { id: order.id },
                data: { status: 'PROCESSING', duitkuReference: reference, paidAt: new Date() },
            });
            console.log('[Duitku Callback] Payment success:', merchantOrderId);
        } else if (resultCode === '01') {
            console.log('[Duitku Callback] Payment pending:', merchantOrderId);
        } else {
            await prisma.customerOrder.update({
                where: { id: order.id },
                data: { status: 'CANCELLED' },
            });
            console.log('[Duitku Callback] Payment failed:', merchantOrderId);
        }

        return NextResponse.json({ message: 'OK' });
    } catch (err) {
        console.error('[Duitku Callback] Error:', err);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
