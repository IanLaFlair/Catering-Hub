import { Star, MapPin, BadgeCheck, PartyPopper, Users, History, Share2, Heart } from 'lucide-react';

export default function VendorHeader() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
                {/* Name + Verified */}
                <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-text-main text-3xl md:text-4xl font-bold leading-tight">Sari Rasa Catering</h1>
                    <div className="bg-blue-100 text-accent px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold border border-blue-200">
                        <BadgeCheck className="w-4 h-4 text-accent fill-accent/20" />
                        Verified Vendor
                    </div>
                </div>

                {/* Rating + Location */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4b3a2f] mb-4">
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-primary fill-primary" />
                        <span className="font-bold text-text-main">4.8</span>
                        <span className="text-text-muted">(120 Review)</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <MapPin className="w-5 h-5 text-text-muted" />
                        <span>Jakarta Selatan, DKI Jakarta</span>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-3 md:gap-6">
                    <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-2 rounded-lg shadow-sm">
                        <div className="p-1.5 bg-orange-100 rounded-full text-primary">
                            <PartyPopper className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Pengalaman</span>
                            <span className="text-sm font-bold text-accent">500+ Acara</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-2 rounded-lg shadow-sm">
                        <div className="p-1.5 bg-blue-100 rounded-full text-accent">
                            <Users className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Kapasitas</span>
                            <span className="text-sm font-bold text-accent">50 - 2000 Pax</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-2 rounded-lg shadow-sm">
                        <div className="p-1.5 bg-green-100 rounded-full text-green-600">
                            <History className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Bergabung</span>
                            <span className="text-sm font-bold text-accent">Sejak 2018</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4 md:mt-0 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                    Share
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5" />
                    Simpan
                </button>
            </div>
        </div>
    );
}
