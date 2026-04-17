"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Zap } from "lucide-react"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear any session/auth tokens here when real auth is wired up.
    // e.g. localStorage.removeItem("token") or signOut()
    const timer = setTimeout(() => {
      router.replace("/login")
    }, 1800)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-6 p-4">

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/6 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center">
        <Zap className="w-7 h-7 text-green-500" />
        {/* Orbit ring */}
        <span className="absolute inset-0 rounded-2xl border-2 border-green-500/30 animate-ping" />
      </div>

      {/* Spinner + message */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-green-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-white">Logging you out safely…</p>
        <p className="text-xs text-zinc-500">Clearing your session. You will be redirected shortly.</p>
      </div>

      {/* Redirect hint */}
      <div className="absolute bottom-6">
        <p className="text-[11px] text-zinc-700">© 2026 AWA Products</p>
      </div>
    </div>
  )
}
