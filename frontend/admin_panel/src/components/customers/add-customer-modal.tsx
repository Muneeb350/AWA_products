"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { X, UserPlus, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CustomerFormData {
  customerId: string
  name: string
  businessName: string
  phone: string
  address: string
  city: string
}

interface AddCustomerModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: CustomerFormData) => void
}

const CITIES = [
  "Dallas", "Garland", "Plano", "Irving", "Mesquite",
  "Arlington", "Frisco", "McKinney", "Richardson", "Carrollton",
]

const selectCls =
  "flex h-9 w-full appearance-none rounded-lg border border-zinc-200 bg-white " +
  "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 " +
  "px-3 py-1 pr-8 text-sm text-zinc-900 focus:outline-none focus:ring-2 " +
  "focus:ring-emerald-500/25 focus:border-emerald-400 dark:focus:border-emerald-500 transition-colors"

function generateCustomerId() {
  const digits = Math.floor(1000 + Math.random() * 9000)
  return `CUS-${digits}`
}

const EMPTY_FORM = (): CustomerFormData => ({
  customerId: generateCustomerId(),
  name: "",
  businessName: "",
  phone: "",
  address: "",
  city: CITIES[0],
})

export function AddCustomerModal({ open, onClose, onSubmit }: AddCustomerModalProps) {
  const [form, setForm]     = useState<CustomerFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({})
  const [spinning, setSpinning] = useState(false)

  const nameRef         = useRef<HTMLInputElement>(null)
  const businessRef     = useRef<HTMLInputElement>(null)
  const phoneRef        = useRef<HTMLInputElement>(null)
  const addressRef      = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM())
      setErrors({})
      setTimeout(() => nameRef.current?.focus(), 60)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  function setField(key: keyof CustomerFormData, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const refreshId = useCallback(() => {
    setSpinning(true)
    setForm(prev => ({ ...prev, customerId: generateCustomerId() }))
    setTimeout(() => setSpinning(false), 400)
  }, [])

  function validate() {
    const errs: Partial<Record<keyof CustomerFormData, string>> = {}
    if (!form.name.trim())  errs.name  = "Name is required"
    if (!form.phone.trim()) errs.phone = "Phone is required"
    return errs
  }

  function doSubmit() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({
      customerId:   form.customerId,
      name:         form.name.trim(),
      businessName: form.businessName.trim(),
      phone:        form.phone.trim(),
      address:      form.address.trim(),
      city:         form.city || CITIES[0],
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, key: keyof CustomerFormData) {
    if (e.key !== "Enter") return
    e.preventDefault()
    if (key === "name")         businessRef.current?.focus()
    else if (key === "businessName") phoneRef.current?.focus()
    else if (key === "phone")   addressRef.current?.focus()
    else if (key === "address") doSubmit()
  }

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Add customer"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200",
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div
        className={cn(
          "relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl shadow-black/10 w-full max-w-md flex flex-col transition-all duration-200",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Add Customer</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Fill in the customer's details below</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={e => { e.preventDefault(); doSubmit() }} className="px-6 py-5 space-y-4">

          {/* Customer ID — read-only with refresh */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
              Customer ID
              <span className="text-zinc-400 font-normal">(auto-generated)</span>
            </label>
            <div className="relative">
              <Input
                readOnly
                value={form.customerId}
                className={cn(
                  "h-9 pr-9 font-mono text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-default",
                  "border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-200 select-all"
                )}
              />
              <button
                type="button"
                onClick={refreshId}
                title="Generate new ID"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
              >
                <RefreshCw className={cn("w-3.5 h-3.5 transition-transform duration-300", spinning && "animate-spin")} />
              </button>
            </div>
          </div>

          {/* Name + Business Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Full Name <span className="text-red-400">*</span>
              </label>
              <Input
                ref={nameRef}
                placeholder="e.g. James Carter"
                value={form.name}
                onChange={e => setField("name", e.target.value)}
                onKeyDown={e => handleKeyDown(e, "name")}
                className={cn("h-9", errors.name && "border-red-400 focus-visible:ring-red-400/25 focus-visible:border-red-400")}
              />
              {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Business Name <span className="text-zinc-400 font-normal">(optional)</span>
              </label>
              <Input
                ref={businessRef}
                placeholder="e.g. Carter & Co."
                value={form.businessName}
                onChange={e => setField("businessName", e.target.value)}
                onKeyDown={e => handleKeyDown(e, "businessName")}
                className="h-9"
              />
            </div>
          </div>

          {/* Phone + City */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Phone <span className="text-red-400">*</span>
              </label>
              <Input
                ref={phoneRef}
                type="tel"
                placeholder="+1 214 000 1234"
                value={form.phone}
                onChange={e => setField("phone", e.target.value)}
                onKeyDown={e => handleKeyDown(e, "phone")}
                className={cn("h-9", errors.phone && "border-red-400 focus-visible:ring-red-400/25 focus-visible:border-red-400")}
              />
              {errors.phone && <p className="text-[11px] text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">City / Area</label>
              <div className="relative">
                <select
                  value={form.city}
                  onChange={e => setField("city", e.target.value)}
                  className={selectCls}
                >
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Address <span className="text-zinc-400 font-normal">(optional)</span>
            </label>
            <Input
              ref={addressRef}
              placeholder="e.g. 1234 Elm St, Suite 5"
              value={form.address}
              onChange={e => setField("address", e.target.value)}
              onKeyDown={e => handleKeyDown(e, "address")}
              className="h-9"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-2">
            <p className="text-[11px] text-zinc-400 font-mono bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-md border border-zinc-100 dark:border-zinc-700">
              {form.customerId}
            </p>
            <div className="flex items-center gap-2.5">
              <Button type="button" variant="outline" onClick={onClose} className="border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 h-9">
                Cancel
              </Button>
              <Button type="submit" className="h-9 px-5 bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20">
                Add Customer
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
