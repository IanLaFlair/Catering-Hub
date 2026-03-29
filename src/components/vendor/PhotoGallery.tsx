const FALLBACK = '/placeholder-vendor.jpg';

interface PhotoGalleryProps {
    images: string[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
    // Pad dengan fallback sampai 5
    const gallery = Array.from({ length: 5 }, (_, i) => images[i] ?? FALLBACK);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 h-[300px] md:h-[400px]">
            <div className="md:col-span-2 relative group overflow-hidden rounded-xl">
                <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${gallery[0]}")` }}
                />
            </div>

            <div className="md:col-span-1 flex flex-col gap-3">
                <div className="h-1/2 relative group overflow-hidden rounded-xl">
                    <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${gallery[1]}")` }}
                    />
                </div>
                <div className="h-1/2 relative group overflow-hidden rounded-xl">
                    <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${gallery[2]}")` }}
                    />
                </div>
            </div>

            <div className="md:col-span-1 flex flex-col gap-3">
                <div className="h-1/2 relative group overflow-hidden rounded-xl">
                    <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${gallery[3]}")` }}
                    />
                </div>
                <div className="h-1/2 relative group overflow-hidden rounded-xl cursor-pointer">
                    <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${gallery[4]}")` }}
                    />
                    {images.length > 5 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/50 transition-colors">
                            <span className="text-white font-bold text-lg underline underline-offset-4">
                                +{images.length - 5} Foto
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
