import { X, ChevronDown } from 'lucide-react';
import SearchFilters from '@/components/search/SearchFilters';
import VendorCard from '@/components/search/VendorCard';
import Pagination from '@/components/search/Pagination';

const VENDORS = [
    {
        name: 'Royal Kitchen Catering',
        slug: 'royal-kitchen-catering',
        location: 'Menteng, Jakarta Pusat',
        rating: 4.9,
        reviewCount: 342,
        description: 'Spesialis masakan nusantara dan western premium untuk pernikahan dan acara korporat mewah.',
        tags: ['Prasmanan', 'Fine Dining'],
        price: 'Rp 85.000',
        priceUnit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4qfj5GpXzwlK7D-PEPfnIOol3xCH1mEWfXN8elOsu9vF1w5WTWw4qq1EFp1PwIVKlw4LY6ASUYC8VEhDXQXjGBOA-brHRIKCyQT1_tKn7A0DA-DQ_1vFwqG2f3mSDaNQm-QEPVR6OaVQwknW9Xgi_Za8BqBO1Vze60stxt3olBzUlPkSVFZUbCjpC3uWjGZg9VFkTsurjoK8bhZUDJiOwH1pxNNKMIh5vM6NnEU-xU3qJ3ny5JITxrR_SaNLd1-gHOO20JQ68_aU',
        badge: 'promoted' as const,
    },
    {
        name: 'Dapur Bu Dewi',
        slug: 'dapur-bu-dewi',
        location: 'Tebet, Jakarta Selatan',
        rating: 4.8,
        reviewCount: 124,
        description: 'Pilihan tepat untuk catering rumahan dan kantor. Rasa otentik dengan harga bersahabat.',
        tags: ['Nasi Box', 'Tumpeng'],
        price: 'Rp 45.000',
        priceUnit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKHywEVumYLDr9_VRMxnyr7hIYMpobozLH78CJD3nXyICI4Cra-zDR6URfu0AAahiOcHRXDYi9woHBTxJUjCOgb3-aZSuIeG4TE-pipm--r3QdxiQOxmkMUv5WCzPKPJQJmkbf6KtW3IemUgl6LG012nVjhZgcC6tpz_gHbVXe3xGLFh5mRypHadUJRQPLtFUhF-WDE7x3_qSJ3dEcivPbtsyFz6VyLI85fgxeLDfyo09m78cRqzZ-Wg7Es-_XkI_LsasY8qbTMkM',
        badge: 'partner' as const,
    },
    {
        name: 'Sari Rasa Catering',
        slug: 'sari-rasa-catering',
        location: 'Kemang, Jakarta Selatan',
        rating: 4.7,
        reviewCount: 89,
        description: 'Menyediakan aneka masakan tradisional dengan sentuhan modern. Higienis dan lezat.',
        tags: ['Prasmanan', 'Gubukan'],
        price: 'Rp 55.000',
        priceUnit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6HOxoCiuZFnpbDFssl6b0rlFIUuTMp5mBJGKMhOJ46BoitD1SzPuS-hziddyNF4gUU0V0dCkKbJ20AxEqNqr8-9AyYwpFPtyPyD95EowTy3FkGsqthO6aiMch3IhTlCTbQKOmrw2-kZUETh9z3kwxN23WsqiGaa8KC-YsEJPHMoMhrLaPyubsKRRIarfquDCLRi2GSf9wpob0ertVgJ89Dyg61PNIhWxBwrM87akIY-fejucdU3GwlrZsJjRTkkS5yicOGLcqWT0',
        badge: 'verified' as const,
    },
    {
        name: 'Green Spoon Healthy',
        slug: 'green-spoon-healthy',
        location: 'Senopati, Jakarta Selatan',
        rating: 4.9,
        reviewCount: 56,
        description: 'Katering sehat dengan kalori terkontrol tanpa mengurangi rasa. Cocok untuk diet.',
        tags: ['Diet', 'Vegan'],
        price: 'Rp 65.000',
        priceUnit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXX8GJZykOBvvyowyYGVjP2_XZWdKIzn4bVnwRv-5w4ZoKpwhlwZ5Wd30DhHZTAn3NRpvGDsyLazlAKMBOTOrVR7jqkUozV2IwkaIgr1yKVsZDRagKAuKVcysSGC7HN-Maf7jF_rvgCk_jdBy_AxhdDPpgex4WTLPvd7k8VnXozNkX9CsQfxGeVKUICF8pqRs5yennTZL8mZhuQxDdeIs4gsNj3x2IDLjFMzzCkPW0UD8eZ1OwjXjPMLTJomaWANaMNeA4Bv8SXYo',
    },
    {
        name: 'Berkah Snack & Catering',
        slug: 'berkah-snack-catering',
        location: 'Kuningan, Jakarta Selatan',
        rating: 4.5,
        reviewCount: 210,
        description: 'Spesialis snack box dan coffee break untuk meeting kantor dan seminar.',
        tags: ['Snack Box', 'Coffee Break'],
        price: 'Rp 15.000',
        priceUnit: 'box',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXuzGSyf2ndD7MKHNb7Xn1gcee7y4Pm9aGS2Rvi02e0LfXtCwzkK8UpZvgLmFSW3lJKM-lmcF3NT-rs0Y6p1nEmt1gcHaFxc1ecqbCZLgpe1xop4OI3W7cX6jcKoQtsoGshzptJ4EyTI79D_8u1bQGHQn7uZjwpFNF2ozRCBnUKE6O61zqP8QR3UF_R0q5gAaxQe2tnMShISrtEa9tTyNifDtssb5iJ17anZ4vpRfL1aFuPukR51xcUS32UwzbIDv0RtLt6Ddy0j8',
        badge: 'verified' as const,
    },
    {
        name: 'Mahkota Wedding',
        slug: 'mahkota-wedding',
        location: 'Cilandak, Jakarta Selatan',
        rating: 4.8,
        reviewCount: 175,
        description: 'Partner terbaik untuk hari spesial Anda. Paket lengkap dengan dekorasi katering.',
        tags: ['Wedding', 'Full Service'],
        price: 'Rp 95.000',
        priceUnit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwzHAku9yfOQzDmgV6G8XP2YmmJBnrpS4kYSXzy6MsF8Np9DIGvv3MPiuWbhTXvAltRkJx0Q3Z2liPkPMlATpKzCb49FNTfP2nTnR-gttuV3hVFsf8GobwW8k2ExwrUCkFTB2qf2Kvtb-gUSxWfXc52-6GlKLij2Gu1iIBpHqPXzVo5b-b2jAY2yJSl5Js7ysoFQHKIub8MRWrlH2XCJBXfIBdTKXZ13ZXG67g2WlOwfimLfJXGlRNbY2s9eYvj2xFU42akEEFkc8',
    },
];

export default function CariPage() {
    return (
        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 lg:px-10 py-6">
            {/* Header & Active Filters */}
            <div className="mb-6 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-text-main">Hasil Pencarian &quot;Katering Pernikahan&quot;</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-text-muted font-medium">Urutkan:</span>
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-border-light rounded-lg text-sm font-medium text-text-main hover:border-primary/50 transition-colors">
                            <span>Paling Relevan</span>
                            <ChevronDown className="w-[18px] h-[18px]" />
                        </button>
                    </div>
                </div>

                {/* Active Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-text-muted mr-2">Filter Aktif:</span>
                    {['Jakarta Selatan', 'Pernikahan', 'Rp 25k - 50k'].map((filter) => (
                        <div key={filter} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
                            {filter}
                            <button className="hover:text-red-500 flex items-center">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                    <button className="text-xs font-medium text-text-muted hover:text-primary ml-2 underline decoration-dashed underline-offset-4">
                        Hapus Semua Filter
                    </button>
                </div>
            </div>

            {/* Content: Sidebar + Results */}
            <div className="flex flex-col lg:flex-row gap-8">
                <SearchFilters />

                <div className="flex-1">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {VENDORS.map((vendor) => (
                            <VendorCard key={vendor.slug} {...vendor} />
                        ))}
                    </div>
                    <Pagination />
                </div>
            </div>
        </main>
    );
}
