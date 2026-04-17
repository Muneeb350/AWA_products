"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Zap, ArrowRight, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const DEMO_EMAIL    = "admin@awaproducts.com"
const DEMO_PASSWORD = "admin123"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")

  const emailErr = error && !email.trim()    ? "Email is required"    : ""
  const passErr  = error && !password.trim() ? "Password is required" : ""

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("missing")
      return
    }

    setLoading(true)
    // Simulate a network round-trip
    await new Promise(r => setTimeout(r, 900))

    if (email.trim() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      router.push("/dashboard")
    } else {
      setLoading(false)
      setError("invalid")
    }
  }

  const invalidCreds = error === "invalid"

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-green-500/8  rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/4 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-[400px]">

        {/* Glass card */}
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl shadow-black/40">

          {/* Logo + brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/40 mb-4">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">AWA Products</h1>
            <p className="text-sm text-zinc-500 mt-1">Admin Dashboard</p>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-base font-semibold text-white">Welcome back</h2>
            <p className="text-sm text-zinc-500 mt-0.5">Sign in to your account to continue</p>
          </div>

          {/* Invalid credentials banner */}
          {invalidCreds && (
            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-3.5 py-2.5 mb-5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-xs text-red-400 font-medium">
                Incorrect email or password. Try{" "}
                <button
                  type="button"
                  onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); setError("") }}
                  className="underline underline-offset-2 hover:text-red-300 transition-colors"
                >
                  demo credentials
                </button>
                .
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4" noValidate>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Email address</label>
              <Input
                type="email"
                placeholder="admin@awaproducts.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError("") }}
                autoComplete="email"
                className={cn(
                  "h-10 bg-white/[0.06] border-white/[0.1] text-white placeholder:text-zinc-600",
                  "focus-visible:border-green-500/60 focus-visible:ring-green-500/20",
                  "transition-colors",
                  emailErr && "border-red-500/50 focus-visible:border-red-500/60 focus-visible:ring-red-500/20"
                )}
              />
              {emailErr && <p className="text-[11px] text-red-400">{emailErr}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-zinc-400">Password</label>
                <button
                  type="button"
                  className="text-xs text-zinc-500 hover:text-green-400 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError("") }}
                  autoComplete="current-password"
                  className={cn(
                    "h-10 pr-10 bg-white/[0.06] border-white/[0.1] text-white placeholder:text-zinc-600",
                    "focus-visible:border-green-500/60 focus-visible:ring-green-500/20",
                    "transition-colors",
                    passErr && "border-red-500/50 focus-visible:border-red-500/60 focus-visible:ring-red-500/20"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passErr && <p className="text-[11px] text-red-400">{passErr}</p>}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full h-10 mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold",
                "shadow-lg shadow-green-500/25 transition-all gap-2",
                "disabled:opacity-70 disabled:cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <p className="text-center text-[11px] text-zinc-600">
              Demo credentials &nbsp;·&nbsp;
              <span className="text-zinc-500 font-mono">{DEMO_EMAIL}</span>
              &nbsp;/&nbsp;
              <span className="text-zinc-500 font-mono">{DEMO_PASSWORD}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-zinc-700 mt-5">
          © 2026 AWA Products · All rights reserved
        </p>
      </div>
    </div>
  )
}
