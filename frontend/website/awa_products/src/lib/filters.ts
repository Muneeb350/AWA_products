/**
 * Unified Product Filter Engine
 * ─────────────────────────────────────────────
 *
 * This module provides a single source of truth for filtering products.
 * It works identically whether the data comes from:
 *   1. Local mock data (client-side filtering)
 *   2. Real API (server-side filtering via query params)
 *
 * The key insight: the filter state lives in the URL search params.
 * Both the sidebar CategoryFilter and the search bar write to the same
 * URL state, and the React Query hook reads from it to fetch data.
 *
 * ─────────────────────────────────────────────
 * FLOW
 * ─────────────────────────────────────────────
 *
 *   User clicks category  →  URL: ?category=Spices+&+Seasonings
 *   User types in search  →  URL: ?q=oil&category=Edible+Oils
 *   React Query hook      →  reads URL params → calls API with filters
 *   API (mock or real)    →  returns filtered results
 *   UI re-renders          →  shows filtered ProductGrid
 *
 * ─────────────────────────────────────────────
 */

import type { Product, SubCategory } from "@/types/product";

/* ─────────────────────────────────────────────
   Filter state type — mirrors API query params
   ───────────────────────────────────────────── */

export interface ProductFilters {
  category?: string;
  subCategory?: SubCategory;
  q?: string;
  inStock?: boolean;
}

/* ─────────────────────────────────────────────
   Client-side filter (for mock data mode)
   ───────────────────────────────────────────── */

/**
 * Apply filters to a product array in memory.
 * Used when USE_MOCK = true or for additional client-side refinement.
 */
export function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = products;

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.subCategory) {
    result = result.filter((p) => p.subCategory === filters.subCategory);
  }

  if (filters.inStock) {
    result = result.filter((p) => p.inStock);
  }

  if (filters.q && filters.q.trim()) {
    const query = filters.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  return result;
}

/* ─────────────────────────────────────────────
   URL ↔ Filter state converters
   ───────────────────────────────────────────── */

/**
 * Read filter state from URLSearchParams.
 */
export function filtersFromSearchParams(params: URLSearchParams): ProductFilters {
  return {
    category: params.get("category") || undefined,
    subCategory: (params.get("subCategory") as SubCategory | null) || undefined,
    q: params.get("q") || undefined,
    inStock: params.get("inStock") === "true" ? true : undefined,
  };
}

/**
 * Write filter state to URLSearchParams (for router.replace).
 */
export function filtersToSearchParams(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.subCategory) params.set("subCategory", filters.subCategory);
  if (filters.q) params.set("q", filters.q);
  if (filters.inStock) params.set("inStock", String(filters.inStock));
  return params;
}

/**
 * Category count helper (for sidebar badges)
 * Returns counts for all 8 sub-categories, even if count is 0.
 */
export function getCategoryCounts(products: Product[]): { name: string; count: number }[] {
  // Count products by subCategory
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
  });

  // Return all 8 categories in the correct order, even if count is 0
  const categoryOrder = [
    "House Hold",
    "Laundry",
    "Office",
    "Industrial",
    "Restaurant",
    "Mechanic Special",
    "Packaging",
    "Clinical",
  ];

  return categoryOrder.map((name) => ({
    name,
    count: counts[name] || 0,
  }));
}
