"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import {
  Palette, Bell, Shield, User,
  Sun, Moon, Monitor, Eye, EyeOff,
  CheckCircle2, Save,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "appearance" | "notifications" | "security"
type Theme = "light" | "dark" | "system"

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS: Array<{ key: Tab; label: string; icon: React.ElementType }> = [
  { key: "appearance",    label: "Appearance",    icon: Palette },
  { key: "notifications", label: "Notifications", icon: Bell    },
  { key: "security",      label: "Security",      icon: Shield  },
]

// ─── Toggle Switch ────────────────────────────────────────────────────────────

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
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40 shrink-0",
        checked ? "bg-green-500" : "bg-zinc-200"
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

// ─── Checkbox ────────────────────────────────────────────────────────────────

function Checkbox({
  checked,
  onChange,
  id,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  id: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "w-4 h-4 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40",
        checked
          ? "bg-green-500 border-green-500"
          : "bg-white border-zinc-300 hover:border-zinc-400"
      )}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
          <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function SaveToast({ visible }: { visible: boolean }) {
  return (
    <div className={cn(
      "fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-zinc-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl shadow-black/20 transition-all duration-300 z-50",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
    )}>
      <CheckCircle2 className="w-4 h-4 text-green-400" />
      Settings saved successfully
    </div>
  )
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────

function AppearanceTab() {
  const { theme, setTheme }         = useTheme()
  const [compactMode, setCompact]   = useState(false)
  const [animations, setAnimations] = useState(true)
  const [toast, setToast]           = useState(false)

  const THEME_OPTIONS: Array<{ key: Theme; label: string; icon: React.ElementType; desc: string }> = [
    { key: "light",  label: "Light",  icon: Sun,     desc: "Clean white interface"      },
    { key: "dark",   label: "Dark",   icon: Moon,    desc: "Easy on the eyes at night"  },
    { key: "system", label: "System", icon: Monitor, desc: "Follows OS preference"      },
  ]

  const activeTheme = (theme ?? "system") as Theme

  function save() {
    setToast(true)
    setTimeout(() => setToast(false), 2200)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Live theme switcher */}
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Color Theme</p>
          <p className="text-xs text-zinc-400 mb-3">Choose how the dashboard looks to you</p>
          <div className="grid grid-cols-3 gap-3">
            {THEME_OPTIONS.map(({ key, label, icon: Icon, desc }) => {
              const isActive = activeTheme === key
              return (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center",
                    isActive
                      ? "border-green-500 bg-green-50/60 dark:bg-green-500/10 shadow-sm shadow-green-500/10"
                      : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 hover:border-zinc-300 hover:bg-zinc-50 dark:hover:border-zinc-600"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                    isActive ? "bg-green-500/15 text-green-600" : "bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={cn("text-xs font-semibold", isActive ? "text-green-700 dark:text-green-400" : "text-zinc-700 dark:text-zinc-300")}>{label}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5 leading-tight">{desc}</p>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Live preview pill */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-700/60">
          <div className="flex items-center gap-2">
            {activeTheme === "dark"   && <Moon    className="w-4 h-4 text-zinc-400" />}
            {activeTheme === "light"  && <Sun     className="w-4 h-4 text-amber-500" />}
            {activeTheme === "system" && <Monitor className="w-4 h-4 text-blue-400" />}
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Currently using <span className="font-semibold text-zinc-900 dark:text-zinc-100 capitalize">{activeTheme}</span> mode
            </p>
          </div>
          <span className={cn(
            "ml-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
            activeTheme === "dark"
              ? "border-zinc-600 bg-zinc-700 text-zinc-300"
              : activeTheme === "light"
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "border-blue-200 bg-blue-50 text-blue-700"
          )}>
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              activeTheme === "dark" ? "bg-zinc-400" : activeTheme === "light" ? "bg-amber-400" : "bg-blue-400"
            )} />
            Active
          </span>
        </div>

        <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

        {/* Extra toggles */}
        <div className="space-y-4">
          {[
            { label: "Compact Mode",  desc: "Reduce spacing and padding throughout the UI", value: compactMode, set: setCompact  },
            { label: "Animations",    desc: "Enable transitions and micro-interactions",      value: animations,  set: setAnimations },
          ].map(({ label, desc, value, set }) => (
            <div key={label} className="flex items-center justify-between gap-4 py-1">
              <div>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
              </div>
              <Toggle checked={value} onChange={set} label={label} />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={save} className="h-9 px-5 bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/20 gap-2">
            <Save className="w-3.5 h-3.5" />
            Save Appearance
          </Button>
        </div>
      </div>
      <SaveToast visible={toast} />
    </>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    orderAlerts:    true,
    stockAlerts:    true,
    emailDigest:    false,
    shipmentAlerts: true,
    teamActivity:   false,
    systemUpdates:  true,
  })
  const [toast, setToast] = useState(false)

  function toggle(key: keyof typeof prefs) {
    setPrefs(p => ({ ...p, [key]: !p[key] }))
  }

  function save() {
    setToast(true)
    setTimeout(() => setToast(false), 2200)
  }

  const ROWS: Array<{ key: keyof typeof prefs; label: string; desc: string; important?: boolean }> = [
    { key: "orderAlerts",    label: "Order Alerts",    desc: "Get notified when a new order is placed",          important: true  },
    { key: "stockAlerts",    label: "Stock Alerts",    desc: "Alerts when a product drops below reorder level",  important: true  },
    { key: "shipmentAlerts", label: "Shipment Updates",desc: "Tracking updates when orders ship or are delivered"               },
    { key: "emailDigest",    label: "Daily Email Digest", desc: "A morning summary of yesterday's activity"                     },
    { key: "teamActivity",   label: "Team Activity",   desc: "Notifications when sales reps log activity"                       },
    { key: "systemUpdates",  label: "System Updates",  desc: "Dashboard version releases and maintenance alerts"                },
  ]

  return (
    <>
      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-zinc-900 mb-0.5">Notification Preferences</p>
          <p className="text-xs text-zinc-400">Choose which alerts you want to receive in the dashboard</p>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          {ROWS.map(({ key, label, desc, important }) => (
            <label
              key={key}
              htmlFor={`notif-${key}`}
              className="flex items-center justify-between gap-4 px-4 py-3.5 bg-white dark:bg-zinc-900 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/60 cursor-pointer transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <Checkbox checked={prefs[key]} onChange={() => toggle(key)} id={`notif-${key}`} />
                <div>
                  <p className={cn("text-sm font-medium leading-tight", prefs[key] ? "text-zinc-900" : "text-zinc-500")}>
                    {label}
                    {important && (
                      <span className="ml-2 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-1.5 py-0.5">
                        Recommended
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={save} className="h-9 px-5 bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/20 gap-2">
            <Save className="w-3.5 h-3.5" />
            Save Preferences
          </Button>
        </div>
      </div>
      <SaveToast visible={toast} />
    </>
  )
}

function SecurityTab() {
  const [current,  setCurrent]  = useState("")
  const [next,     setNext]     = useState("")
  const [confirm,  setConfirm]  = useState("")
  const [showCur,  setShowCur]  = useState(false)
  const [showNew,  setShowNew]  = useState(false)
  const [showCon,  setShowCon]  = useState(false)
  const [errors,   setErrors]   = useState<Record<string, string>>({})
  const [toast,    setToast]    = useState(false)
  const [twoFA,    setTwoFA]    = useState(false)
  const [sessions, setSessions] = useState(true)

  function validate() {
    const e: Record<string, string> = {}
    if (!current)                         e.current  = "Current password is required"
    if (!next)                            e.next     = "New password is required"
    else if (next.length < 8)             e.next     = "Must be at least 8 characters"
    if (!confirm)                         e.confirm  = "Please confirm your new password"
    else if (confirm !== next)            e.confirm  = "Passwords do not match"
    return e
  }

  function save(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setCurrent(""); setNext(""); setConfirm("")
    setToast(true)
    setTimeout(() => setToast(false), 2200)
  }

  const PasswordField = ({
    label, value, onChange, show, onToggle, error, id, placeholder,
  }: {
    label: string; value: string; onChange: (v: string) => void
    show: boolean; onToggle: () => void; error?: string
    id: string; placeholder?: string
  }) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-medium text-zinc-600">{label}</label>
      <div className="relative">
        <Input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder ?? "••••••••"}
          value={value}
          onChange={e => { onChange(e.target.value); setErrors(p => ({ ...p, [id]: "" })) }}
          className={cn(
            "h-9 pr-9",
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

  const strength = !next ? 0 : next.length < 6 ? 1 : next.length < 10 || !/[^a-zA-Z0-9]/.test(next) ? 2 : 3
  const strengthLabel = ["", "Weak", "Fair", "Strong"]
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-green-500"]

  return (
    <>
      <div className="space-y-6">
        {/* Change password */}
        <div>
          <p className="text-sm font-semibold text-zinc-900 mb-0.5">Change Password</p>
          <p className="text-xs text-zinc-400 mb-4">Use a strong password you don't use elsewhere</p>
          <form onSubmit={save} className="space-y-3">
            <PasswordField
              id="current" label="Current Password"
              value={current} onChange={setCurrent}
              show={showCur} onToggle={() => setShowCur(v => !v)}
              error={errors.current}
            />
            <PasswordField
              id="next" label="New Password" placeholder="Min. 8 characters"
              value={next} onChange={setNext}
              show={showNew} onToggle={() => setShowNew(v => !v)}
              error={errors.next}
            />

            {/* Password strength meter */}
            {next.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-all duration-300",
                        i <= strength ? strengthColor[strength] : "bg-zinc-100"
                      )}
                    />
                  ))}
                </div>
                <p className={cn(
                  "text-[11px] font-medium",
                  strength === 1 ? "text-red-500" : strength === 2 ? "text-amber-600" : "text-green-600"
                )}>
                  {strengthLabel[strength]} password
                </p>
              </div>
            )}

            <PasswordField
              id="confirm" label="Confirm New Password"
              value={confirm} onChange={setConfirm}
              show={showCon} onToggle={() => setShowCon(v => !v)}
              error={errors.confirm}
            />

            <div className="flex justify-end pt-1">
              <Button type="submit" className="h-9 px-5 bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/20 gap-2">
                <Save className="w-3.5 h-3.5" />
                Update Password
              </Button>
            </div>
          </form>
        </div>

        <div className="h-px bg-zinc-100" />

        {/* Security toggles */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-zinc-900">Security Options</p>
          {[
            {
              label: "Two-Factor Authentication",
              desc:  "Require a code from your authenticator app on login",
              value: twoFA,
              set:   setTwoFA,
            },
            {
              label: "Active Session Alerts",
              desc:  "Get notified when a new device signs into your account",
              value: sessions,
              set:   setSessions,
            },
          ].map(({ label, desc, value, set }) => (
            <div key={label} className="flex items-center justify-between gap-4 py-1">
              <div>
                <p className="text-sm font-medium text-zinc-800">{label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{desc}</p>
              </div>
              <Toggle checked={value} onChange={set} label={label} />
            </div>
          ))}
        </div>
      </div>
      <SaveToast visible={toast} />
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SettingsClient() {
  const [activeTab, setActiveTab] = useState<Tab>("appearance")

  return (
    <div className="max-w-2xl space-y-5">
      {/* Profile card — always visible */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md shadow-green-500/20 shrink-0">
            <span className="text-white text-lg font-bold">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-900">Admin User</p>
            <p className="text-xs text-zinc-400">admin@awaproducts.com</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-600">Active</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-500">Display Name</label>
            <Input defaultValue="Admin User" className="h-9" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-500">Email Address</label>
            <Input defaultValue="admin@awaproducts.com" className="h-9" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <button className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-800 transition-colors">
            <User className="w-3.5 h-3.5" />
            Change Photo
          </button>
          <Button className="h-8 px-4 text-xs bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/20">
            Save Profile
          </Button>
        </div>
      </div>

      {/* Tabs card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all duration-150 border-b-2 -mb-px",
                activeTab === key
                  ? "border-green-500 text-green-600 bg-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-white/60"
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", activeTab === key ? "text-green-500" : "text-zinc-400")} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === "appearance"    && <AppearanceTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "security"      && <SecurityTab />}
        </div>
      </div>
    </div>
  )
}
