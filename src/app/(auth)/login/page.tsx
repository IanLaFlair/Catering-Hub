"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { authenticate } from "../actions";
import { Loader2 } from "lucide-react";

function LoginButton() {
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
                    Masuk...
                </>
            ) : (
                "Masuk"
            )}
        </button>
    );
}

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Selamat Datang Kembali
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Masuk untuk mengelola pesanan atau bisnis Anda.
                </p>
            </div>

            <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
                <form action={dispatch} className="space-y-6">
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
                    </div>

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
                                autoComplete="current-password"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="******"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <LoginButton />
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Belum punya akun?
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/register"
                            className="font-medium text-primary hover:text-primary-hover"
                        >
                            Daftar akun baru
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
