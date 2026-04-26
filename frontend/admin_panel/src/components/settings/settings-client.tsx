"use client"

import { useState, useRef } from "react"
import {
  Eye, EyeOff, CheckCircle2, Save,
  Camera, Shield, Bell, User,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 shrink-0",
        checked ? "bg-emerald-600" : "bg-zinc-200"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </button>
  )
}

// ─── Password Field ───────────────────────────────────────────────────────────

function PasswordField({
  id, label, value, onChange, show, onToggle, error, placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggle: () => void
  error?: string
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-zinc-500">{label}</label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder ?? "••••••••"}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={cn(
            "h-9 pr-9 border-zinc-200",
            error && "border-red-400 focus-visible:ring-red-400/25 focus-visible:border-red-400"
          )}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  )
}

// ─── Save Toast ───────────────────────────────────────────────────────────────

function SaveToast({ visible, message = "Settings saved" }: { visible: boolean; message?: string }) {
  return (
    <div className={cn(
      "fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-50",
      "bg-zinc-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl shadow-black/20",
      "transition-all duration-300",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
    )}>
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      {message}
    </div>
  )
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
      {/* Section header */}
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 leading-tight">{title}</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px bg-zinc-100 my-5" />
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SettingsClient() {
  // Profile
  const [name, setName]         = useState("Admin User")
  const [email, setEmail]       = useState("admin@awaproducts.com")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [profileToast, setProfileToast] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Password
  const [current,  setCurrent]  = useState("")
  const [next,     setNext]     = useState("")
  const [confirm,  setConfirm]  = useState("")
  const [showCur,  setShowCur]  = useState(false)
  const [showNew,  setShowNew]  = useState(false)
  const [showCon,  setShowCon]  = useState(false)
  const [pwErrors, setPwErrors] = useState<Record<string, string>>({})
  const [pwToast,  setPwToast]  = useState(false)

  // 2FA
  const [twoFA, setTwoFA] = useState(false)

  // Notifications
  const [emailNotifs,   setEmailNotifs]   = useState(true)
  const [systemAlerts,  setSystemAlerts]  = useState(true)
  const [notifToast,    setNotifToast]    = useState(false)

  // ── Helpers ──

  const initials = name.trim()
    ? name.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "AU"

  function showToast(set: (v: boolean) => void) {
    set(true)
    setTimeout(() => set(false), 2200)
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setAvatarUrl(URL.createObjectURL(file))
  }

  function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    showToast(setProfileToast)
  }

  const pwStrength = !next ? 0 : next.length < 6 ? 1 : next.length < 10 || !/[^a-zA-Z0-9]/.test(next) ? 2 : 3
  const pwStrengthLabel = ["", "Weak", "Fair", "Strong"]
  const pwStrengthColor = ["", "bg-red-400", "bg-amber-400", "bg-emerald-500"]

  function savePassword(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!current)                errs.current = "Current password is required"
    if (!next)                   errs.next    = "New password is required"
    else if (next.length < 8)    errs.next    = "Must be at least 8 characters"
    if (!confirm)                errs.confirm = "Please confirm your new password"
    else if (confirm !== next)   errs.confirm = "Passwords do not match"
    if (Object.keys(errs).length) { setPwErrors(errs); return }
    setPwErrors({})
    setCurrent(""); setNext(""); setConfirm("")
    showToast(setPwToast)
  }

  function clearPwError(field: string) {
    setPwErrors(p => ({ ...p, [field]: "" }))
  }

  function saveNotifications() {
    showToast(setNotifToast)
  }

  return (
    <div className="max-w-lg space-y-5">

      {/* ── Profile ────────────────────────────────────────────────────────── */}
      <Section icon={User} title="Profile" description="Update your display name, email, and photo">
        <form onSubmit={saveProfile} className="space-y-5">

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center overflow-hidden shadow-sm shadow-emerald-600/20">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-xl font-bold">{initials}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                title="Change photo"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-800">{name || "Admin User"}</p>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium mt-0.5 transition-colors"
              >
                Change photo
              </button>
              <p className="text-[11px] text-zinc-400 mt-0.5">JPG, PNG or WebP · max 2 MB</p>
            </div>
          </div>

          <Divider />

          {/* Name + Email */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label htmlFor="display-name" className="text-xs font-medium text-zinc-500">
                Display Name
              </label>
              <Input
                id="display-name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                className="h-9 border-zinc-200"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-zinc-500">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-9 border-zinc-200"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              className="h-9 px-5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 gap-2 text-sm"
            >
              <Save className="w-3.5 h-3.5" />
              Save Profile
            </Button>
          </div>
        </form>
      </Section>

      {/* ── Account Security ───────────────────────────────────────────────── */}
      <Section icon={Shield} title="Account Security" description="Change your password and manage two-factor authentication">

        {/* Change Password */}
        <form onSubmit={savePassword} className="space-y-3">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Change Password</p>

          <PasswordField
            id="current"
            label="Current Password"
            value={current}
            onChange={v => { setCurrent(v); clearPwError("current") }}
            show={showCur}
            onToggle={() => setShowCur(v => !v)}
            error={pwErrors.current}
          />
          <PasswordField
            id="next"
            label="New Password"
            placeholder="Min. 8 characters"
            value={next}
            onChange={v => { setNext(v); clearPwError("next") }}
            show={showNew}
            onToggle={() => setShowNew(v => !v)}
            error={pwErrors.next}
          />

          {/* Strength meter */}
          {next.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-300",
                      i <= pwStrength ? pwStrengthColor[pwStrength] : "bg-zinc-100"
                    )}
                  />
                ))}
              </div>
              <p className={cn(
                "text-[11px] font-medium",
                pwStrength === 1 ? "text-red-500" :
                pwStrength === 2 ? "text-amber-600" : "text-emerald-600"
              )}>
                {pwStrengthLabel[pwStrength]} password
              </p>
            </div>
          )}

          <PasswordField
            id="confirm"
            label="Confirm New Password"
            value={confirm}
            onChange={v => { setConfirm(v); clearPwError("confirm") }}
            show={showCon}
            onToggle={() => setShowCon(v => !v)}
            error={pwErrors.confirm}
          />

          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              className="h-9 px-5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 gap-2 text-sm"
            >
              <Save className="w-3.5 h-3.5" />
              Update Password
            </Button>
          </div>
        </form>

        <Divider />

        {/* 2FA */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-zinc-800">Two-Factor Authentication</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Require a verification code on every login
            </p>
          </div>
          <Toggle checked={twoFA} onChange={setTwoFA} label="Two-Factor Authentication" />
        </div>

        {twoFA && (
          <div className="mt-3 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-xs text-emerald-700 font-medium">
              2FA is enabled — your account is protected
            </p>
          </div>
        )}
      </Section>

      {/* ── Notifications ──────────────────────────────────────────────────── */}
      <Section icon={Bell} title="Notifications" description="Choose which alerts you want to receive">
        <div className="space-y-4">
          {[
            {
              label: "Email Notifications",
              desc:  "Receive a daily summary of orders and activity via email",
              value: emailNotifs,
              set:   setEmailNotifs,
            },
            {
              label: "System Alerts",
              desc:  "Get notified about dashboard updates and maintenance",
              value: systemAlerts,
              set:   setSystemAlerts,
            },
          ].map(({ label, desc, value, set }) => (
            <div key={label} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-zinc-800">{label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
              </div>
              <Toggle checked={value} onChange={set} label={label} />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-5">
          <Button
            type="button"
            onClick={saveNotifications}
            className="h-9 px-5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 gap-2 text-sm"
          >
            <Save className="w-3.5 h-3.5" />
            Save Preferences
          </Button>
        </div>
      </Section>

      {/* Toasts */}
      <SaveToast visible={profileToast} message="Profile saved successfully" />
      <SaveToast visible={pwToast}      message="Password updated successfully" />
      <SaveToast visible={notifToast}   message="Notification preferences saved" />
    </div>
  )
}
