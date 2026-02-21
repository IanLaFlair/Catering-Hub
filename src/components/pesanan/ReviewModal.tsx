"use client";

import React, { useState } from "react";
import { X, Star } from "lucide-react";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, reviewText: string) => void;
    vendorName: string;
    vendorImage: string;
    orderNumber: string;
}

export default function ReviewModal({
    isOpen,
    onClose,
    onSubmit,
    vendorName,
    vendorImage,
    orderNumber,
}: ReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    // Reset state when opened
    React.useEffect(() => {
        if (isOpen) {
            setRating(0);
            setHoveredRating(0);
            setReviewText("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0) return;
        onSubmit(rating, reviewText);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-[#f3ede7]">
                    <h2 className="text-xl font-bold text-[#1b140e]">Beri Ulasan</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
                            <img
                                src={vendorImage}
                                alt={vendorName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="font-bold text-lg text-[#1b140e]">{vendorName}</h3>
                        <p className="text-sm text-gray-500">Pesanan {orderNumber}</p>
                    </div>

                    <div className="mb-6">
                        <p className="text-center text-sm font-semibold text-gray-700 mb-3">
                            Berapa nilai untuk vendor ini?
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={() => setRating(star)}
                                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-10 h-10 ${star <= (hoveredRating || rating)
                                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                                : "fill-gray-100 text-gray-300"
                                            } transition-colors`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="review" className="block text-sm font-semibold text-gray-700 mb-2">
                            Tuliskan pengalaman Anda (Opsional)
                        </label>
                        <textarea
                            id="review"
                            rows={4}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Bagaimana rasa makanannya? Apakah pelayanannya memuaskan?"
                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
                        ></textarea>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-[#f3ede7] flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold transition-colors shadow-md ${rating > 0
                                ? "bg-primary text-white hover:bg-primary-hover shadow-orange-200"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                            }`}
                    >
                        Kirim Ulasan
                    </button>
                </div>
            </div>
        </div>
    );
}
