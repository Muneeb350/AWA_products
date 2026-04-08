"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SUB_CATEGORIES } from "@/constants/categories";

/**
 * Categories dropdown with Framer Motion animations.
 * Maps over the centralized SUB_CATEGORIES array — never hardcoded.
 */
export default function CategoriesDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Determine which sub-category is active from the URL
  const activeSlug = getActiveSlug(pathname);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 text-xl font-medium transition ${
          open || activeSlug
            ? "text-brand-600"
            : "text-text hover:text-brand-600"
        }`}
      >
        Categories
        <ChevronIcon open={open} />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 z-50 mt-2 w-56 -translate-x-1/2 rounded-xl border border-border bg-surface py-2 shadow-lg"
          >
            {SUB_CATEGORIES.map(({ label, slug }) => {
              const isActive = activeSlug === slug;
              return (
                <Link
                  key={slug}
                  href={`/products/${slug}`}
                  className={`flex items-center justify-between px-4 py-2.5 text-l transition ${
                    isActive
                      ? "bg-brand-50 font-semibold text-brand-700"
                      : "text-text hover:bg-surface-alt"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span>{label}</span>
                  {isActive && <ActiveDot />}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Helpers ─────────────────────────────── */

function getActiveSlug(pathname: string): string | null {
  const match = pathname.match(/^\/products\/([a-z0-9-]+)$/);
  return match ? match[1] : null;
}

/* ── Inline SVG icons ────────────────────── */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
  );
}

function ActiveDot() {
  return <span className="flex h-2 w-2 rounded-full bg-brand-600" />;
}
