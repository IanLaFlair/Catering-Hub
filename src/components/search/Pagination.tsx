'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(page));
        router.push(`/cari?${params.toString()}`);
    };

    // Tampilkan max 5 halaman dengan ellipsis
    const getPages = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 3) return [1, 2, 3, 4, null, totalPages];
        if (currentPage >= totalPages - 2) return [1, null, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, null, currentPage - 1, currentPage, currentPage + 1, null, totalPages];
    };

    return (
        <div className="mt-10 flex items-center justify-center gap-2">
            <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-light bg-white text-text-muted hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-4 h-4" />
            </button>

            {getPages().map((p, idx) =>
                p === null ? (
                    <span key={`ellipsis-${idx}`} className="flex items-center justify-center w-10 h-10 text-text-muted">
                        ...
                    </span>
                ) : (
                    <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-colors ${
                            p === currentPage
                                ? 'bg-primary text-white font-bold shadow-md'
                                : 'border border-border-light bg-white text-text-main hover:border-primary hover:text-primary'
                        }`}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-4 h-10 rounded-lg border border-border-light bg-white text-text-main font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
