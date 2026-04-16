import ProductGrid from "@/components/products/ProductGrid";
import HeroSection from "@/components/home/HeroSection";
import { getInStockProducts } from "@/data/products.mock";
import { SUB_CATEGORIES } from "@/constants/categories";
import Link from "next/link";

export default function Home() {
  const featuredProducts = getInStockProducts().slice(0, 4);

  const counts: Record<string, number> = {};
  getInStockProducts().forEach((p) => {
    counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
  });

  return (
    <div className="relative">
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Shop by Category ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center animate-fade-in-up">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
            Our Product Lines
          </p>
          <h2 className="text-3xl font-bold leading-tight text-text sm:text-4xl">
            Manufactured for Every Sector
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {SUB_CATEGORIES.map(({ label, slug }, i) => (
            <Link
              key={slug}
              href={`/products/${slug}`}
              style={{ animationDelay: `${i * 50}ms` }}
              className="animate-fade-in-up rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text shadow-sm transition duration-200 hover:scale-105 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 hover:shadow-md"
            >
              {label}
              <span className="ml-1.5 text-xs text-text-muted">
                ({counts[label] ?? 0})
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6 lg:px-8">
        {/* Responsive Header Wrapper: Mobile pe Column, Desktop pe Row */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          
          {/* Text Content */}
          <div className="animate-fade-in-up">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">
              From Our Facility
            </p>
            <h2 className="text-3xl font-bold leading-tight text-text sm:text-4xl">
              Featured Euzzy Products
            </h2>
          </div>

          {/* View All Button - Optimized for Mobile */}
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-4 transition-all duration-300 w-full md:w-auto"
          >
            {/* BACKGROUND LAYER (Blur + Tint) */}
            <div className="absolute inset-0 bg-brand-600/20 backdrop-blur-xl border border-brand-600/30 rounded-full transition-all duration-300 group-hover:bg-brand-600/40 group-hover:border-brand-600/50"></div>

            {/* CONTENT LAYER */}
            <span className="relative flex items-center justify-center gap-3 text-brand-700 font-bold tracking-wide transition-colors duration-300 group-hover:text-brand-900">
              View All Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </Link> 
        </div>

        {/* Products Grid */}
        <ProductGrid products={featuredProducts} />
      </section>
    </div>
  );
}