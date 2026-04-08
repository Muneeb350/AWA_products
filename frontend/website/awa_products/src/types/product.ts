// Product types for the AWA Products catalog

export interface Product {
  id: string;
  name: string;
  /** Main category (e.g., "Cleaning Supplies") */
  category: string;
  /** Sub-category (e.g., "Laundry", "Industrial") */
  subCategory: SubCategory;
  image: string;
  description: string;
  inStock: boolean;
  /** Step-by-step usage instructions for the product */
  usageInstructions?: string[];
  /** Safety warnings (e.g., "Keep away from children") */
  safetyWarnings?: string[];
}

/** All valid sub-categories used across the catalog */
export type SubCategory =
  | "House Hold"
  | "Laundry"
  | "Office"
  | "Industrial"
  | "Restaurant"
  | "Mechanic Special"
  | "Packaging"
  | "Clinical";

/** Human-readable sub-category slug for URLs (lowercase, hyphenated) */
export function subCategorySlug(sub: SubCategory): string {
  return sub.toLowerCase().replace(/\s+/g, "-");
}

/** Reverse: slug → SubCategory */
export function slugToSubCategory(slug: string): SubCategory | null {
  const map: Record<string, SubCategory> = {
    "house-hold": "House Hold",
    laundry: "Laundry",
    office: "Office",
    industrial: "Industrial",
    restaurant: "Restaurant",
    "mechanic-special": "Mechanic Special",
    packaging: "Packaging",
    clinical: "Clinical",
  };
  return map[slug] ?? null;
}

/** Ordered list of all sub-categories (for consistent rendering) */
export const ALL_SUB_CATEGORIES: SubCategory[] = [
  "House Hold",
  "Laundry",
  "Office",
  "Industrial",
  "Restaurant",
  "Mechanic Special",
  "Packaging",
  "Clinical",
];
