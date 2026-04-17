"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  X,
  Zap,
  UsersRound,
  Boxes,
  BarChart3,
  LogOut,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Store",
    items: [
      { href: "/products", label: "Products", icon: Package },
      { href: "/orders", label: "Orders", icon: ShoppingCart },
      { href: "/inventory", label: "Inventory", icon: Boxes },
      { href: "/customers", label: "Customers", icon: Users },
    ],
  },
  {
    label: "Insights",
    items: [
      { href: "/sales-team", label: "Sales Team", icon: UsersRound },
      { href: "/reports", label: "Reports", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-[#0f0f11] border-r border-white/[0.06] transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/[0.06] shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">
              AWA Products
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 mb-1.5">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/")
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                          isActive
                            ? "bg-green-500/10 text-green-400"
                            : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100"
                        )}
                        onClick={onClose}
                      >
                        <item.icon
                          className={cn(
                            "w-4 h-4 shrink-0",
                            isActive ? "text-green-400" : ""
                          )}
                        />
                        {item.label}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/[0.06] shrink-0 space-y-1">
          <Link
            href="/logout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150 group"
          >
            <LogOut className="w-4 h-4 shrink-0 group-hover:text-red-400" />
            Logout
          </Link>
          <p className="text-[11px] text-zinc-700 px-3 pb-1">© 2026 AWA Products</p>
        </div>
      </aside>
    </>
  )
}
