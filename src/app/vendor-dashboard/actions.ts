'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
