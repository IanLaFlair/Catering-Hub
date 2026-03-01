import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "CateringHub — Temukan Catering Terbaik untuk Acara Anda",
  description:
    "Platform marketplace yang menghubungkan customer, vendor catering, dan UMKM kuliner dalam satu ekosistem terpercaya. Temukan catering terbaik di seluruh Indonesia.",
  keywords: [
    "catering",
    "katering",
    "vendor catering",
    "UMKM kuliner",
    "catering pernikahan",
    "catering corporate",
    "nasi box",
    "prasmanan",
  ],
  openGraph: {
    title: "CateringHub — Temukan Catering Terbaik untuk Acara Anda",
    description:
      "Platform marketplace yang menghubungkan customer, vendor catering, dan UMKM kuliner.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
