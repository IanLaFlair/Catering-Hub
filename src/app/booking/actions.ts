'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface CartItem {
    menuId: string;
    name: string;
    pricePerPax: number;
    qty: number;
}

interface EventDetails {
    eventType: string;
    eventDate: string;
    eventTime: string;
    location: string;
    city: string;
    guestCount: number;
    notes: string;
}

export async function createOrder(
    vendorId: string,
    cart: CartItem[],
    details: EventDetails
): Promise<{ orderNumber: string; totalAmount: number }> {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const subtotal = cart.reduce((sum, item) => sum + item.pricePerPax * item.qty, 0);
    const serviceFee = Math.round(subtotal * 0.05);
    const total = subtotal + serviceFee;

    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randPart = Math.random().toString(36).slice(2, 7).toUpperCase();
    const orderNumber = `ORD-${datePart}-${randPart}`;

    const eventDate = new Date(`${details.eventDate}T${details.eventTime || '09:00'}:00`);

    const order = await prisma.customerOrder.create({
        data: {
            orderNumber,
            customerId: session.user.id,
            vendorProfileId: vendorId,
            eventType: details.eventType,
            eventDate,
            guestCount: details.guestCount,
            status: 'PENDING',
            totalAmount: total,
            items: {
                create: cart.map((item) => ({
                    vendorMenuId: item.menuId,
                    quantity: item.qty,
                    price: item.pricePerPax,
                    subtotal: item.pricePerPax * item.qty,
                })),
            },
        },
    });

    return { orderNumber: order.orderNumber, totalAmount: total };
}
