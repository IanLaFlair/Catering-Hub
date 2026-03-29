'use client';

import { useState, useTransition } from 'react';
import { Check, X, PackageCheck } from 'lucide-react';
import { approveOrder, rejectOrder, completeOrder } from './actions';

interface DashboardOrderActionsProps {
    orderId: string;
    status: string;
}

export default function DashboardOrderActions({ orderId, status }: DashboardOrderActionsProps) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handle = (action: () => Promise<void>) => {
        setError(null);
        startTransition(async () => {
            try {
                await action();
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Gagal');
            }
        });
    };

    if (status === 'PENDING') {
        return (
            <div className="flex items-center gap-2">
                {error && <span className="text-xs text-red-500">{error}</span>}
                <button
                    onClick={() => handle(() => rejectOrder(orderId))}
                    disabled={isPending}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                    <X className="w-3.5 h-3.5" /> Tolak
                </button>
                <button
                    onClick={() => handle(() => approveOrder(orderId))}
                    disabled={isPending}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                    <Check className="w-3.5 h-3.5" /> Setujui
                </button>
            </div>
        );
    }

    if (status === 'PROCESSING') {
        return (
            <div className="flex items-center gap-2">
                {error && <span className="text-xs text-red-500">{error}</span>}
                <button
                    onClick={() => handle(() => completeOrder(orderId))}
                    disabled={isPending}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                    <PackageCheck className="w-3.5 h-3.5" /> Selesaikan
                </button>
            </div>
        );
    }

    return null;
}
