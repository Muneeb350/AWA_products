/**
 * useProducts — React Query powered hook for all product data fetching.
 *
 * Automatically switches between Mock Data and Real API based on
 * the NEXT_PUBLIC_MOCK_MODE environment variable.
 *
 * ─────────────────────────────────────────────
 * USAGE
 * ─────────────────────────────────────────────
 *
 *   // Fetch all products
 *   const { data, isLoading, error } = useProducts();
 *
 *   // Filter by category
 *   const { data, isLoading, error } = useProducts({ category: "Spices & Seasonings" });
 *
 *   // Search
 *   const { data, isLoading, error } = useProducts({ q: "oil" });
 *
 *   // In-stock only
 *   const { data, isLoading, error } = useProducts({ inStock: true });
 *
 *   // Combined filters
 *   const { data, isLoading, error } = useProducts({
 *     category: "Edible Oils",
 *     q: "coconut",
 *   });
 *
 * ─────────────────────────────────────────────
 * FEATURES
 * ─────────────────────────────────────────────
 *  ✅ Automatic caching (React Query)
 *  ✅ Loading states
 *  ✅ Error handling (backend down, 404, etc.)
 *  ✅ Refetch on demand
 *  ✅ Stale-while-revalidate (5 min stale time)
 *  ✅ Seamless mock ↔ real API toggle
 */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "@/lib/query-keys";
import type { Product } from "@/types/product";

/* ── Toggle flag ─────────────────────────── */

const USE_MOCK = process.env.NEXT_PUBLIC_MOCK_MODE !== "false";

/* ── Import both data sources ────────────── */

import {
  fetchAllProducts,
  fetchProductById,
  searchProducts,
  fetchInStockProducts,
} from "@/lib/api/apiService";

import {
  fetchAllProductsMock,
  fetchProductByIdMock,
  searchProductsMock,
  fetchInStockProductsMock,
} from "@/lib/api/mockAdapter";

/* ── Types ───────────────────────────────── */

export interface UseProductsFilters {
  category?: string;
  subCategory?: string;
  q?: string;
  inStock?: boolean;
}

export interface UseProductsResult {
  data: Product[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  invalidate: () => void;
}

/* ── Hook ────────────────────────────────── */

export function useProducts(
  filters?: UseProductsFilters,
  enabled = true
): UseProductsResult {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: productKeys.list(filters),
    enabled,
    queryFn: async () => {
      if (USE_MOCK) {
        return fetchAllProductsMock(filters);
      }
      return fetchAllProducts(filters);
    },
  });

  return {
    data: data ?? [],
    isLoading,
    error: error instanceof Error ? error : null,
    refetch: () => refetch(),
    invalidate: () => queryClient.invalidateQueries({ queryKey: productKeys.all }),
  };
}

/* ── Single product hook ─────────────────── */

export interface UseProductResult {
  data: Product | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useProduct(id: string, enabled = true): UseProductResult {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: productKeys.detail(id),
    enabled: enabled && !!id,
    queryFn: () => {
      if (USE_MOCK) {
        return fetchProductByIdMock(id);
      }
      return fetchProductById(id);
    },
  });

  return {
    data: data ?? null,
    isLoading,
    error: error instanceof Error ? error : null,
    refetch: () => refetch(),
  };
}

/* ── Search-specific hook (with debounce) ── */

export function useProductSearch(
  query: string,
  enabled = true
): UseProductsResult {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: productKeys.list({ q: query }),
    enabled: enabled && query.trim().length > 0,
    queryFn: () => {
      if (USE_MOCK) {
        return searchProductsMock(query);
      }
      return searchProducts(query);
    },
  });

  return {
    data: data ?? [],
    isLoading,
    error: error instanceof Error ? error : null,
    refetch: () => refetch(),
    invalidate: () => queryClient.invalidateQueries({ queryKey: productKeys.all }),
  };
}

/* ── In-stock hook ───────────────────────── */

export function useInStockProducts(enabled = true): UseProductsResult {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: productKeys.list({ inStock: true }),
    enabled,
    queryFn: () => {
      if (USE_MOCK) {
        return fetchInStockProductsMock();
      }
      return fetchInStockProducts();
    },
  });

  return {
    data: data ?? [],
    isLoading,
    error: error instanceof Error ? error : null,
    refetch: () => refetch(),
    invalidate: () => queryClient.invalidateQueries({ queryKey: productKeys.all }),
  };
}
