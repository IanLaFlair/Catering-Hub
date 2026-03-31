import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MenuForm from '../MenuForm';

export default function TambahMenuPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Link href="/vendor-dashboard/menus" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Kelola Menu
                </Link>
                <h1 className="text-2xl font-bold text-text-main">Tambah Menu Baru</h1>
            </div>
            <MenuForm />
        </div>
    );
}
