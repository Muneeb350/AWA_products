"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search, Bell, ChevronDown, Menu,
  User, LogOut, Settings,
  ShoppingCart, AlertTriangle, Package, CheckCheck, Info,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ─── Notification data ────────────────────────────────────────────────────────

interface Notification {
  id: string
  icon: React.ElementType
  iconColor: string
  iconBg: string
  title: string
  body: string
  time: string
  read: boolean
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    icon: ShoppingCart,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    title: "New Order #ORD-8845",
    body: "Aisha Patel placed an order for $299.00",
    time: "2 min ago",
    read: false,
  },
  {
    id: "n2",
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    title: "Low Stock: WiFi Router X500",
    body: "Only 3 units remaining — reorder level is 10",
    time: "18 min ago",
    read: false,
  },
  {
    id: "n3",
    icon: Package,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    title: "Order #ORD-8838 Shipped",
    body: "Lena Müller's order is on its way",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "n4",
    icon: Info,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    title: "Low Stock: Webcam Pro 4K",
    body: "0 units in stock — product is out of stock",
    time: "3 hr ago",
    read: true,
  },
]

// ─── Header ───────────────────────────────────────────────────────────────────

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [userOpen, setUserOpen]     = useState(false)
  const [notifOpen, setNotifOpen]   = useState(false)
  const [notifs, setNotifs]         = useState<Notification[]>(INITIAL_NOTIFICATIONS)

  const unreadCount = notifs.filter(n => !n.read).length

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  function markOneRead(id: string) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function closeAll() {
    setUserOpen(false)
    setNotifOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 flex items-center h-16 px-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 gap-4">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-500"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 h-9 bg-zinc-50 border-zinc-200 focus:bg-white text-sm rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">

        {/* ── Notifications dropdown ── */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(o => !o); setUserOpen(false) }}
            className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 dark:text-zinc-400"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={closeAll} />
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-zinc-200/80 dark:shadow-black/40 border border-zinc-100 dark:border-zinc-800 z-50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notifications</p>
                    {unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-[10px] font-bold">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="flex items-center gap-1 text-xs text-zinc-500 hover:text-green-600 transition-colors"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="max-h-72 overflow-y-auto divide-y divide-zinc-50">
                  {notifs.map(n => {
                    const Icon = n.icon
                    return (
                      <button
                        key={n.id}
                        onClick={() => markOneRead(n.id)}
                        className={cn(
                          "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors",
                          n.read
                            ? "hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                            : "bg-green-50/40 dark:bg-green-500/5 hover:bg-green-50/70 dark:hover:bg-green-500/10"
                        )}
                      >
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5", n.iconBg)}>
                          <Icon className={cn("w-4 h-4", n.iconColor)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-xs leading-tight", n.read ? "font-medium text-zinc-600" : "font-semibold text-zinc-900")}>
                            {n.title}
                          </p>
                          <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{n.body}</p>
                          <p className="text-[10px] text-zinc-300 mt-1">{n.time}</p>
                        </div>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1.5" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
                  {unreadCount === 0 ? (
                    <p className="text-xs text-center text-zinc-400 flex items-center justify-center gap-1.5">
                      <CheckCheck className="w-3.5 h-3.5 text-green-500" />
                      All caught up!
                    </p>
                  ) : (
                    <button
                      onClick={markAllRead}
                      className="w-full text-xs font-medium text-center text-green-600 hover:text-green-700 transition-colors py-0.5"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── User dropdown ── */}
        <div className="relative">
          <button
            onClick={() => { setUserOpen(o => !o); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="User menu"
          >
            <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-sm shadow-green-500/30">
              <span className="text-white text-xs font-semibold">A</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-zinc-700 dark:text-zinc-300">Admin</span>
            <ChevronDown className={cn("w-3.5 h-3.5 text-zinc-400 transition-transform duration-150", userOpen && "rotate-180")} />
          </button>

          {userOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={closeAll} />
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 rounded-xl shadow-lg shadow-zinc-200/80 dark:shadow-black/40 border border-zinc-100 dark:border-zinc-800 py-1.5 z-50">
                <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Admin User</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">admin@awaproducts.com</p>
                </div>
                <div className="py-1 px-1.5">
                  <Link
                    href="/settings"
                    onClick={closeAll}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link
                    href="/settings"
                    onClick={closeAll}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <div className="border-t border-zinc-100 dark:border-zinc-800 my-1" />
                  <Link
                    href="/logout"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
