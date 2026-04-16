"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import ProductGridSkeleton from "@/components/ui/ProductGridSkeleton";
import CategoryFilter from "@/components/products/CategoryFilter";
import SearchInput from "@/components/ui/SearchInput";
import ErrorBanner from "@/components/ui/ErrorBanner";
import { useProducts } from "@/hooks/useProducts";
import {
  applyFilters,
  filtersFromSearchParams,
  filtersToSearchParams,
  getCategoryCounts,
} from "@/lib/filters";
import { products as mockProducts } from "@/data/products.mock";

/* ── Toggle: set true to use mock data, false for real API ── */
const USE_MOCK = process.env.NEXT_PUBLIC_MOCK_MODE !== "false";

export default function ProductsPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filter state from URL
  const filters = useMemo(
    () => filtersFromSearchParams(searchParams),
    [searchParams]
  );

  // React Query hook — automatically fetches with filters
  const { data, isLoading, error, refetch } = useProducts({
    subCategory: filters.subCategory,
    category: filters.category,
    ...(filters.q ? { q: filters.q } : {}),
  });

  // In mock mode, apply client-side filters on top of the fetched data
  // (The mock adapter already applies filters, but this ensures consistency)
  const displayProducts = useMemo(() => {
    if (USE_MOCK) {
      // Mock adapter already filtered, but apply again for safety
      return applyFilters(data, filters);
    }
    // API mode: server already filtered, but allow client-side refinement
    return applyFilters(data, filters);
  }, [data, filters]);

  // Category counts — from mock data in dev, from API data in production
  const categoryCounts = useMemo(
    () => getCategoryCounts(USE_MOCK ? mockProducts : data),
    [data]
  );

  /* ── Handlers ──────────────────────────── */

  function updateFilters(updates: { category?: string; subCategory?: string; q?: string }) {
    const newFilters: { category?: string; subCategory?: string; q?: string } = { ...filters, ...updates };
    if (!newFilters.category) delete newFilters.category;
    if (!newFilters.subCategory) delete newFilters.subCategory;
    if (!newFilters.q) delete newFilters.q;

    const params = new URLSearchParams();
    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.subCategory) params.set("subCategory", newFilters.subCategory);
    if (newFilters.q) params.set("q", newFilters.q);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function handleCategorySelect(subCategory: string) {
    updateFilters({ subCategory: subCategory || undefined, category: undefined });
  }

  function handleSearch(value: string) {
    updateFilters({ q: value.trim() || undefined });
  }

  /* ── Render ────────────────────────────── */

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-text">
          Euzzy Product Catalog
        </h1>
        <p className="mt-2 text-text-muted">
          Products manufactured by AWA Products under the Euzzy brand.
          Filter by category or search by name.
        </p>
      </div>

      {/* Mobile category pills */}
      <div className="mb-4 lg:hidden">
        <MobileCategoryPills
          categories={categoryCounts}
          activeSubCategory={filters.subCategory ?? ""}
          onSelect={handleCategorySelect}
        />
      </div>

      {/* Mobile search */}
      <div className="mb-4 lg:hidden">
        <SearchInput
          value={filters.q ?? ""}
          onChange={handleSearch}
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <CategoryFilter
              categories={categoryCounts}
              activeSubCategory={filters.subCategory ?? ""}
              onSelect={handleCategorySelect}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Desktop search */}
          <div className="mb-6 hidden lg:block">
            <SearchInput
              value={filters.q ?? ""}
              onChange={handleSearch}
            />
          </div>

          {/* Error state */}
          {error && (
            <ErrorBanner
              message={error.message}
              onRetry={refetch}
              className="mb-6"
            />
          )}

          {/* Results count */}
          {!isLoading && (
            <p className="mb-4 text-sm text-text-muted">
              Showing {displayProducts.length} product
              {displayProducts.length !== 1 ? "s" : ""}
              {filters.subCategory && ` in "${filters.subCategory}"`}
              {filters.q && ` matching "${filters.q}"`}
            </p>
          )}

          {/* Loading skeleton or product grid */}
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <ProductGrid products={displayProducts} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Mobile category pills ───────────────── */

import type { CategoryCount } from "@/components/products/CategoryFilter";

const CATEGORY_ORDER = [
  "All Products",
  "House Hold",
  "Laundry",
  "Office",
  "Industrial",
  "Restaurant",
  "Mechanic Special",
  "Packaging",
  "Clinical",
];

function MobileCategoryPills({
  categories,
  activeSubCategory,
  onSelect,
}: {
  categories: CategoryCount[];
  activeSubCategory: string;
  onSelect: (subCategory: string) => void;
}) {
  // Build a lookup map for counts
  const countMap = useMemo(() => {
    const map: Record<string, number> = {};
    categories.forEach((c) => {
      map[c.name] = c.count;
    });
    return map;
  }, [categories]);

  const totalProducts = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2 pb-1">
        {CATEGORY_ORDER.map((label) => {
          const isActive =
            label === "All Products"
              ? !activeSubCategory
              : activeSubCategory === label;
          const count =
            label === "All Products" ? totalProducts : countMap[label] ?? 0;

          return (
            <button
              key={label}
              onClick={() =>
                onSelect(label === "All Products" ? "" : label)
              }
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-brand-600 text-white shadow-sm"
                  : "border border-border bg-surface text-text hover:bg-surface-alt"
              }`}
            >
              {label}
              <span
                className={`ml-1.5 text-xs ${
                  isActive ? "text-white/80" : "text-text-muted"
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
