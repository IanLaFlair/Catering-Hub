import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.includes("/dashboard");

            // Redirect unauthenticated users to login if accessing dashboard
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // Redirect authenticated users away from login/register pages
                if (nextUrl.pathname === "/login" || nextUrl.pathname === "/register") {
                    // Default redirect could be home or role-specific dashboard
                    // For now, let's keep it simple and redirect to home if already logged in? 
                    // Or maybe dashboard if they have a role.
                    // Leaving as is for now implies they can visit login page.
                    // Better to redirect to dashboard if logged in.
                    return Response.redirect(new URL("/", nextUrl));
                }
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
