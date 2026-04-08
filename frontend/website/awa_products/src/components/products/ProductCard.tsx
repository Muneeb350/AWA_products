import type { Product } from "@/types/product";
import Link from "next/link";
import { slugFromLabel } from "@/constants/categories";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const subSlug = slugFromLabel(product.subCategory) ?? product.subCategory.toLowerCase();
  return (
    <Link
      href={`/products/${subSlug}/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {/* Stock badge */}
        <span
          className={`absolute right-3 top-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            product.inStock
              ? "bg-brand-100 text-brand-800"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category pill */}
        <span className="mb-2 inline-block w-fit rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
          {product.category}
        </span>

        <h3 className="text-lg font-semibold text-text">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-text-muted line-clamp-2">
          {product.description}
        </p>
      </div>
    </Link>
  );
}
