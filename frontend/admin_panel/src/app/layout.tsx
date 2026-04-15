import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWA Products - Admin Dashboard",
  description: "Professional admin dashboard for AWA Products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
