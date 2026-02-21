import { MapPin, Star, BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface VendorCardProps {
    name: string;
    slug: string;
    location: string;
    rating: number;
    reviewCount: number;
    description: string;
    tags: string[];
    price: string;
    priceUnit: string;
    image: string;
    badge?: 'promoted' | 'verified' | 'partner';
}

export default function VendorCard({
    name, slug, location, rating, reviewCount, description, tags, price, priceUnit, image, badge
}: VendorCardProps) {
    return (
        <article className={`bg-white border ${badge === 'promoted' ? 'border-primary/30' : 'border-border-light'} rounded-lg shadow-soft hover:shadow-card transition-shadow flex flex-col sm:flex-row overflow-hidden group`}>
            {/* Image */}
            <div className="relative w-full sm:w-[220px] h-48 sm:h-auto shrink-0 overflow-hidden">
                {badge === 'promoted' && (
                    <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        Promoted
                    </div>
                )}
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
                <div>
                    {/* Name + Badge */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-text-main leading-tight group-hover:text-primary transition-colors">
                                {name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-text-muted">
                                <MapPin className="w-4 h-4" />
                                <span>{location}</span>
                            </div>
                        </div>
                        {badge === 'verified' && (
                            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-100">
                                <BadgeCheck className="w-3.5 h-3.5" />
                                Verified
                            </div>
                        )}
                        {badge === 'partner' && (
                            <div className="flex items-center gap-1 bg-blue-50 text-secondary px-2 py-1 rounded text-xs font-bold border border-blue-100">
                                Partner
                            </div>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 my-2">
                        <Star className="w-[18px] h-[18px] text-amber-400 fill-amber-400" />
                        <span className="font-bold text-text-main">{rating}</span>
                        <span className="text-text-muted text-sm">({reviewCount} ulasan)</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-main/80 line-clamp-2 mb-3">{description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-medium bg-background-light text-text-muted px-2 py-1 rounded border border-border-light">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between border-t border-border-light pt-3 mt-auto">
                    <div>
                        <p className="text-xs text-text-muted">Mulai dari</p>
                        <p className="text-lg font-bold text-primary">
                            {price}<span className="text-xs font-normal text-text-muted">/{priceUnit}</span>
                        </p>
                    </div>
                    <Link
                        href={`/vendor/${slug}`}
                        className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </article>
    );
}
