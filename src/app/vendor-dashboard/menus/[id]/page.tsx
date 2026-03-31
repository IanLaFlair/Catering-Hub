import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MenuForm from '../MenuForm';

export default async function EditMenuPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const { id } = await params;

    const vendor = await prisma.vendorProfile.findUnique({ where: { userId: session.user.id } });
    if (!vendor) redirect('/');

    const menu = await prisma.vendorMenu.findFirst({
        where: { id, vendorProfileId: vendor.id },
    });
    if (!menu) notFound();

    const defaultValues = {
        name: menu.name,
        description: menu.description ?? '',
        category: menu.category,
        pricePerPax: menu.pricePerPax,
        minOrderPax: menu.minOrderPax,
        items: Array.isArray(menu.items) ? menu.items as string[] : [],
        image: menu.image ?? '',
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Link href="/vendor-dashboard/menus" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Kelola Menu
                </Link>
                <h1 className="text-2xl font-bold text-text-main">Edit Menu</h1>
            </div>
            <MenuForm menuId={menu.id} defaultValues={defaultValues} />
        </div>
    );
}
