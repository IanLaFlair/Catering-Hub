const GALLERY_IMAGES = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB9x-EEbYPjU_uTmyy64Mio8bx3-Y8u5opI8c-2lW4R--ZTYsyxllzHcPBcLd_dCcaivRp9pFC5eWWXHlpvt5azf4iCZcFx1A_0ZiLL2s0Gxp65jrxzsnHdM3tfkUSoNyL5ohxX5GOgfs8jMsmgFKvvqvY2lDMHMzuYysV4kC1B69aLVM_6QXV-MnPtlkvp46WkPZUGiy-07FxhFXmDec2PPacd25kuiGONILkKHr1Dvo9kupy8xwbBANDlf8AEdNX8jzlB5qkr7Cg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBM2BnC2a49jDLtW8FT-op05KOmVXF6XCAVIj8ijc5RfcPyD2_6hcUU5soSooAH4O1LQGtkFXGTxZiGgIWTqxfQHlSIeSR2ziHnW6BJImzVaUve0SUEENyTziuKbfwfSXD3_R3gq3ecSdEwEvhHDAMomuGj6GKBfbI43MjHcPGxntyVrZezx7mdQiHLBu5TLIHgGOhlpQs5tj61QoZyHSOZq2KEFGMBFfkQWmxEVZsv0zCh8CF5vPNE2Wu7V-x8QOlaQsfBrbhzKn8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC4iLzeGk8y9N170llAc6rDU__otIr1jgwyk473TVc21efUWs7W2tg2_r3iaMC8NGn2YV2e6mY-DgT0gdB8T8JdNjTm1A354bF1WiqEkcdplpgo7NJru14-ox3d3UMA98Z1gXFZkIkjhJh0K5IUVM-lk92LJLMBwK-woWmqaZ7bofcCP1BkeYqA-XZVS3yfuk8NlC3C8JOzEr7OnSEnt6KzaX-QNm0PUgd3_uDkg_t6MGszVHVQWbPgOTYDYiUBHJskTp6bRrqgK5c',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCjIzwkCuC2sOJ09xnqeY9El4l0waFIyt7h2CgiapeAanKtvp9DA9VlVxmfGxu-uCeuKxUwkTcC_MpOof-iiaK00yGR2mJG6BPabJ0rF7esObndf5kUoE9r7ko-JOpj-TkieXD1x5BlEikSph_ewVyPQLgtH9ngPgMifiq8xKmsZcEczbFzXLQO4zWd7Y3POgXzU3KegNez0QfHocp1wFqnGhSqGYkffVPVc2y8ukppBPYP1wadGSHDRvP752YdmTIHV8lwAXAMBzU',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCqvWeUxvZTVzX6rshIOLx-abPAyl8jdBewpRulK-TASVA_enip7UTCrR3Pc_tni83uKnkSTpG_qoWK6OvOuXfo4maX96_Q4DzqX6Pg06EWS9QrBnIrMXTfxDXrDkxar5DZezq86BSenk6kKHSHkKZlP4giww_97-os7qLkLI8s0k5vuhkjplKWCQe4xBNS8iZ740Kb9iColi9EeW2mLTKY9HJZalhWsS6GDtkhunKJw_eUZ_7iZlupMP3Q49Mqn3kSAPMcIkRl1hY',
];

export default function PhotoGallery() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 h-[300px] md:h-[400px]">
            {/* Main Image */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-xl">
                <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${GALLERY_IMAGES[0]}")` }}
                />
            </div>

            {/* Column 2 */}
            <div className="md:col-span-1 flex flex-col gap-3">
                <div className="h-1/2 relative group overflow-hidden rounded-xl">
                    <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${GALLERY_IMAGES[1]}")` }}
                    />
                </div>
                <div className="h-1/2 relative group overflow-hidden rounded-xl">
                    <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${GALLERY_IMAGES[2]}")` }}
                    />
                </div>
            </div>

            {/* Column 3 */}
            <div className="md:col-span-1 flex flex-col gap-3">
                <div className="h-1/2 relative group overflow-hidden rounded-xl">
                    <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${GALLERY_IMAGES[3]}")` }}
                    />
                </div>
                <div className="h-1/2 relative group overflow-hidden rounded-xl">
                    <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url("${GALLERY_IMAGES[4]}")` }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                        <span className="text-white font-bold text-lg underline underline-offset-4">Lihat Semua Foto (24)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
