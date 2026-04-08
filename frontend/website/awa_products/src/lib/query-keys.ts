/**
 * React Query key factory for all product-related queries.
 *
 * Using a structured key factory ensures:
 * 1. Predictable cache invalidation
 * 2. No key collisions between different queries
 * 3. Easy refetching of specific subsets
 *
 * Usage:
 *   queryClient.invalidateQueries({ queryKey: productKeys.all });
 *   queryClient.invalidateQueries({ queryKey: productKeys.lists });
 *   queryClient.invalidateQueries({ queryKey: productKeys.detail("prod-001") });
 */

export const productKeys = {
  /** Root key — invalidates EVERYTHING product-related */
  all: ["products"] as const,

  /** All list-type queries (paginated, filtered, searched) */
  lists: ["products", "list"] as const,

  /** A specific list query with filters */
  list: (filters?: { category?: string; q?: string; inStock?: boolean }) =>
    ["products", "list", { ...filters }] as const,

  /** All detail-type queries */
  details: ["products", "detail"] as const,

  /** A single product by ID */
  detail: (id: string) => ["products", "detail", id] as const,
};
