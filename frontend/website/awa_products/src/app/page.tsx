import ProductGrid from "@/components/products/ProductGrid";
import { getInStockProducts } from "@/data/products.mock";
import { SUB_CATEGORIES } from "@/constants/categories";
import Link from "next/link";

export default function Home() {
  const featuredProducts = getInStockProducts().slice(0, 4);

  // Build counts from mock data
  const counts: Record<string, number> = {};
  getInStockProducts().forEach((p) => {
    counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
  });

  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="bg-gradient-to-br from-brand-50 to-surface-alt">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
            Professional Cleaning Solutions, Wholesale Prices
          </h1>
          <p className="mt-4 max-w-xl text-lg text-text-muted">
            Surface cleaners, laundry care, kitchen degreasers, disinfectants, and more — formulated for performance, priced for business.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-text-inverse shadow-sm transition hover:bg-brand-700"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition hover:bg-surface-alt"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sub-Categories ── */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-text">Shop by Category</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {SUB_CATEGORIES.map(({ label, slug }) => (
            <Link
              key={slug}
              href={`/products/${slug}`}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text shadow-sm transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
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
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text">Featured Products</h2>
          <Link
            href="/products"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="mt-6">
          <ProductGrid products={featuredProducts} />
        </div>
      </section>
    </div>
  );
}
