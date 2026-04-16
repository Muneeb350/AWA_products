"use client";

import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import Link from "next/link";
import { slugFromLabel } from "@/constants/categories";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const subSlug =
    slugFromLabel(product.subCategory) ?? product.subCategory.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <Link
        href={`/products/${subSlug}/${product.id}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/90 shadow-lg shadow-black/10 backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/15"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-alt">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Stock badge */}
          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
              product.inStock
                ? "bg-brand-600/90 text-white"
                : "bg-red-600/90 text-white"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>

          {/* Hover overlay — "Get Quote" reveal */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/65 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="block w-full rounded-xl bg-brand-600 py-2.5 text-center text-sm font-semibold text-white transition group-hover:bg-brand-700">
              Get Quote
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col p-4">
          <span className="mb-1.5 inline-block w-fit rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
            {product.category}
          </span>
          <h3 className="text-base font-semibold leading-snug text-text">
            {product.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
