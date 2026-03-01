import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user && 'role' in user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                (session.user as any).role = token.role;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/vendor-dashboard");

            // Extract role from session or token
            const role = (auth?.user as any)?.role;

            // Redirect unauthenticated users to login if accessing dashboard
            if (isOnDashboard) {
                if (isLoggedIn) {
                    if (role === 'VENDOR' || role === 'UMKM') return true;
                    // Customers shouldn't access the vendor dashboard
                    return Response.redirect(new URL("/", nextUrl));
                }
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // Redirect authenticated users away from login/register pages
                if (nextUrl.pathname === "/login" || nextUrl.pathname === "/register") {
                    if (role === 'VENDOR' || role === 'UMKM') {
                        return Response.redirect(new URL("/vendor-dashboard", nextUrl));
                    }
                    return Response.redirect(new URL("/", nextUrl));
                }
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
