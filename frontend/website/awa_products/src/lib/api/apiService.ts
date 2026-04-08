/**
 * Product API Service — Axios-based, integration-ready.
 *
 * This file contains ONLY the real API call definitions.
 * Mock data routing is handled separately in the React Query hooks
 * via the USE_MOCK_DATA flag.
 *
 * Backend endpoint contract:
 *   GET  /products              →  Product[]  |  { data: Product[], meta: {...} }
 *   GET  /products/:id          →  Product    |  { data: Product }
 *   GET  /products?category=X   →  Product[]
 *   GET  /products?q=oil        →  Product[]
 *
 * If your backend wraps responses in { data, meta }, update the unwrap
 * logic in each function below.
 */

import { get } from "./client";
import type { Product } from "@/types/product";

/* ─────────────────────────────────────────────
   Response shape adapter
   ─────────────────────────────────────────────
   If your backend returns:  { data: [...], meta: { total, page } }
   → set WRAPPED_RESPONSE = true and the functions will unwrap .data automatically.
   If your backend returns the array/object directly → keep it false.
*/
const WRAPPED_RESPONSE = false;

function unwrap<T>(payload: unknown): T {
  if (WRAPPED_RESPONSE && typeof payload === "object" && payload !== null && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

/* ─────────────────────────────────────────────
   API functions
   ───────────────────────────────────────────── */

/**
 * Fetch all products from the backend.
 * Supports optional query params: category, q (search), inStock.
 */
export async function fetchAllProducts(params?: {
  category?: string;
  subCategory?: string;
  q?: string;
  inStock?: boolean;
}): Promise<Product[]> {
  const response = await get<unknown>("/products", { params });
  return unwrap<Product[]>(response);
}

/**
 * Fetch a single product by its ID.
 */
export async function fetchProductById(id: string): Promise<Product> {
  const response = await get<unknown>(`/products/${id}`);
  return unwrap<Product>(response);
}

/**
 * Search products by name, description, or category.
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const response = await get<unknown>("/products", { params: { q: query } });
  return unwrap<Product[]>(response);
}

/**
 * Fetch only in-stock products.
 */
export async function fetchInStockProducts(): Promise<Product[]> {
  const response = await get<unknown>("/products", { params: { inStock: true } });
  return unwrap<Product[]>(response);
}
