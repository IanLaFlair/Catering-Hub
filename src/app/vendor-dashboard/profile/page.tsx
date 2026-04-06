import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const vendor = await prisma.vendorProfile.findUnique({
        where: { userId: session.user.id },
        select: {
            businessName: true,
            description: true,
            city: true,
            province: true,
            address: true,
            phone: true,
            logo: true,
            coverImage: true,
            minPax: true,
            maxPax: true,
            priceMin: true,
            priceMax: true,
        },
    });
    if (!vendor) redirect('/');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-main">Profil Bisnis</h1>
                <p className="text-sm text-text-muted mt-1">Informasi ini akan ditampilkan di halaman publik bisnis Anda.</p>
            </div>
            <ProfileForm profile={vendor} />
        </div>
    );
}
