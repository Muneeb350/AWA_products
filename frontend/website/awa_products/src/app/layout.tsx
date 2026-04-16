import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AWA Products — Manufacturer of Euzzy & Premium Cleaning Brands",
    template: "%s | AWA Products",
  },
  description:
    "AWA Products is the parent manufacturer behind Euzzy and a growing portfolio of innovative household and cleaning brands. Industrial-scale formulation, built for distributors, retailers, and institutions.",
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png", sizes: "any" },
    ],
    shortcut: { url: "/images/logo.png", type: "image/png", sizes: "any" },
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "color-scheme": "light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body
        className="min-h-full flex flex-col bg-surface text-text"
        style={{ colorScheme: "light" }}
      >
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
