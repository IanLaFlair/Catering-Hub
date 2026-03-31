'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function getVendorProfile() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');
    const profile = await prisma.vendorProfile.findUnique({ where: { userId: session.user.id } });
    if (!profile) redirect('/');
    return profile;
}

export interface MenuFormData {
    name: string;
    description: string;
    category: string;
    pricePerPax: number;
    minOrderPax: number;
    items: string[]; // list item dalam paket
    image: string;
}

export async function createMenu(data: MenuFormData) {
    const vendor = await getVendorProfile();

    await prisma.vendorMenu.create({
        data: {
            vendorProfileId: vendor.id,
            name: data.name,
            description: data.description || null,
            category: data.category,
            pricePerPax: data.pricePerPax,
            minOrderPax: data.minOrderPax,
            items: data.items.filter(Boolean),
            image: data.image || null,
            isAvailable: true,
        },
    });

    revalidatePath('/vendor-dashboard/menus');
    redirect('/vendor-dashboard/menus');
}

export async function updateMenu(menuId: string, data: MenuFormData) {
    const vendor = await getVendorProfile();

    await prisma.vendorMenu.updateMany({
        where: { id: menuId, vendorProfileId: vendor.id },
        data: {
            name: data.name,
            description: data.description || null,
            category: data.category,
            pricePerPax: data.pricePerPax,
            minOrderPax: data.minOrderPax,
            items: data.items.filter(Boolean),
            image: data.image || null,
        },
    });

    revalidatePath('/vendor-dashboard/menus');
    redirect('/vendor-dashboard/menus');
}

export async function toggleMenuAvailability(menuId: string, isAvailable: boolean) {
    const vendor = await getVendorProfile();

    await prisma.vendorMenu.updateMany({
        where: { id: menuId, vendorProfileId: vendor.id },
        data: { isAvailable },
    });

    revalidatePath('/vendor-dashboard/menus');
}

export async function deleteMenu(menuId: string) {
    const vendor = await getVendorProfile();

    await prisma.vendorMenu.deleteMany({
        where: { id: menuId, vendorProfileId: vendor.id },
    });

    revalidatePath('/vendor-dashboard/menus');
}
