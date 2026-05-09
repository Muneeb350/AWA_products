import { get } from "./client";
import type { Product, SubCategory } from "@/types/product";

/* ─────────────────────────────────────────────
   Backend response shape
   ─────────────────────────────────────────────
   The backend returns a flat Product model that differs from
   the frontend Product type. We normalise it here.
*/
interface BackendProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
}

/** Map from backend category label to the closest frontend SubCategory */
const CATEGORY_TO_SUB: Record<string, SubCategory> = {
  "Glass Care": "Cleaning Chemicals",
  "Floor Care": "Janitorial Cleaning Supplies",
  "Bathroom Care": "Cleaning Chemicals",
  "Disinfectants": "Cleaning Chemicals",
  "Kitchen & Industrial": "Cleaning Chemicals",
  "Laundry Care": "Laundry Care",
  "Office": "Janitorial Cleaning Supplies",
  "Restaurant": "Cleaning Chemicals",
  "Packaging": "Trash Liners",
  "Mechanic Special": "Cleaning Chemicals",
  "Paper Products": "Paper Products",
  "Disposable Food Service": "Disposable Food Service",
  "Trash Liners": "Trash Liners",
};

function mapProduct(p: BackendProduct): Product {
  return {
    id: String(p.id),
    name: p.name,
    description: p.description,
    category: p.category,
    subCategory: CATEGORY_TO_SUB[p.category] ?? "Cleaning Chemicals",
    image: p.image_url ?? "/placeholder.png",
    inStock: true,
  };
}

/* ─────────────────────────────────────────────
   API functions  (backend routes: /api/products)
   ───────────────────────────────────────────── */

export async function fetchAllProducts(params?: {
  category?: string;
  subCategory?: string;
  q?: string;
  inStock?: boolean;
}): Promise<Product[]> {
  const raw = await get<BackendProduct[]>("/api/products", { params });
  return raw.map(mapProduct);
}

export async function fetchProductById(id: string): Promise<Product> {
  const raw = await get<BackendProduct>(`/api/products/${id}`);
  return mapProduct(raw);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const raw = await get<BackendProduct[]>("/api/products", { params: { q: query } });
  return raw.map(mapProduct);
}

export async function fetchInStockProducts(): Promise<Product[]> {
  const raw = await get<BackendProduct[]>("/api/products");
  return raw.map(mapProduct);
}
