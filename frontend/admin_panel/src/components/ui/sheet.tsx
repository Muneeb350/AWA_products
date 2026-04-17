"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  width?: string
}

export function Sheet({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = "sm:max-w-[500px]",
}: SheetProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full flex flex-col",
          "bg-white dark:bg-zinc-900",
          "transition-transform duration-300 ease-in-out",
          "shadow-[-8px_0_40px_rgba(0,0,0,0.12)]",
          width,
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
          <div className="min-w-0 pr-4">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 truncate">{title}</h2>
            {description && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors shrink-0 -mt-0.5 sheet-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 border-t border-zinc-100 dark:border-zinc-800 px-6 py-4 bg-zinc-50/50 dark:bg-zinc-800/50">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}
