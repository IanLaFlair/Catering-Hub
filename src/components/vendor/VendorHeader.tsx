import { Star, MapPin, BadgeCheck, PartyPopper, Users, History, Share2, Heart } from 'lucide-react';

interface VendorHeaderProps {
    businessName: string;
    rating: number;
    reviewCount: number;
    city: string | null;
    province: string | null;
    isVerified: boolean;
    minPax: number | null;
    maxPax: number | null;
    createdAt: Date;
    orderCount: number;
}

export default function VendorHeader({
    businessName, rating, reviewCount, city, province,
    isVerified, minPax, maxPax, createdAt, orderCount,
}: VendorHeaderProps) {
    const location = [city, province].filter(Boolean).join(', ');
    const joinYear = new Date(createdAt).getFullYear();

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-text-main text-3xl md:text-4xl font-bold leading-tight">{businessName}</h1>
                    {isVerified && (
                        <div className="bg-blue-100 text-accent px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold border border-blue-200">
                            <BadgeCheck className="w-4 h-4 text-accent fill-accent/20" />
                            Verified Vendor
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4b3a2f] mb-4">
                    <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-primary fill-primary" />
                        <span className="font-bold text-text-main">{rating.toFixed(1)}</span>
                        <span className="text-text-muted">({reviewCount} Pesanan)</span>
                    </div>
                    {location && (
                        <>
                            <span className="text-gray-300">|</span>
                            <div className="flex items-center gap-1">
                                <MapPin className="w-5 h-5 text-text-muted" />
                                <span>{location}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-wrap gap-3 md:gap-6">
                    <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-2 rounded-lg shadow-sm">
                        <div className="p-1.5 bg-orange-100 rounded-full text-primary">
                            <PartyPopper className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Pengalaman</span>
                            <span className="text-sm font-bold text-accent">{orderCount}+ Pesanan</span>
                        </div>
                    </div>
                    {(minPax || maxPax) && (
                        <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-2 rounded-lg shadow-sm">
                            <div className="p-1.5 bg-blue-100 rounded-full text-accent">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500">Kapasitas</span>
                                <span className="text-sm font-bold text-accent">
                                    {minPax ?? '?'} - {maxPax ?? '?'} Pax
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-2 rounded-lg shadow-sm">
                        <div className="p-1.5 bg-green-100 rounded-full text-green-600">
                            <History className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Bergabung</span>
                            <span className="text-sm font-bold text-accent">Sejak {joinYear}</span>
                        </div>
                    </div>
                </div>
            </div>

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
