'use client';

import { Plus, ChevronDown } from 'lucide-react';

const CATEGORIES = ['Semua Menu', 'Prasmanan', 'Nasi Box', 'Stall / Gubukan', 'Coffee Break', 'Hampers'];

const MENU_ITEMS = [
    {
        name: 'Paket Gold Prasmanan',
        category: 'Prasmanan',
        description: 'Nasi Putih, Nasi Goreng Spesial, Soup Kimlo, Ayam Bakar Madu, Sapi Lada Hitam, Capcay Seafood, Kerupuk, Buah, Puding, Air Mineral.',
        minOrder: 'Min. 50 pax',
        price: 'Rp 55.000',
        unit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA2pchfo3HJOPftiQMUh8S48WX_FHYaCqpG5bauAN8-6JYsVkWPfvVTedpAvJzHp8U082BfjV0gU_WnXMJ3laTD2Q9mphzIjgopcgF1ENtF3qKLXa-OPEVkg7whToN72HY5ZDLmy7EdhFAN_a16qpji9ia-jVLB_dIMcVv3Wi2OTaVbF07ZaHmDS-0IA9PjyumT7BXS5H5uRFutX9q-1OdqV9B6-C9Mb2dGo9wjjOsOcTctFqkV25dANJUvOmFUM1xW-cxOEsK7z4',
    },
    {
        name: 'Nasi Box Sultan',
        category: 'Nasi Box',
        description: 'Nasi Kuning, Ayam Goreng Lengkuas, Perkedel Kentang, Orek Tempe, Sambal Goreng Ati, Telur Dadar Iris, Kerupuk, Sambal.',
        minOrder: 'Min. 20 pax',
        price: 'Rp 35.000',
        unit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzbuqap00lZeu5xLUCtTABzcDp5Q5iPR7s6TotEESDN3btRKRUkmQVrDd_zmCBHaEb98jB3ZCGg__8dn4L_meVl78xWf9_UIM_4C9szthTwxclMPdKDz6VsLbaDOi3H9dJZ7GoN1L9AfxjsPMXOxrRcA_lOHr6Q7uAUeBXZcCTrNif32rYarjCwbx3ZPiuRPT2LdCRV48PB_6mUClwUYY7f-xYS_H20i3RUZho8bxI85CB7zdqPLNTWEa6hmjLmMa2cM-Zy2kWK6o',
    },
    {
        name: 'Paket Coffee Break Premium',
        category: 'Coffee Break',
        description: 'Kopi, Teh, Creamer, Gula, Air Mineral, 3 Macam Snack (Asin, Manis, Rebusan), Buah Potong.',
        minOrder: 'Min. 30 pax',
        price: 'Rp 25.000',
        unit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApwWFmpYVThjaw9SDYMen-H9sObn83h1eYCbVF5HUE9UpQHYkxLPnuD5b69rzC5G490ZK12aLGnenYYOa7hogCEjIFUFXNWCYUnjrcnu0x7KuRRKTd7FowjkR3nfm-z4Xi4c-tc5Q5TY-Vd1qUoveOIhRYCKnAf6mFcL7oPcwCJ0No-BxTQEVjNJvVCr3yKZY9qKla6dGnu-44Mro_N2QBtp8Rmk0HkQdL537U3GSnbZfPa8G_JZsx-7PnPq-eIDQ9JYioqXMvRks',
    },
    {
        name: 'Paket Silver Prasmanan',
        category: 'Prasmanan',
        description: 'Nasi Putih, Soup Sayuran, Ayam Goreng Mentega, Capcay, Kerupuk, Buah, Air Mineral.',
        minOrder: 'Min. 50 pax',
        price: 'Rp 45.000',
        unit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACi3K73U8pR9iOwU_idtW1pFDzA1u5SqTr88ql4NTcxq2JZm3uayOMeDTSktmlHEn5EKlLKDS8QlA36Ghz2LcRA9DUBM8_dbnFd0eCFj35cP3h4s-4LUZsePTXLCC0MemZbyO_ExUy62JQezxJlE7IhFdt7L5QJz3kJtCi2BP228EJdi88MacV4WawJOernacxicIacgfum8icWDgpb7-6mBgIsENZq9VSPuqdg0Gp5Y5rl5hiHs6go1i3PGqKucjWf86lrz6MD6I',
    },
    {
        name: 'Kambing Guling Special',
        category: 'Stall',
        description: 'Kambing Guling Muda utuh, Lontong, Sambal Kecap, Acar, Peralatan makan.',
        minOrder: 'Min. 1 Ekor',
        price: 'Rp 2.500.000',
        unit: 'ekor',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSPNdyMJOaRGorrjlokysoZL_vp_9IJttu1RG4B_j_hbQ3DTi3v-ur3LtWIyjWjQc-G_F5kE3U_PxQxmmuoUG3-0m9s_lxM3P4FElPHhIKmd9OLJhbM8awjmoSscTl1-A2qHSiVLYwRYAg42XZILKP3wJpwdIe5AQ2mM9dJIL9wuMXWIPGP3LQCuzB126DTv69Uys2NfA41XGxeeJYG-D5wTtyuftbQ-eRmzt3B137V8DI1jQ3i1hhkXVk4x8biwUaen9HIr2YCE8',
    },
    {
        name: 'Zuppa Soup',
        category: 'Stall',
        description: 'Cream soup jagung dan ayam dengan puff pastry yang renyah dan gurih.',
        minOrder: 'Min. 100 pax',
        price: 'Rp 18.000',
        unit: 'pax',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyW0-iucCB1OhaAo6LtIpYcG8zCbKUvdrejL5eAA0S7wX07XAk66z_cUq0KluwMTFMnWq-S-4Ks0ctNFgbc4m4vc2XsGRzY1C037kpHdL5IyDY9SH9sZVQFFBNtNNmUdqDCrnrC3kPm8zbe10iSlLr3f8sxl8QPQX-8CVujTPURwcCabc4qyvWrD_K91lLyEqoFAv9iyNJ81CQBhd64oZHBcf_hGlq5A94r1VS5bdpo-1FwUy1SJRg6KIpfNz-oa-OT5faI2GRTaw',
    },
];

export default function MenuGrid() {
    return (
        <div className="lg:col-span-8">
            {/* Category Filter */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-6 mb-2">
                {CATEGORIES.map((cat, i) => (
                    <button
                        key={cat}
                        className={`px-5 py-2 rounded-full text-sm font-${i === 0 ? 'semibold' : 'medium'} whitespace-nowrap transition-all ${i === 0
                                ? 'bg-accent text-white shadow-sm'
                                : 'bg-white border border-gray-200 hover:border-accent text-gray-700'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {MENU_ITEMS.map((item) => (
                    <div
                        key={item.name}
                        className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
                    >
                        {/* Image */}
                        <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
                            <div
                                className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url("${item.image}")` }}
                            />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-accent">
                                {item.category}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="font-bold text-lg text-text-main line-clamp-1 mb-2">{item.name}</h3>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>

                            <div className="mt-auto pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{item.minOrder}</span>
                                </div>
                                <div className="flex items-end justify-between gap-2">
                                    <div>
                                        <span className="text-xs text-gray-400 block">Mulai dari</span>
                                        <span className="text-primary font-bold text-lg">
                                            {item.price}
                                            <span className="text-xs font-normal text-gray-500">/{item.unit}</span>
                                        </span>
                                    </div>
                                    <button className="bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-lg p-2 transition-colors flex items-center justify-center">
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-10">
                <button className="flex items-center gap-2 text-accent font-semibold hover:bg-gray-100 px-6 py-3 rounded-full transition-colors">
                    Lihat Menu Lainnya
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
