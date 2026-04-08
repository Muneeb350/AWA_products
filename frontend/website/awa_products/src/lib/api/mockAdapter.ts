/**
 * Mock data adapter — mirrors the real API service shape.
 *
 * This file exists so the React Query hooks can call the same
 * function signatures regardless of whether mock or real data is used.
 * The toggle between mock and real happens at the hook level, not here.
 */

import type { Product } from "@/types/product";
import {
  products as mockProducts,
  getInStockProducts as mockInStock,
} from "@/data/products.mock";

/** Simulate network latency (80-200ms) for realistic loading states */
function delay<T>(data: T, minMs = 80, maxMs = 200): Promise<T> {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export async function fetchAllProductsMock(params?: {
  category?: string;
  subCategory?: string;
  q?: string;
  inStock?: boolean;
}): Promise<Product[]> {
  let result = [...mockProducts];

  if (params?.category) {
    result = result.filter((p) => p.category === params.category);
  }

  if (params?.subCategory) {
    result = result.filter((p) => p.subCategory === params.subCategory);
  }

  if (params?.inStock) {
    result = result.filter((p) => p.inStock);
  }

  if (params?.q) {
    const query = params.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.subCategory.toLowerCase().includes(query)
    );
  }

  return delay(result);
}

export async function fetchProductByIdMock(id: string): Promise<Product> {
  const product = mockProducts.find((p) => p.id === id);
  if (!product) throw new Error(`Product "${id}" not found`);
  return delay(product);
}

export async function searchProductsMock(query: string): Promise<Product[]> {
  const q = query.toLowerCase();
  const result = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
  return delay(result);
}

export async function fetchInStockProductsMock(): Promise<Product[]> {
  return delay(mockInStock());
}
