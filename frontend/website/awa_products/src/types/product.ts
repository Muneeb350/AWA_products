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
  | "Laundry Care"
  | "Cleaning Chemicals"
  | "Disposable Food Service"
  | "Janitorial Cleaning Supplies"
  | "Paper Products"
  | "Trash Liners";

/** Human-readable sub-category slug for URLs (lowercase, hyphenated) */
export function subCategorySlug(sub: SubCategory): string {
  return sub.toLowerCase().replace(/\s+/g, "-");
}

/** Reverse: slug → SubCategory */
export function slugToSubCategory(slug: string): SubCategory | null {
  const map: Record<string, SubCategory> = {
    "laundry-care": "Laundry Care",
    "cleaning-chemicals": "Cleaning Chemicals",
    "disposable-food-service": "Disposable Food Service",
    "janitorial-cleaning-supplies": "Janitorial Cleaning Supplies",
    "paper-products": "Paper Products",
    "trash-liners": "Trash Liners",
  };
  return map[slug] ?? null;
}

/** Ordered list of all sub-categories (for consistent rendering) */
export const ALL_SUB_CATEGORIES: SubCategory[] = [
  "Laundry Care",
  "Cleaning Chemicals",
  "Disposable Food Service",
  "Janitorial Cleaning Supplies",
  "Paper Products",
  "Trash Liners",
];
