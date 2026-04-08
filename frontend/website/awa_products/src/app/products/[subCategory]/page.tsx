import { notFound } from "next/navigation";
import { labelFromSlug, SUB_CATEGORIES } from "@/constants/categories";
import { products } from "@/data/products.mock";
import ProductGrid from "@/components/products/ProductGrid";
import ErrorBanner from "@/components/ui/ErrorBanner";
import Link from "next/link";

interface SearchParams {
  subCategory: string;
}

interface Props {
  params: Promise<SearchParams>;
}

/**
 * Dynamic route: /products/[subCategory]
 * e.g. /products/laundry → shows only Laundry sub-category products
 */
export default async function SubCategoryPage({ params }: Props) {
  const { subCategory: slug } = await params;
  const activeLabel = labelFromSlug(slug);

  if (!activeLabel) {
    notFound();
  }

  const filteredProducts = products.filter((p) => p.subCategory === activeLabel);

  // Build counts in the EXACT order of SUB_CATEGORIES (not alphabetical)
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
  });
  const total = products.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-600">
          Products
        </Link>
        <span>/</span>
        <span className="text-text font-medium">{activeLabel}</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          {activeLabel}
        </h1>
        <p className="mt-2 text-text-muted">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} in{" "}
          {activeLabel.toLowerCase()}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — sub-category quick links (ordered by SUB_CATEGORIES) */}
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <SubCategorySidebar
              activeSlug={slug}
              counts={counts}
              total={total}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {filteredProducts.length === 0 ? (
            <ErrorBanner
              message={`No products found in "${activeLabel}". Check back soon — we're adding new products regularly.`}
              className="mb-6"
            />
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-category sidebar ────────────────── */

function SubCategorySidebar({
  activeSlug,
  counts,
  total,
}: {
  activeSlug: string;
  counts: Record<string, number>;
  total: number;
}) {
  return (
    <aside className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
        All Categories
      </h3>
      <ul className="mt-3 flex flex-col gap-1">
        {/* "All Products" option */}
        <li>
          <Link
            href="/products"
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
              !activeSlug
                ? "bg-brand-50 font-semibold text-brand-700"
                : "text-text hover:bg-surface-alt"
            }`}
          >
            All Products
            <span className="text-xs text-text-muted">({total})</span>
          </Link>
        </li>

        {/* Sub-categories in centralized order */}
        {SUB_CATEGORIES.map(({ label, slug }) => {
          const isActive = slug === activeSlug;
          const count = counts[label] ?? 0;
          return (
            <li key={slug}>
              <Link
                href={`/products/${slug}`}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-50 font-semibold text-brand-700"
                    : "text-text hover:bg-surface-alt"
                }`}
              >
                <span>{label}</span>
                <span className="text-xs text-text-muted">({count})</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
