import type { Product, SubCategory } from "@/types/product";

/**
 * Mock product data for AWA Products — Household & Cleaning.
 * Products are distributed across 8 sub-categories.
 * Replace with API calls once backend is ready.
 */
export const products: Product[] = [
  // ─── House Hold (2 products) ───────────────────────────
  {
    id: "prod-001",
    name: "CrystalClear Glass & Mirror Cleaner (750ml)",
    category: "Cleaning Supplies",
    subCategory: "House Hold",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&h=400&fit=crop",
    description:
      "Streak-free formula that cuts through fingerprints, smudges, and water spots instantly. Kills 99.9% of common household germs. Safe on all glass surfaces, mirrors, and stainless steel.",
    inStock: true,
    usageInstructions: [
      "Spray directly onto the surface from 15-20 cm distance.",
      "Wipe with a clean, lint-free cloth or paper towel.",
      "For heavy buildup, let sit for 30 seconds before wiping.",
      "Repeat if necessary for a crystal-clear finish.",
    ],
    safetyWarnings: [
      "Keep away from children and pets.",
      "Avoid contact with eyes. If contact occurs, rinse thoroughly with water.",
      "Do not mix with bleach or ammonia-based products.",
    ],
  },
  {
    id: "prod-002",
    name: "PowerWash Multi-Surface Floor Cleaner (5L)",
    category: "Cleaning Supplies",
    subCategory: "House Hold",
    image:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&h=400&fit=crop",
    description:
      "Concentrated pine-scented floor cleaner for tiles, marble, and hardwood. Eco-friendly biodegradable formula. Just 2 capfuls per bucket — one bottle lasts up to 3 months.",
    inStock: true,
    usageInstructions: [
      "Add 2 capfuls (30ml) to a bucket of warm water.",
      "Mop the floor as usual, wringing the mop well.",
      "Allow the floor to air dry — no rinsing required.",
      "For heavily soiled areas, apply undiluted and scrub before mopping.",
    ],
    safetyWarnings: [
      "Keep away from children and pets.",
      "Slippery when wet — exercise caution on freshly mopped floors.",
      "Store in a cool, dry place away from direct sunlight.",
    ],
  },

  // ─── Laundry (2 products) ──────────────────────────────
  {
    id: "prod-003",
    name: "FreshGuard Premium Laundry Detergent (10kg)",
    category: "Laundry Care",
    subCategory: "Laundry",
    image:
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&h=400&fit=crop",
    description:
      "High-efficiency powder detergent with active stain-removal enzymes. Removes tough stains — oil, sweat, food — in a single wash. Gentle on fabrics, tough on dirt. Fresh linen fragrance lasts up to 48 hours.",
    inStock: true,
    usageInstructions: [
      "Use 1 scoop (60g) for a regular load, 2 scoops for heavily soiled laundry.",
      "Add detergent to the drum before loading clothes.",
      "Works in both hand-wash and machine-wash (top-load & front-load).",
      "For best results, wash at 30-40°C.",
    ],
    safetyWarnings: [
      "Keep away from children and pets.",
      "May cause mild skin irritation with prolonged contact — wear gloves for hand washing.",
      "Store in a dry place to prevent clumping.",
    ],
  },
  {
    id: "prod-004",
    name: "SoftTouch Fabric Conditioner (3L)",
    category: "Laundry Care",
    subCategory: "Laundry",
    image:
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&h=400&fit=crop",
    description:
      "Luxury fabric softener with micro-encapsulated fragrance technology — the more you move, the more it smells fresh. Reduces static cling and keeps clothes soft wash after wash. Lavender & chamomile scent.",
    inStock: false,
    usageInstructions: [
      "Shake well before use.",
      "Add 45ml to the fabric softener compartment of your washing machine.",
      "For hand washing, dilute in water and soak clothes for 5 minutes before the final rinse.",
      "Do not pour directly onto dry fabric — may cause staining.",
    ],
    safetyWarnings: [
      "Keep away from children and pets.",
      "Harmful if swallowed — seek medical attention immediately.",
      "Avoid contact with eyes.",
    ],
  },

  // ─── Office (1 product) ────────────────────────────────
  {
    id: "prod-005",
    name: "DeskShine Office Surface Wipes (Canister of 80)",
    category: "Cleaning Supplies",
    subCategory: "Office",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    description:
      "Pre-moistened disinfecting wipes designed for office desks, keyboards, phones, and shared surfaces. Kills 99.9% of germs. Anti-static formula repels dust. Fresh citrus scent.",
    inStock: true,
    usageInstructions: [
      "Pull a wipe from the canister and reseal the lid immediately.",
      "Wipe the surface thoroughly, ensuring even coverage.",
      "Allow the surface to air dry — do not rinse.",
      "Dispose of the used wipe in a trash bin — do not flush.",
    ],
    safetyWarnings: [
      "Keep away from children and pets.",
      "Avoid contact with eyes and open wounds.",
      "For surface use only — not for skin.",
    ],
  },

  // ─── Industrial (2 products) ───────────────────────────
  {
    id: "prod-006",
    name: "KitchenKleen Industrial Oven Degreaser (5L)",
    category: "Heavy-Duty Cleaners",
    subCategory: "Industrial",
    image:
      "https://plus.unsplash.com/premium_photo-1664192424595-482dd94d9c45?w=800&auto=format&fit=crop&q=80",
    description:
      "Industrial-strength degreaser formulated for commercial ovens, stovetops, and range hoods. Dissolves baked-on grease and carbon deposits in minutes. Eco-friendly — no harsh chemical residue. Safe on stainless steel and enamel surfaces.",
    inStock: true,
    usageInstructions: [
      "Ensure the surface is cool before application.",
      "Spray generously onto the greasy area.",
      "Let the product work for 5-10 minutes.",
      "Wipe clean with a damp cloth or sponge. For stubborn deposits, use a non-scratch scrubber.",
      "Rinse with water and dry with a clean cloth.",
    ],
    safetyWarnings: [
      "Keep away from children and pets.",
      "Wear gloves during use — may cause skin irritation.",
      "Use in a well-ventilated area.",
      "Do not use on aluminium or painted surfaces.",
    ],
  },
  {
    id: "prod-007",
    name: "TuffScrub Concrete & Warehouse Floor Cleaner (20L)",
    category: "Heavy-Duty Cleaners",
    subCategory: "Industrial",
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&h=400&fit=crop",
    description:
      "Heavy-duty alkaline cleaner for warehouses, garages, and factory floors. Breaks down oil, grease, and tyre marks. Compatible with auto-scrubber machines. Dilutes 1:50 for cost-effective bulk cleaning.",
    inStock: true,
    usageInstructions: [
      "Dilute 1:50 with water for routine cleaning, 1:10 for heavy grime.",
      "Apply with a mop, auto-scrubber, or pressure washer.",
      "Allow 5 minutes dwell time for oily surfaces.",
      "Rinse thoroughly with clean water.",
    ],
    safetyWarnings: [
      "Corrosive — wear protective gloves and eyewear.",
      "Do not mix with acids or chlorine products.",
      "Store in a cool, ventilated area away from food products.",
    ],
  },

  // ─── Restaurant (1 product) ────────────────────────────
  {
    id: "prod-008",
    name: "GreaseZero Commercial Dishwash Gel (5L)",
    category: "Kitchen Essentials",
    subCategory: "Restaurant",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=400&fit=crop",
    description:
      "Ultra-concentrated dishwashing gel for commercial kitchens and restaurants. Cuts through burnt-on food and oily residue with minimal scrubbing. pH-balanced — gentle on hands, tough on grime. Compatible with commercial dishwashers.",
    inStock: true,
    usageInstructions: [
      "Add 5-10ml per sink fill or dishwasher compartment.",
      "Lather and wash dishes as usual.",
      "Rinse thoroughly with clean water.",
      "For baked-on grease, apply gel directly, let sit for 2 minutes, then scrub.",
    ],
    safetyWarnings: [
      "Keep away from children and pets.",
      "Avoid prolonged skin contact — rinse hands after use.",
      "Do not ingest. If swallowed, drink plenty of water and consult a doctor.",
    ],
  },

  // ─── Mechanic Special (1 product) ──────────────────────
  {
    id: "prod-009",
    name: "HandGuard Mechanic's Heavy-Duty Hand Cleaner (5L)",
    category: "Personal Hygiene",
    subCategory: "Mechanic Special",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&h=400&fit=crop",
    description:
      "Industrial-grade hand cleaner formulated for mechanics, technicians, and workshop staff. Removes grease, oil, tar, and carbon from hands without harsh scrubbing. Infused with pumice micro-beads and lanolin for deep cleaning + moisturising. Kills 99.9% of germs.",
    inStock: true,
    usageInstructions: [
      "Dispense 3-5ml onto dry or wet hands.",
      "Rub vigorously for 30 seconds, focusing on nails and creases.",
      "Rinse thoroughly with water.",
      "For extreme grime, repeat application.",
    ],
    safetyWarnings: [
      "For external use only.",
      "If irritation or rash occurs, discontinue use and consult a physician.",
      "Keep out of reach of children.",
    ],
  },

  // ─── Packaging (1 product) ─────────────────────────────
  {
    id: "prod-010",
    name: "CleanShip Warehouse Packaging Sanitiser Spray (2L)",
    category: "Sanitisation",
    subCategory: "Packaging",
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&h=400&fit=crop",
    description:
      "Fast-acting sanitiser spray for packaging surfaces, cardboard boxes, pallets, and dispatch areas. Kills 99.9% of bacteria and viruses on contact. Non-staining, quick-dry formula. Ideal for warehouses, fulfilment centres, and logistics hubs.",
    inStock: false,
    usageInstructions: [
      "Hold bottle 20-25 cm from the surface.",
      "Spray evenly until the surface is lightly coated.",
      "Allow 30 seconds contact time before handling.",
      "No rinsing required — safe for indirect food-contact packaging.",
    ],
    safetyWarnings: [
      "Keep away from children and pets.",
      "Do not spray directly onto food products.",
      "Use in a well-ventilated area.",
    ],
  },

  // ─── Clinical (1 product) ──────────────────────────────
  {
    id: "prod-011",
    name: "GermShield Hospital-Grade Disinfectant (5L)",
    category: "Disinfectants",
    subCategory: "Clinical",
    image:
      "https://plus.unsplash.com/premium_photo-1763464629599-f892109ef50f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlzaW5mZWN0ZW50JTIwZm9yJTIwaG9zcGl0YWx8ZW58MHx8MHx8fDA%3D",
    description:
      "Broad-spectrum hospital-grade disinfectant that eliminates 99.99% of bacteria, viruses, and fungi on hard surfaces. No-rinse formula — spray and wipe. Fast-acting: kills germs in just 30 seconds contact time. Suitable for clinics, dental offices, and healthcare settings.",
    inStock: true,
    usageInstructions: [
      "Pre-clean heavily soiled surfaces before disinfecting.",
      "Hold bottle 20-25 cm from the surface and spray until evenly coated.",
      "Allow the product to remain wet on the surface for at least 30 seconds.",
      "Wipe with a clean cloth or allow to air dry.",
    ],
    safetyWarnings: [
      "Keep away from children and pets.",
      "Do not use on food-contact surfaces without rinsing.",
      "Avoid mixing with other cleaning products.",
      "Use in a well-ventilated area.",
    ],
  },
];

/* ─────────────────────────────────────────────
   Helper functions
   ───────────────────────────────────────────── */

/** Get all distinct sub-categories present in mock data */
export function getSubCategories(): SubCategory[] {
  return [...new Set(products.map((p) => p.subCategory))];
}

/** Get sub-categories with product counts */
export function getSubCategoriesWithCounts(): {
  name: SubCategory;
  count: number;
}[] {
  const counts: Record<string, number> = {};
  products.forEach((p) => {
    counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name: name as SubCategory, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Filter products by sub-category */
export function getProductsBySubCategory(subCategory: SubCategory): Product[] {
  return products.filter((p) => p.subCategory === subCategory);
}

/** Get only in-stock products */
export function getInStockProducts(): Product[] {
  return products.filter((p) => p.inStock);
}

/** Get distinct main categories */
export function getMainCategories(): string[] {
  return [...new Set(products.map((p) => p.category))].sort();
}
