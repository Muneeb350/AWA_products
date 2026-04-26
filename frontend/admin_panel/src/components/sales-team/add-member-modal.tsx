"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { X, UserPlus, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface MemberFormData {
  salesId: string
  name: string
  email: string
  phone: string
  region: string
}

interface AddMemberModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: MemberFormData) => void
}

const REGIONS = [
  "North Region", "South Region", "East Region", "West Region",
  "Central", "International",
]

const selectCls =
  "flex h-9 w-full appearance-none rounded-lg border border-zinc-200 bg-white " +
  "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 " +
  "px-3 py-1 pr-8 text-sm text-zinc-900 focus:outline-none focus:ring-2 " +
  "focus:ring-green-500/25 focus:border-green-400 dark:focus:border-green-500 transition-colors"

function generateSalesId() {
  const digits = Math.floor(1000 + Math.random() * 9000)
  return `AWA-${digits}`
}

const EMPTY_FORM = (): MemberFormData => ({
  salesId: generateSalesId(),
  name: "",
  email: "",
  phone: "",
  region: REGIONS[0],
})

export function AddMemberModal({ open, onClose, onSubmit }: AddMemberModalProps) {
  // Initialize salesId as "" to avoid SSR/client Math.random() mismatch.
  // The useEffect below sets it after mount.
  const [form, setForm] = useState<MemberFormData>({
    salesId: "",
    name: "",
    email: "",
    phone: "",
    region: REGIONS[0],
  })
  const [errors, setErrors] = useState<Partial<Record<keyof MemberFormData, string>>>({})
  const [spinning, setSpinning] = useState(false)

  const nameRef  = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  // Runs once after mount — safe to call Math.random() here (client only).
  useEffect(() => {
    setForm(EMPTY_FORM())
  }, [])

  // Generate a fresh ID every time the modal opens
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

  function setField(key: keyof MemberFormData, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const refreshId = useCallback(() => {
    setSpinning(true)
    setForm(prev => ({ ...prev, salesId: generateSalesId() }))
    setTimeout(() => setSpinning(false), 400)
  }, [])

  function validate() {
    const errs: Partial<Record<keyof MemberFormData, string>> = {}
    if (!form.name.trim())  errs.name  = "Name is required"
    if (!form.email.trim()) errs.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email"
    return errs
  }

  function doSubmit() {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({
      salesId: form.salesId,
      name:    form.name.trim(),
      email:   form.email.trim(),
      phone:   form.phone.trim(),
      region:  form.region || REGIONS[0],
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, key: keyof MemberFormData) {
    if (e.key !== "Enter") return
    e.preventDefault()
    if (key === "name") {
      if (!form.name.trim()) { setErrors(prev => ({ ...prev, name: "Name is required" })); return }
      emailRef.current?.focus()
    } else if (key === "email") {
      if (!form.email.trim()) { setErrors(prev => ({ ...prev, email: "Email is required" })); return }
      phoneRef.current?.focus()
    } else if (key === "phone") {
      doSubmit()
    }
  }

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label="Add team member"
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
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">Add Team Member</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Fill in the rep's details below</p>
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

        {/* Form */}
        <form onSubmit={e => { e.preventDefault(); doSubmit() }} className="px-6 py-5 space-y-4">

          {/* Sales ID — read-only with refresh */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-600 flex items-center gap-1.5">
              Sales ID
              <span className="text-zinc-400 font-normal">(auto-generated)</span>
            </label>
            <div className="relative">
              <Input
                readOnly
                value={form.salesId}
                className={cn(
                  "h-9 pr-9 font-mono text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-default",
                  "border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-200 select-all"
                )}
              />
              <button
                type="button"
                onClick={refreshId}
                title="Generate new ID"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-400 hover:text-green-600 hover:bg-green-50 transition-colors"
              >
                <RefreshCw className={cn("w-3.5 h-3.5 transition-transform duration-300", spinning && "animate-spin")} />
              </button>
            </div>
          </div>

          {/* Name + Email side-by-side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-600">
                Full Name <span className="text-red-400">*</span>
              </label>
              <Input
                ref={nameRef}
                placeholder="e.g. Sarah Johnson"
                value={form.name}
                onChange={e => setField("name", e.target.value)}
                onKeyDown={e => handleKeyDown(e, "name")}
                className={cn("h-9", errors.name && "border-red-400 focus-visible:ring-red-400/25 focus-visible:border-red-400")}
              />
              {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-600">
                Email <span className="text-red-400">*</span>
              </label>
              <Input
                ref={emailRef}
                type="email"
                placeholder="sarah@company.com"
                value={form.email}
                onChange={e => setField("email", e.target.value)}
                onKeyDown={e => handleKeyDown(e, "email")}
                className={cn("h-9", errors.email && "border-red-400 focus-visible:ring-red-400/25 focus-visible:border-red-400")}
              />
              {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
            </div>
          </div>

          {/* Phone + Region side-by-side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-600">
                Phone <span className="text-zinc-400 font-normal">(optional)</span>
              </label>
              <Input
                ref={phoneRef}
                type="tel"
                placeholder="+1 555 000 1234"
                value={form.phone}
                onChange={e => setField("phone", e.target.value)}
                onKeyDown={e => handleKeyDown(e, "phone")}
                className="h-9"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-600">Region / Area</label>
              <div className="relative">
                <select
                  value={form.region}
                  onChange={e => setField("region", e.target.value)}
                  className={selectCls}
                >
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-2">
            {form.salesId && (
              <p className="text-[11px] text-zinc-400 font-mono bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-md border border-zinc-100 dark:border-zinc-700">
                {form.salesId}
              </p>
            )}
            <div className="flex items-center gap-2.5">
              <Button type="button" variant="outline" onClick={onClose} className="border-zinc-200 text-zinc-600 hover:text-zinc-900 h-9">
                Cancel
              </Button>
              <Button type="submit" className="h-9 px-5 bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/20">
                Add Member
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
