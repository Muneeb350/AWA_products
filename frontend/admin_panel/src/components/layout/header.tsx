"use client"

import { useState } from "react"
import { Search, Bell, ChevronDown, Menu, User, LogOut, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex items-center h-16 px-4 bg-white border-b border-zinc-200 gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md hover:bg-zinc-100 transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            type="search"
            placeholder="Search products, orders..."
            className="pl-10 bg-zinc-50 border-zinc-200 focus:bg-white"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          className="relative p-2 rounded-md hover:bg-zinc-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-md hover:bg-zinc-100 transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-zinc-900">
              Admin
            </span>
            <ChevronDown className="w-4 h-4 text-zinc-500" />
          </button>

          {isDropdownOpen && (
            <>
              {/* Backdrop to close dropdown */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-zinc-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-zinc-200">
                  <p className="text-sm font-medium text-zinc-900">Admin User</p>
                  <p className="text-xs text-zinc-500">admin@awaproducts.com</p>
                </div>
                <div className="py-1">
                  <a
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </a>
                  <div className="border-t border-zinc-200 my-1" />
                  <a
                    href="/logout"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-zinc-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
