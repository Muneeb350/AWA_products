import type { Product } from "@/types/product";

/* ─────────────────────────────────────────────
   Out-of-Stock Guard Utilities
   ─────────────────────────────────────────────
   Centralised helpers so every component handles
   unavailable products consistently.

   Rules when inStock === false:
   1. ProductCard → shows "Out of Stock" badge, link still works (for browsing)
   2. WhatsApp / CTA buttons → disabled + greyed out
   3. Add-to-cart / quantity selectors → not rendered
   4. Detail page → shows availability banner
   ───────────────────────────────────────────── */

/**
 * Type guard — narrows Product to "out of stock" variant.
 */
export function isOutOfStock(product: Product): boolean {
  return !product.inStock;
}

/**
 * Returns CSS class string for dimming / disabling an element.
 * Use on buttons, links, or interactive wrappers.
 */
export function outOfStockClasses(): string {
  return "pointer-events-none select-none opacity-50 cursor-not-allowed";
}

/**
 * Higher-order component wrapper that disables children when product is out of stock.
 *
 * Usage:
 *   <OutOfStockGuard product={product}>
 *     <WhatsAppButton href={whatsappUrl} />
 *   </OutOfStockGuard>
 */
import type { ReactNode } from "react";
import OutOfStockBanner from "@/components/ui/OutOfStockBanner";

interface OutOfStockGuardProps {
  product: Product;
  children: ReactNode;
  /** When true, children are still rendered but dimmed. Default: true. */
  dimInsteadOfHide?: boolean;
}

export function OutOfStockGuard({
  product,
  children,
  dimInsteadOfHide = true,
}: OutOfStockGuardProps) {
  if (!isOutOfStock(product)) return <>{children}</>;

  if (dimInsteadOfHide) {
    return (
      <div className="space-y-3">
        <OutOfStockBanner />
        <div className={outOfStockClasses()}>{children}</div>
      </div>
    );
  }

  return <OutOfStockBanner />;
}
