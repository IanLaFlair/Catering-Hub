import { ChevronLeft } from 'lucide-react';

export default function Pagination() {
    return (
        <div className="mt-10 flex items-center justify-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-light bg-white text-text-muted hover:bg-gray-50 transition-colors disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white font-bold shadow-md">
                1
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-light bg-white text-text-main font-medium hover:border-primary hover:text-primary transition-colors">
                2
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-light bg-white text-text-main font-medium hover:border-primary hover:text-primary transition-colors">
                3
            </button>
            <span className="flex items-center justify-center w-10 h-10 text-text-muted">...</span>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-light bg-white text-text-main font-medium hover:border-primary hover:text-primary transition-colors">
                12
            </button>
            <button className="flex items-center justify-center px-4 h-10 rounded-lg border border-border-light bg-white text-text-main font-medium hover:bg-gray-50 transition-colors">
                Next
            </button>
        </div>
    );
}
