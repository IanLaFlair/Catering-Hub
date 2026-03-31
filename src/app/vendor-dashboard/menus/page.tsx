import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, UtensilsCrossed } from 'lucide-react';
import MenuCard from './MenuCard';

const CATEGORY_LABELS: Record<string, string> = {
    PRASMANAN: 'Prasmanan',
    NASI_BOX: 'Nasi Box',
    SNACK_BOX: 'Snack Box',
    WEDDING: 'Wedding',
    CORPORATE: 'Corporate',
    LAINNYA: 'Lainnya',
};

export default async function MenusPage() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const vendor = await prisma.vendorProfile.findUnique({
        where: { userId: session.user.id },
        include: {
            menus: { orderBy: { createdAt: 'desc' } },
        },
    });
    if (!vendor) redirect('/');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">Kelola Menu</h1>
                    <p className="text-sm text-text-muted mt-1">{vendor.menus.length} menu terdaftar</p>
                </div>
                <Link
                    href="/vendor-dashboard/menus/tambah"
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Menu
                </Link>
            </div>

            {vendor.menus.length === 0 ? (
                <div className="bg-white rounded-2xl border border-border-light p-16 text-center">
                    <UtensilsCrossed className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="font-semibold text-text-main mb-2">Belum ada menu</p>
                    <p className="text-sm text-text-muted mb-6">Tambahkan paket menu catering Anda agar pelanggan bisa memesan.</p>
                    <Link
                        href="/vendor-dashboard/menus/tambah"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Menu Pertama
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vendor.menus.map((menu) => (
                        <MenuCard
                            key={menu.id}
                            menu={{
                                id: menu.id,
                                name: menu.name,
                                category: CATEGORY_LABELS[menu.category] ?? menu.category,
                                pricePerPax: menu.pricePerPax,
                                minOrderPax: menu.minOrderPax,
                                isAvailable: menu.isAvailable,
                                image: menu.image,
                                description: menu.description,
                                items: Array.isArray(menu.items) ? menu.items as string[] : [],
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
