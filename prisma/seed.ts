import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ─── Customer Test Account ───────────────────────────────────────────
    const customerPassword = await bcrypt.hash('customer123', 10);
    const customer = await prisma.user.upsert({
        where: { email: 'customer@test.com' },
        update: {},
        create: {
            email: 'customer@test.com',
            name: 'Budi Santoso',
            password: customerPassword,
            role: 'CUSTOMER',
        },
    });
    console.log(`✅ Customer: ${customer.email}`);

    // ─── Vendors ─────────────────────────────────────────────────────────
    const vendors = [
        {
            email: 'sari.rasa@vendor.com',
            name: 'Admin Sari Rasa',
            profile: {
                businessName: 'Sari Rasa Catering',
                slug: 'sari-rasa-catering',
                description: 'Spesialis masakan nusantara dengan pengalaman 10 tahun. Melayani pernikahan, corporate, dan acara keluarga.',
                address: 'Jl. Kemang Raya No. 12',
                city: 'Jakarta Selatan',
                province: 'DKI Jakarta',
                phone: '08111234567',
                minPax: 50,
                maxPax: 2000,
                priceMin: 45000,
                priceMax: 95000,
                isVerified: true,
                rating: 4.8,
            },
            menus: [
                {
                    name: 'Paket Gold Prasmanan',
                    category: 'PRASMANAN',
                    description: 'Paket prasmanan premium dengan 12 jenis hidangan',
                    items: ['Nasi Putih', 'Nasi Goreng Spesial', 'Soup Kimlo', 'Ayam Bakar Madu', 'Sapi Lada Hitam', 'Capcay Seafood', 'Kerupuk', 'Buah Potong', 'Puding', 'Air Mineral'],
                    pricePerPax: 75000,
                    minOrderPax: 50,
                    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop',
                },
                {
                    name: 'Paket Silver Prasmanan',
                    category: 'PRASMANAN',
                    description: 'Paket prasmanan standar dengan 8 jenis hidangan',
                    items: ['Nasi Putih', 'Soup Sayuran', 'Ayam Goreng Mentega', 'Tempe Balado', 'Capcay', 'Kerupuk', 'Buah', 'Air Mineral'],
                    pricePerPax: 55000,
                    minOrderPax: 50,
                    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop',
                },
                {
                    name: 'Nasi Box Sultan',
                    category: 'NASI_BOX',
                    description: 'Nasi box premium dengan ayam goreng dan lauk lengkap',
                    items: ['Nasi Kuning', 'Ayam Goreng Lengkuas', 'Perkedel Kentang', 'Orek Tempe', 'Telur Dadar', 'Kerupuk', 'Sambal'],
                    pricePerPax: 35000,
                    minOrderPax: 20,
                    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop',
                },
                {
                    name: 'Paket Coffee Break',
                    category: 'COFFEE_BREAK',
                    description: 'Coffee break lengkap untuk acara seminar & meeting',
                    items: ['Kopi', 'Teh', 'Air Mineral', 'Snack Asin', 'Snack Manis', 'Buah Potong'],
                    pricePerPax: 25000,
                    minOrderPax: 30,
                    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
                },
            ],
        },
        {
            email: 'royal.kitchen@vendor.com',
            name: 'Admin Royal Kitchen',
            profile: {
                businessName: 'Royal Kitchen Catering',
                slug: 'royal-kitchen-catering',
                description: 'Spesialis masakan nusantara dan western premium untuk pernikahan dan acara korporat mewah.',
                address: 'Jl. HOS Cokroaminoto No. 7',
                city: 'Jakarta Pusat',
                province: 'DKI Jakarta',
                phone: '08122334455',
                minPax: 100,
                maxPax: 5000,
                priceMin: 85000,
                priceMax: 150000,
                isVerified: true,
                rating: 4.9,
            },
            menus: [
                {
                    name: 'Paket Royal Prasmanan',
                    category: 'PRASMANAN',
                    description: 'Paket mewah dengan 15 hidangan pilihan chef',
                    items: ['Nasi Putih', 'Nasi Goreng Royal', 'Beef Wellington Slice', 'Ayam Panggang Herb', 'Salmon Teriyaki', 'Pasta Carbonara', 'Sup Tom Yam', 'Salad Bar', 'Dessert Station', 'Soft Drink'],
                    pricePerPax: 120000,
                    minOrderPax: 100,
                    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
                },
                {
                    name: 'Fine Dining Set',
                    category: 'FINE_DINING',
                    description: 'Set dinner plated ala fine dining untuk acara eksklusif',
                    items: ['Amuse Bouche', 'Soup du Jour', 'Main Course (Beef/Chicken/Fish)', 'Dessert', 'Coffee/Tea'],
                    pricePerPax: 150000,
                    minOrderPax: 50,
                    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop',
                },
                {
                    name: 'Nasi Box Premium',
                    category: 'NASI_BOX',
                    description: 'Nasi box premium untuk corporate event',
                    items: ['Nasi Putih', 'Ayam Bakar Taliwang', 'Perkedel Jagung', 'Tumis Buncis', 'Sambal Matah', 'Kerupuk', 'Buah'],
                    pricePerPax: 55000,
                    minOrderPax: 50,
                    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop',
                },
            ],
        },
        {
            email: 'dapur.dewi@vendor.com',
            name: 'Admin Dapur Bu Dewi',
            profile: {
                businessName: 'Dapur Bu Dewi',
                slug: 'dapur-bu-dewi',
                description: 'Pilihan tepat untuk catering rumahan dan kantor. Rasa otentik masakan rumah dengan harga bersahabat.',
                address: 'Jl. Tebet Barat Dalam No. 45',
                city: 'Jakarta Selatan',
                province: 'DKI Jakarta',
                phone: '08133445566',
                minPax: 20,
                maxPax: 500,
                priceMin: 35000,
                priceMax: 55000,
                isVerified: false,
                rating: 4.7,
            },
            menus: [
                {
                    name: 'Paket Nasi Box Rumahan',
                    category: 'NASI_BOX',
                    description: 'Nasi box rumahan dengan cita rasa masakan ibu',
                    items: ['Nasi Putih', 'Ayam Goreng Bumbu', 'Tempe Orek', 'Sayur Lodeh', 'Sambal Terasi', 'Kerupuk'],
                    pricePerPax: 35000,
                    minOrderPax: 20,
                    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop',
                },
                {
                    name: 'Tumpeng Kuning',
                    category: 'TUMPENG',
                    description: 'Tumpeng kuning komplit untuk acara syukuran',
                    items: ['Nasi Kuning', 'Ayam Goreng Utuh', 'Telur Balado', 'Perkedel', 'Urap', 'Bihun Goreng', 'Tempe Goreng', 'Kerupuk'],
                    pricePerPax: 45000,
                    minOrderPax: 30,
                    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop',
                },
            ],
        },
        {
            email: 'mahkota.wedding@vendor.com',
            name: 'Admin Mahkota Wedding',
            profile: {
                businessName: 'Mahkota Wedding Catering',
                slug: 'mahkota-wedding-catering',
                description: 'Partner terbaik untuk hari spesial Anda. Paket lengkap pernikahan dengan dekorasi dan katering premium.',
                address: 'Jl. Cilandak Tengah No. 23',
                city: 'Jakarta Selatan',
                province: 'DKI Jakarta',
                phone: '08144556677',
                minPax: 200,
                maxPax: 10000,
                priceMin: 95000,
                priceMax: 200000,
                isVerified: true,
                rating: 4.9,
            },
            menus: [
                {
                    name: 'Paket Wedding Platinum',
                    category: 'PRASMANAN',
                    description: 'Paket lengkap pernikahan dengan 20 hidangan eksklusif',
                    items: ['Nasi Putih', 'Nasi Goreng Spesial', 'Roasted Lamb', 'Beef Rendang Premium', 'Lobster Butter Garlic', 'Sop Buntut', 'Salad Bar', 'Live Station Pasta', 'Dessert Station', 'Wedding Cake'],
                    pricePerPax: 175000,
                    minOrderPax: 200,
                    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
                },
                {
                    name: 'Paket Wedding Gold',
                    category: 'PRASMANAN',
                    description: 'Paket pernikahan mewah dengan 15 hidangan',
                    items: ['Nasi Putih', 'Beef Rendang', 'Ayam Panggang Lemon', 'Udang Saus Padang', 'Sop Tom Yam', 'Capcay Seafood', 'Salad Bar', 'Dessert', 'Soft Drink'],
                    pricePerPax: 125000,
                    minOrderPax: 200,
                    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop',
                },
            ],
        },
        {
            email: 'berkah.snack@vendor.com',
            name: 'Admin Berkah Snack',
            profile: {
                businessName: 'Berkah Snack & Catering',
                slug: 'berkah-snack-catering',
                description: 'Spesialis snack box dan coffee break untuk meeting kantor, seminar, dan gathering perusahaan.',
                address: 'Jl. Kuningan Mulia No. 8',
                city: 'Jakarta Selatan',
                province: 'DKI Jakarta',
                phone: '08155667788',
                minPax: 10,
                maxPax: 1000,
                priceMin: 15000,
                priceMax: 35000,
                isVerified: true,
                rating: 4.6,
            },
            menus: [
                {
                    name: 'Snack Box Standard',
                    category: 'SNACK_BOX',
                    description: 'Snack box isi 5 pcs untuk meeting dan gathering',
                    items: ['Risoles Mayo', 'Lemper Ayam', 'Sus Vla', 'Brownies', 'Air Mineral'],
                    pricePerPax: 18000,
                    minOrderPax: 10,
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
                },
                {
                    name: 'Snack Box Premium',
                    category: 'SNACK_BOX',
                    description: 'Snack box premium isi 7 pcs + minuman',
                    items: ['Risoles Mayo', 'Lemper Ayam', 'Sus Vla', 'Brownies Panggang', 'Kue Lapis', 'Mini Sandwich', 'Jus Buah'],
                    pricePerPax: 30000,
                    minOrderPax: 20,
                    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop',
                },
                {
                    name: 'Coffee Break Paket A',
                    category: 'COFFEE_BREAK',
                    description: 'Coffee break sederhana untuk meeting',
                    items: ['Kopi/Teh', 'Air Mineral', '3 Macam Snack'],
                    pricePerPax: 20000,
                    minOrderPax: 10,
                    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
                },
            ],
        },
    ];

    for (const v of vendors) {
        const password = await bcrypt.hash('vendor123', 10);
        const user = await prisma.user.upsert({
            where: { email: v.email },
            update: {},
            create: {
                email: v.email,
                name: v.name,
                password,
                role: 'VENDOR',
            },
        });

        const profile = await prisma.vendorProfile.upsert({
            where: { slug: v.profile.slug },
            update: {},
            create: {
                userId: user.id,
                ...v.profile,
            },
        });

        for (const menu of v.menus) {
            const existing = await prisma.vendorMenu.findFirst({
                where: { vendorProfileId: profile.id, name: menu.name },
            });
            if (!existing) {
                await prisma.vendorMenu.create({
                    data: {
                        vendorProfileId: profile.id,
                        name: menu.name,
                        category: menu.category,
                        description: menu.description,
                        items: menu.items,
                        pricePerPax: menu.pricePerPax,
                        minOrderPax: menu.minOrderPax,
                        image: menu.image,
                        isAvailable: true,
                    },
                });
            }
        }

        console.log(`✅ Vendor: ${v.profile.businessName}`);
    }

    console.log('\n🎉 Seed selesai!');
    console.log('👤 Customer login: customer@test.com / customer123');
    console.log('🏪 Vendor login: sari.rasa@vendor.com / vendor123');
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
