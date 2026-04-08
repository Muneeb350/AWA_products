/**
 * Centralized sub-category definitions.
 *
 * This is the SINGLE SOURCE OF TRUTH for sub-category order, names,
 * and slug mappings. All UI components (Navbar dropdown, Sidebar,
 * Home page pills) must import from here — never hardcode lists.
 *
 * To reorder categories, edit the SUB_CATEGORIES array below.
 */

export interface SubCategoryDef {
  /** Display name (e.g., "House Hold") */
  label: string;
  /** URL-safe slug (e.g., "house-hold") */
  slug: string;
}

/**
 * Ordered list of all sub-categories.
 * Edit this array to change the display order everywhere.
 */
export const SUB_CATEGORIES: SubCategoryDef[] = [
  { label: "House Hold", slug: "house-hold" },
  { label: "Laundry", slug: "laundry" },
  { label: "Office", slug: "office" },
  { label: "Industrial", slug: "industrial" },
  { label: "Restaurant", slug: "restaurant" },
  { label: "Mechanic Special", slug: "mechanic-special" },
  { label: "Packaging", slug: "packaging" },
  { label: "Clinical", slug: "clinical" },
];

/** Extract just the labels (for type compatibility) */
export const SUB_CATEGORY_LABELS: string[] = SUB_CATEGORIES.map((c) => c.label);

/** Extract just the slugs */
export const SUB_CATEGORY_SLUGS: string[] = SUB_CATEGORIES.map((c) => c.slug);

/** Look up a label by its slug */
export function labelFromSlug(slug: string): string | null {
  return SUB_CATEGORIES.find((c) => c.slug === slug)?.label ?? null;
}

/** Look up a slug by its label */
export function slugFromLabel(label: string): string | null {
  return SUB_CATEGORIES.find((c) => c.label === label)?.slug ?? null;
}
