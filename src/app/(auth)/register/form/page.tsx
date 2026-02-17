"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { registerUser } from "../../actions";
import { Loader2 } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mendaftar...
                </>
            ) : (
                "Daftar Sekarang"
            )}
        </button>
    );
}

export default function RegisterFormPage() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "CUSTOMER";
    const [state, dispatch] = useFormState(registerUser, null);

    const isBusiness = role === "VENDOR" || role === "UMKM";
    const roleLabel =
        role === "VENDOR"
            ? "Vendor Catering"
            : role === "UMKM"
                ? "UMKM Kuliner"
                : "Customer";

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Daftar sebagai {roleLabel}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Lengkapi data diri Anda untuk memulai
                    </p>
                </div>

                <form action={dispatch} className="space-y-5">
                    <input type="hidden" name="role" value={role} />

                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nama Lengkap
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Nama Anda"
                            />
                        </div>
                        {state?.errors?.name && (
                            <p className="mt-1 text-xs text-red-600">{state.errors.name}</p>
                        )}
                    </div>

                    {/* Business Name (Only for Vendors/UMKM) */}
                    {isBusiness && (
                        <div>
                            <label
                                htmlFor="businessName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nama Bisnis / Usaha
                            </label>
                            <div className="mt-1">
                                <input
                                    id="businessName"
                                    name="businessName"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder={`Nama ${roleLabel} Anda`}
                                />
                            </div>
                            {state?.errors?.businessName && (
                                <p className="mt-1 text-xs text-red-600">
                                    {state.errors.businessName}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="nama@email.com"
                            />
                        </div>
                        {state?.errors?.email && (
                            <p className="mt-1 text-xs text-red-600">{state.errors.email}</p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nomor Telepon / WhatsApp
                        </label>
                        <div className="mt-1">
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="0812..."
                            />
                        </div>
                        {state?.errors?.phone && (
                            <p className="mt-1 text-xs text-red-600">{state.errors.phone}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="******"
                            />
                        </div>
                        {state?.errors?.password && (
                            <p className="mt-1 text-xs text-red-600">
                                {state.errors.password}
                            </p>
                        )}
                    </div>

                    {state?.message && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                            {state.message}
                        </div>
                    )}

                    <div>
                        <SubmitButton />
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Sudah punya akun?
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="font-medium text-primary hover:text-primary-hover"
                        >
                            Masuk sekarang
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
