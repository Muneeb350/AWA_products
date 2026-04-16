"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import CategoriesDropdown from "./CategoriesDropdown";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 px-4 py-3 ${
        scrolled ? "top-2" : "top-0"
      }`}
    >
      <div className={`mx-auto max-w-7xl flex items-center justify-between px-6 py-3 transition-all duration-300 rounded-[2rem] border ${
        scrolled 
        ? "bg-white/70 backdrop-blur-xl border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]" 
        : "bg-white/40 backdrop-blur-md border-transparent"
      }`}>
        
        {/* Logo Section */}
        <Link href="/" className="flex shrink-0 items-center gap-3 group !font-sans">
          <div className="relative overflow-hidden rounded-lg transition-transform group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="AWA Products logo"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col border-l border-black/10 pl-3">
             <span className="text-sm font-black uppercase tracking-widest text-brand-800 leading-none">
                AWA
             </span>
             <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-brand-600/80">
                Products
             </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex !font-sans">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-[15px] font-semibold tracking-wide transition-all duration-300 group ${
                pathname === link.href ? "text-brand-600" : "text-gray-700 hover:text-brand-600"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-600 transition-all duration-300 ${
                pathname === link.href ? "opacity-100" : "opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100"
              }`} />
            </Link>
          ))}
          <div className="h-6 w-[1px] bg-black/10" />
          <CategoriesDropdown />
        </nav>

        {/* Desktop CTA */}
        <div className="flex items-center gap-4 !font-sans">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-brand-700/40 hover:-translate-y-0.5 active:scale-95"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            className="md:hidden p-2 rounded-xl bg-brand-50 text-brand-700 transition-active"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`absolute left-4 right-4 mt-2 overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
        mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      }`}>
        <div className="rounded-3xl border border-white/40 bg-white/90 p-5 backdrop-blur-2xl shadow-2xl !font-sans">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              // 1. Mobile list se duplicate "Contact" hide karne ke liye logic
              if (link.label === "Contact") return null;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base transition-all ${
                    pathname === link.href
                      ? "bg-brand-600 text-white !font-bold shadow-md shadow-brand-600/20"
                      : "text-gray-700 font-semibold hover:bg-brand-50"
                  }`}
                >
                  <span className="tracking-normal uppercase text-sm !font-sans">{link.label}</span>
                  {pathname === link.href && <span className="h-2 w-2 rounded-full bg-white animate-pulse" />}
                </Link>
              );
            })}
            
            {/* 2. Main "Contact Us" Button - Iska font force kiya gaya hai */}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center rounded-2xl bg-brand-600 py-4 text-xs !font-sans font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-brand-600/30 active:scale-95 transition-transform"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}