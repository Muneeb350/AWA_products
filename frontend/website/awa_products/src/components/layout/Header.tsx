"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CategoriesDropdown from "./CategoriesDropdown";
import { SUB_CATEGORIES } from "@/constants/categories";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo + Brand block */}
        <Link href="/" className="flex shrink-0 flex-col items-center gap-0.5">
          <Image
            src="/images/logo.png"
            alt="AWA Products logo"
            width={150}
            height={150}
            priority
            style={{ height: "auto" }}
            className="object-contain"
          />
          <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-brand-700">
            AWA Products
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xl font-normal transition ${
                pathname === link.href
                  ? "text-brand-600"
                  : "text-text hover:text-brand-600"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Categories dropdown (desktop only) */}
          <CategoriesDropdown />
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-text-inverse shadow-sm transition hover:bg-brand-700 md:inline-flex"
        >
          Get a Quote
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-brand-50 text-brand-700"
                    : "text-text hover:bg-surface-alt"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile sub-categories accordion */}
            <div>
              <button
                onClick={() => setMobileSubOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-text transition hover:bg-surface-alt"
              >
                Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${mobileSubOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {mobileSubOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l-2 border-border pl-3">
                  {SUB_CATEGORIES.map(({ label, slug }) => {
                    const href = `/products/${slug}`;
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={slug}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`rounded-lg px-3 py-2 text-sm transition ${
                          isActive
                            ? "bg-brand-50 font-semibold text-brand-700"
                            : "text-text-muted hover:bg-surface-alt hover:text-text"
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-lg bg-brand-600 px-3 py-2.5 text-center text-sm font-semibold text-text-inverse transition hover:bg-brand-700"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ── Inline SVG icons ── */

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-text"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-text"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
