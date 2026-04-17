"use client"

import { useState, useEffect, useRef } from "react"
import { X, ChevronDown, Package, Pencil } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductFormData {
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: "active" | "draft"
  description: string
}

export type EditableProduct = ProductFormData & { id: string }

interface AddProductModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ProductFormData) => void
  editProduct?: EditableProduct | null
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ["Electronics", "Accessories", "Peripherals", "Storage", "Networking"]

const EMPTY_FORM: {
  name: string; sku: string; category: string; price: string
  stock: string; status: "active" | "draft"; description: string
} = {
  name: "", sku: "", category: "Electronics",
  price: "", stock: "", status: "active", description: "",
}

/**
 * Ordered field list used for Enter-key navigation.
 * required=true means the field must be non-empty before focus advances.
 */
const FIELD_ORDER: ReadonlyArray<{
  key: keyof typeof EMPTY_FORM
  required: boolean
}> = [
  { key: "name",        required: true  },
  { key: "sku",         required: false },
  { key: "category",    required: false },
  { key: "status",      required: false },
  { key: "price",       required: true  },
  { key: "stock",       required: true  },
  { key: "description", required: false }, // last — Enter submits
]

const FIELD_ERRORS: Partial<Record<keyof typeof EMPTY_FORM, string>> = {
  name:  "Product name is required",
  price: "Enter a valid price",
  stock: "Enter a valid stock quantity",
}

const selectCls =
  "flex h-9 w-full appearance-none rounded-lg border border-zinc-200 bg-white " +
  "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 " +
  "px-3 py-1 pr-8 text-sm text-zinc-900 focus:outline-none focus:ring-2 " +
  "focus:ring-green-500/25 focus:border-green-400 dark:focus:border-green-500 transition-colors"

// ─── Component ────────────────────────────────────────────────────────────────

export function AddProductModal({
  open,
  onClose,
  onSubmit,
  editProduct,
}: AddProductModalProps) {
  const isEdit = !!editProduct

  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof EMPTY_FORM, string>>>({})

  // One ref per field — used by Enter-key navigation
  const nameRef     = useRef<HTMLInputElement>(null)
  const skuRef      = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)
  const statusRef   = useRef<HTMLSelectElement>(null)
  const priceRef    = useRef<HTMLInputElement>(null)
  const stockRef    = useRef<HTMLInputElement>(null)
  const descRef     = useRef<HTMLTextAreaElement>(null)

  // ── Populate / reset form when modal opens or edit target changes ──────────
  useEffect(() => {
    if (open) {
      setErrors({})
      setForm(
        editProduct
          ? {
              name:        editProduct.name,
              sku:         editProduct.sku,
              category:    editProduct.category,
              price:       String(editProduct.price),
              stock:       String(editProduct.stock),
              status:      editProduct.status,
              description: editProduct.description,
            }
          : EMPTY_FORM
      )
      setTimeout(() => nameRef.current?.focus(), 60)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      // Delay reset so the close animation plays cleanly
      const t = setTimeout(() => { setForm(EMPTY_FORM); setErrors({}) }, 250)
      return () => clearTimeout(t)
    }
  }, [open, editProduct])

  // ESC closes modal
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  // ── Helpers ───────────────────────────────────────────────────────────────

  function setField<K extends keyof typeof EMPTY_FORM>(key: K, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  function focusField(key: string) {
    switch (key) {
      case "name":        nameRef.current?.focus();     break
      case "sku":         skuRef.current?.focus();      break
      case "category":    categoryRef.current?.focus(); break
      case "status":      statusRef.current?.focus();   break
      case "price":       priceRef.current?.focus();    break
      case "stock":       stockRef.current?.focus();    break
      case "description": descRef.current?.focus();     break
    }
  }

  function validate() {
    const errs: typeof errors = {}
    if (!form.name.trim())                        errs.name  = FIELD_ERRORS.name
    if (!form.price || Number(form.price) <= 0)   errs.price = FIELD_ERRORS.price
    if (form.stock === "" || Number(form.stock) < 0) errs.stock = FIELD_ERRORS.stock
    return errs
  }

  function doSubmit() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({
      name:        form.name.trim(),
      sku:         form.sku.trim() || `SKU-${Date.now().toString().slice(-6)}`,
      category:    form.category,
      price:       Number(form.price),
      stock:       Number(form.stock),
      status:      form.status,
      description: form.description.trim(),
    })
  }

  // ── Enter-key navigation ──────────────────────────────────────────────────
  /**
   * Shared onKeyDown handler for every form field.
   * - Non-Enter keys: ignored (native behaviour).
   * - Enter on the last field (description): submits.
   * - Enter on any other field:
   *     • If required and empty → show inline error, stay focused.
   *     • Otherwise → clear error, move focus to the next field.
   */
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    fieldKey: keyof typeof EMPTY_FORM
  ) {
    if (e.key !== "Enter") return

    const idx = FIELD_ORDER.findIndex(f => f.key === fieldKey)

    // Last field → submit (Shift+Enter still inserts a newline in the textarea)
    if (idx === FIELD_ORDER.length - 1) {
      if (!e.shiftKey) {
        e.preventDefault()
        doSubmit()
      }
      return
    }

    e.preventDefault()

    const { required } = FIELD_ORDER[idx]
    const val = String(form[fieldKey]).trim()

    // Block advance on empty required field
    if (required && !val) {
      setErrors(prev => ({ ...prev, [fieldKey]: FIELD_ERRORS[fieldKey] ?? "Required" }))
      return
    }

    // Clear error if field is now valid
    setErrors(prev => ({ ...prev, [fieldKey]: undefined }))

    // Advance focus
    focusField(FIELD_ORDER[idx + 1].key)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label={isEdit ? "Edit product" : "Add new product"}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl shadow-black/10 w-full max-w-lg flex flex-col max-h-[92vh] transition-all duration-200",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                isEdit ? "bg-blue-500/10" : "bg-green-500/10"
              )}
            >
              {isEdit
                ? <Pencil className="w-4 h-4 text-blue-500" />
                : <Package className="w-4 h-4 text-green-500" />
              }
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">
                {isEdit ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isEdit
                  ? "Update the product details below"
                  : "Fill in the details to add to catalog"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Form ── */}
        <form
          onSubmit={e => { e.preventDefault(); doSubmit() }}
          className="flex flex-col flex-1 overflow-y-auto min-h-0"
        >
          <div className="px-6 py-5 space-y-4">

            {/* Row 1 — Name + SKU */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-600">
                  Product Name <span className="text-red-400">*</span>
                </label>
                <Input
                  ref={nameRef}
                  placeholder="e.g. Premium Headphones"
                  value={form.name}
                  onChange={e => setField("name", e.target.value)}
                  onKeyDown={e => handleKeyDown(e, "name")}
                  className={cn(
                    "h-9",
                    errors.name && "border-red-400 focus-visible:ring-red-400/25 focus-visible:border-red-400"
                  )}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500 flex items-center gap-1">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-600">
                  SKU{" "}
                  <span className="text-zinc-400 font-normal">(auto if blank)</span>
                </label>
                <Input
                  ref={skuRef}
                  placeholder="e.g. PHN-001"
                  value={form.sku}
                  onChange={e => setField("sku", e.target.value)}
                  onKeyDown={e => handleKeyDown(e, "sku")}
                  className="h-9"
                />
              </div>
            </div>

            {/* Row 2 — Category + Status */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-600">Category</label>
                <div className="relative">
                  <select
                    ref={categoryRef}
                    value={form.category}
                    onChange={e => setField("category", e.target.value)}
                    onKeyDown={e => handleKeyDown(e, "category")}
                    className={selectCls}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-600">Status</label>
                <div className="relative">
                  <select
                    ref={statusRef}
                    value={form.status}
                    onChange={e => setField("status", e.target.value)}
                    onKeyDown={e => handleKeyDown(e, "status")}
                    className={selectCls}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 3 — Price + Stock */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-600">
                  Price <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none">
                    $
                  </span>
                  <Input
                    ref={priceRef}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.price}
                    onChange={e => setField("price", e.target.value)}
                    onKeyDown={e => handleKeyDown(e, "price")}
                    className={cn(
                      "h-9 pl-6",
                      errors.price && "border-red-400 focus-visible:ring-red-400/25 focus-visible:border-red-400"
                    )}
                  />
                </div>
                {errors.price && (
                  <p className="text-[11px] text-red-500">{errors.price}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-600">
                  Stock <span className="text-red-400">*</span>
                </label>
                <Input
                  ref={stockRef}
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.stock}
                  onChange={e => setField("stock", e.target.value)}
                  onKeyDown={e => handleKeyDown(e, "stock")}
                  className={cn(
                    "h-9",
                    errors.stock && "border-red-400 focus-visible:ring-red-400/25 focus-visible:border-red-400"
                  )}
                />
                {errors.stock && (
                  <p className="text-[11px] text-red-500">{errors.stock}</p>
                )}
              </div>
            </div>

            {/* Row 4 — Description (last field → Enter submits) */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-600">
                Description{" "}
                <span className="text-zinc-400 font-normal">
                  (optional · Enter to submit, Shift+Enter for new line)
                </span>
              </label>
              <textarea
                ref={descRef}
                placeholder="Short description of the product…"
                rows={3}
                value={form.description}
                onChange={e => setField("description", e.target.value)}
                onKeyDown={e => handleKeyDown(e, "description")}
                className="flex w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500/25 focus:border-green-400 resize-none transition-colors"
              />
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-between gap-2.5 px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 shrink-0 bg-zinc-50/50 dark:bg-zinc-800/50 rounded-b-2xl">
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Press <kbd className="px-1 py-0.5 rounded bg-zinc-200 text-zinc-500 font-mono text-[10px]">Enter</kbd> to move between fields
            </p>
            <div className="flex items-center gap-2.5 ml-auto">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-zinc-200 text-zinc-600 hover:text-zinc-900 h-9"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={cn(
                  "h-9 px-5 text-white shadow-sm",
                  isEdit
                    ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/20"
                    : "bg-green-500 hover:bg-green-600 shadow-green-500/20"
                )}
              >
                {isEdit ? "Save Changes" : "Add Product"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
