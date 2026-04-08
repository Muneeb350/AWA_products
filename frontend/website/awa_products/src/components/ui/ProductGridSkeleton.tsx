import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
}

/**
 * Renders a grid of skeleton cards.
 * Default count matches the responsive grid breakpoints (4 columns).
 */
export default function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </section>
  );
}
