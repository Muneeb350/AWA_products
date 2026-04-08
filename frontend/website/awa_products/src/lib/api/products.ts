/**
 * @deprecated Import from `./apiService` and `./mockAdapter` directly.
 *
 * This file is kept for backward compatibility.
 * New code should use:
 *   - `./apiService` for real API calls
 *   - `./mockAdapter` for mock data
 *   - `@/hooks/useProducts` for React Query hooks (recommended)
 */

export {
  fetchAllProducts,
  fetchProductById,
  searchProducts,
  fetchInStockProducts,
} from "./apiService";

export {
  fetchAllProductsMock,
  fetchProductByIdMock,
  searchProductsMock,
  fetchInStockProductsMock,
} from "./mockAdapter";
