"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const RegisterSchema = z.object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    phone: z.string().min(10, "Nomor telepon tidak valid"),
    role: z.enum(["CUSTOMER", "VENDOR", "UMKM"]),
    businessName: z.string().optional(),
});

export async function registerUser(prevState: any, formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        phone: formData.get("phone"),
        role: formData.get("role"),
        businessName: formData.get("businessName") || undefined, // Handle null
    };

    const validatedFields = RegisterSchema.safeParse(rawData);

    if (!validatedFields.success) {
        console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
        console.error("Raw Data:", rawData);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Gagal mendaftar. Periksa kembali form anda.",
        };
    }

    const { name, email, password, phone, role, businessName } = validatedFields.data;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return {
            message: "Email sudah terdaftar. Silakan login.",
            errors: { email: ["Email sudah terdaftar"] },
        };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                ...(role === "VENDOR" && businessName
                    ? {
                        vendorProfile: {
                            create: {
                                businessName,
                                slug: businessName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now(),
                                phone,
                            },
                        },
                    }
                    : {}),
                ...(role === "UMKM" && businessName
                    ? {
                        umkmProfile: {
                            create: {
                                businessName,
                                slug: businessName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now(),
                                phone,
                            },
                        },
                    }
                    : {}),
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return {
            message: "Terjadi kesalahan saat membuat akun. Silakan coba lagi.",
        };
    }

    // Redirect to login (or auto-login later)
    redirect("/login?registered=true");
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
