import type { Product } from "@/types/product";
import { products } from "@/data/products.mock";
import { notFound } from "next/navigation";
import Link from "next/link";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { isOutOfStock } from "@/lib/guards/outOfStock";
import OutOfStockBanner from "@/components/ui/OutOfStockBanner";
import ProductDetailSkeleton from "@/components/ui/ProductDetailSkeleton";
import { Suspense } from "react";
import { slugFromLabel } from "@/constants/categories";

interface RouteParams {
  subCategory: string;
  id: string;
}

interface Props {
  params: Promise<RouteParams>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id, subCategory: _subCategory } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent product={product} />
    </Suspense>
  );
}

function ProductDetailContent({ product }: { product: Product }) {
  const outOfStock = isOutOfStock(product);
  const subSlug = slugFromLabel(product.subCategory) ?? product.subCategory.toLowerCase();

  // Build the WhatsApp message with wholesale inquiry format
  const productUrl = `https://awaproducts.com/products/${subSlug}/${product.id}`;
  const message = `Hi AWA Products, I am interested in wholesale pricing for *${product.name}*.\n\nPlease share the bulk rates.\n\nProduct Link: ${productUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-muted">
        <Link href="/" className="hover:text-brand-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand-600">
          Products
        </Link>
        <span>/</span>
        <Link
          href={`/products/${subSlug}`}
          className="hover:text-brand-600"
        >
          {product.subCategory}
        </Link>
        <span>/</span>
        <span className="text-text">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-surface-alt">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Thumbnail placeholders for future multi-image support */}
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`aspect-square w-20 overflow-hidden rounded-lg border ${
                  i === 0
                    ? "border-brand-400 ring-2 ring-brand-200"
                    : "border-border opacity-50"
                } bg-surface-alt`}
              >
                <img
                  src={product.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          {/* Category + Sub-category + Stock + Safety badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link
              href={`/products/${subSlug}`}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 transition hover:bg-brand-100"
            >
              {product.subCategory}
            </Link>
            <span className="rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-text-muted">
              {product.category}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                product.inStock
                  ? "bg-brand-100 text-brand-800"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            {/* Safety warning badge */}
            {product.safetyWarnings && product.safetyWarnings.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                <SafetyIcon />
                Safety Info
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-text-muted">
            {product.description}
          </p>

          {/* Details table */}
          <div className="mt-6 rounded-xl border border-border bg-surface-alt p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
              Product Details
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-muted">Product ID</dt>
                <dd className="font-mono text-text">{product.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">Category</dt>
                <dd className="text-text">{product.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">Sub-Category</dt>
                <dd className="text-text">{product.subCategory}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-muted">Availability</dt>
                <dd
                  className={
                    product.inStock ? "text-success" : "text-danger"
                  }
                >
                  {product.inStock ? "Available" : "Currently Unavailable"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Usage Instructions */}
          {product.usageInstructions &&
            product.usageInstructions.length > 0 && (
              <div className="mt-6 rounded-xl border border-border bg-surface p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
                  <UsageIcon />
                  Usage Instructions
                </h3>
                <ol className="mt-3 space-y-3">
                  {product.usageInstructions.map((step, index) => (
                    <li key={index} className="flex gap-3 text-sm text-text">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

          {/* Safety Warnings */}
          {product.safetyWarnings && product.safetyWarnings.length > 0 && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                <WarningIcon />
                Safety Warnings
              </h3>
              <ul className="mt-3 space-y-2">
                {product.safetyWarnings.map((warning, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Out-of-stock banner */}
          {outOfStock && (
            <div className="mt-6">
              <OutOfStockBanner />
            </div>
          )}

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton
              href={whatsappUrl}
              disabled={outOfStock}
              label={
                outOfStock
                  ? "Notify When Available"
                  : "Request via WhatsApp"
              }
            />
            <Link
              href="/contact"
              className="flex-1 rounded-lg border border-border bg-surface px-6 py-3 text-center text-sm font-semibold text-text transition hover:bg-surface-alt"
            >
              Email Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Inline SVG icons ── */

function SafetyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01M10.29 3.86l-8.58 14.86A1 1 0 002.58 20h18.84a1 1 0 00.87-1.28L13.71 3.86a1 1 0 00-1.72 0z"
      />
    </svg>
  );
}

function UsageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01M10.29 3.86l-8.58 14.86A1 1 0 002.58 20h18.84a1 1 0 00.87-1.28L13.71 3.86a1 1 0 00-1.72 0z"
      />
    </svg>
  );
}
