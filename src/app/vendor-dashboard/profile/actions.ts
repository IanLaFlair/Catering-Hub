'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function updateProfile(data: {
    businessName: string;
    description: string;
    city: string;
    province: string;
    address: string;
    phone: string;
    logo: string;
    coverImage: string;
    minPax: number;
    maxPax: number;
    priceMin: number;
    priceMax: number;
}) {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    await prisma.vendorProfile.update({
        where: { userId: session.user.id },
        data: {
            businessName: data.businessName,
            description: data.description || null,
            city: data.city || null,
            province: data.province || null,
            address: data.address || null,
            phone: data.phone || null,
            logo: data.logo || null,
            coverImage: data.coverImage || null,
            minPax: data.minPax || null,
            maxPax: data.maxPax || null,
            priceMin: data.priceMin || null,
            priceMax: data.priceMax || null,
        },
    });

    revalidatePath('/vendor-dashboard/profile');
}
