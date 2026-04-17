"use client"

import React, { useState, useMemo } from "react"
import {
  UserPlus, Search, Users, TrendingUp, ShoppingBag,
  Phone, Mail, MapPin, Clock, ChevronRight, X,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AddMemberModal, type MemberFormData } from "./add-member-modal"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type MemberStatus = "online" | "offline" | "on-field"

interface ActivityEntry {
  id: string
  text: string
  time: string
  type: "order" | "call" | "visit" | "meeting"
}

interface SalesMember {
  id: string
  name: string
  email: string
  phone: string
  region: string
  status: MemberStatus
  ordersToday: number
  monthlyTarget: number   // 0–100 percentage
  revenue: number         // total this month
  activity: ActivityEntry[]
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const INITIAL_MEMBERS: SalesMember[] = [
  {
    id: "1", name: "Sarah Johnson", email: "sarah@awaproducts.com",
    phone: "+1 555 010 2030", region: "North Region",
    status: "online", ordersToday: 7, monthlyTarget: 84, revenue: 12450,
    activity: [
      { id: "a1", text: "Booked Order #ORD-8841", time: "11:32 AM", type: "order" },
      { id: "a2", text: "Client call with Apex Retail", time: "10:15 AM", type: "call" },
      { id: "a3", text: "Booked Order #ORD-8829", time: "9:02 AM",  type: "order" },
    ],
  },
  {
    id: "2", name: "Marcus Rivera", email: "marcus@awaproducts.com",
    phone: "+1 555 020 3040", region: "South Region",
    status: "on-field", ordersToday: 4, monthlyTarget: 61, revenue: 8970,
    activity: [
      { id: "b1", text: "Site visit — Downtown Mall", time: "12:00 PM", type: "visit" },
      { id: "b2", text: "Booked Order #ORD-8835", time: "9:45 AM",  type: "order" },
      { id: "b3", text: "Morning team briefing", time: "8:30 AM",   type: "meeting" },
    ],
  },
  {
    id: "3", name: "Aisha Patel", email: "aisha@awaproducts.com",
    phone: "+1 555 030 4050", region: "East Region",
    status: "online", ordersToday: 9, monthlyTarget: 97, revenue: 16300,
    activity: [
      { id: "c1", text: "Booked Order #ORD-8845", time: "1:10 PM",  type: "order" },
      { id: "c2", text: "Booked Order #ORD-8843", time: "12:22 PM", type: "order" },
      { id: "c3", text: "Call with Summit Stores",  time: "11:00 AM", type: "call" },
      { id: "c4", text: "Booked Order #ORD-8836", time: "9:18 AM",  type: "order" },
    ],
  },
  {
    id: "4", name: "Derek Osei", email: "derek@awaproducts.com",
    phone: "+1 555 040 5060", region: "West Region",
    status: "offline", ordersToday: 0, monthlyTarget: 38, revenue: 4100,
    activity: [
      { id: "d1", text: "Booked Order #ORD-8820", time: "Yesterday", type: "order" },
      { id: "d2", text: "Client follow-up call",   time: "Yesterday", type: "call" },
    ],
  },
  {
    id: "5", name: "Lena Müller", email: "lena@awaproducts.com",
    phone: "+1 555 050 6070", region: "Central",
    status: "on-field", ordersToday: 3, monthlyTarget: 72, revenue: 9850,
    activity: [
      { id: "e1", text: "Booked Order #ORD-8838", time: "10:50 AM", type: "order" },
      { id: "e2", text: "Product demo — BrightMart", time: "9:30 AM", type: "visit" },
    ],
  },
  {
    id: "6", name: "Carlos Tran", email: "carlos@awaproducts.com",
    phone: "+1 555 060 7080", region: "International",
    status: "online", ordersToday: 5, monthlyTarget: 55, revenue: 7620,
    activity: [
      { id: "f1", text: "Booked Order #ORD-8842", time: "11:05 AM", type: "order" },
      { id: "f2", text: "Zoom meeting — UK partner",  time: "10:00 AM", type: "meeting" },
      { id: "f3", text: "Booked Order #ORD-8831", time: "8:45 AM",  type: "order" },
    ],
  },
]

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<MemberStatus, { label: string; dot: string; badge: string }> = {
  online:   { label: "Online",   dot: "bg-green-500",  badge: "bg-green-500/10 text-green-600 border border-green-200" },
  offline:  { label: "Offline",  dot: "bg-zinc-400",   badge: "bg-zinc-100 text-zinc-500 border border-zinc-200" },
  "on-field": { label: "On Field", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-600 border border-amber-200" },
}

const ACTIVITY_ICON: Record<ActivityEntry["type"], { icon: React.ReactNode; color: string }> = {
  order:   { icon: <ShoppingBag className="w-3 h-3" />, color: "bg-green-500/10 text-green-600" },
  call:    { icon: <Phone className="w-3 h-3" />,       color: "bg-blue-500/10 text-blue-600" },
  visit:   { icon: <MapPin className="w-3 h-3" />,      color: "bg-violet-500/10 text-violet-600" },
  meeting: { icon: <Users className="w-3 h-3" />,       color: "bg-amber-500/10 text-amber-600" },
}

const AVATAR_COLORS = [
  "bg-green-500/15 text-green-700",
  "bg-blue-500/15 text-blue-700",
  "bg-violet-500/15 text-violet-700",
  "bg-amber-500/15 text-amber-700",
  "bg-rose-500/15 text-rose-700",
  "bg-cyan-500/15 text-cyan-700",
]

function avatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

function initials(name: string) {
  return name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase()
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusDot({ status, animate = false }: { status: MemberStatus; animate?: boolean }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
      {animate && status !== "offline" && (
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping", cfg.dot)} />
      )}
      <span className={cn("relative inline-flex rounded-full h-2 w-2", cfg.dot)} />
    </span>
  )
}

function ProgressBar({ value }: { value: number }) {
  const color =
    value >= 90 ? "bg-green-500" :
    value >= 60 ? "bg-blue-500" :
    value >= 30 ? "bg-amber-500" :
    "bg-red-400"
  return (
    <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all duration-500", color)}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  )
}

function MemberCard({
  member,
  selected,
  onClick,
}: {
  member: SalesMember
  selected: boolean
  onClick: () => void
}) {
  const cfg = STATUS_CONFIG[member.status]
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left rounded-2xl border transition-all duration-200 p-5 bg-white dark:bg-zinc-900",
        "hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5",
        selected
          ? "border-green-300 bg-green-50/60 dark:bg-green-500/10 shadow-md shadow-green-500/10 ring-1 ring-green-400/30"
          : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700"
      )}
    >
      {/* Top row: avatar + name + status */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn("relative w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0", avatarColor(member.name))}>
            {initials(member.name)}
            <span className="absolute -bottom-0.5 -right-0.5">
              <StatusDot status={member.status} animate />
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-900 truncate leading-tight">{member.name}</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 truncate">{member.region}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium", cfg.badge)}>
            {cfg.label}
          </span>
          <ChevronRight className={cn("w-3.5 h-3.5 transition-colors", selected ? "text-green-500" : "text-zinc-300 group-hover:text-zinc-400")} />
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-zinc-50/80 dark:bg-zinc-800/60 rounded-xl p-3">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-1">Orders Today</p>
          <p className="text-xl font-bold text-zinc-900 tabular-nums leading-none">{member.ordersToday}</p>
        </div>
        <div className="bg-zinc-50/80 dark:bg-zinc-800/60 rounded-xl p-3">
          <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide mb-1">Revenue</p>
          <p className="text-xl font-bold text-zinc-900 tabular-nums leading-none">
            ${(member.revenue / 1000).toFixed(1)}
            <span className="text-xs font-medium text-zinc-400">k</span>
          </p>
        </div>
      </div>

      {/* Monthly target progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium text-zinc-500">Monthly Target</p>
          <p className={cn(
            "text-[11px] font-semibold tabular-nums",
            member.monthlyTarget >= 90 ? "text-green-600" :
            member.monthlyTarget >= 60 ? "text-blue-600" :
            member.monthlyTarget >= 30 ? "text-amber-600" : "text-red-500"
          )}>
            {member.monthlyTarget}%
          </p>
        </div>
        <ProgressBar value={member.monthlyTarget} />
      </div>

      {/* Email subtle hint */}
      <div className="flex items-center gap-1.5 mt-3.5 pt-3.5 border-t border-zinc-100">
        <Mail className="w-3 h-3 text-zinc-300 shrink-0" />
        <p className="text-[11px] text-zinc-400 truncate">{member.email}</p>
      </div>
    </button>
  )
}

function ActivityPanel({
  member,
  onClose,
}: {
  member: SalesMember
  onClose: () => void
}) {
  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-lg shadow-black/5">
      {/* Panel header */}
      <div className="flex items-start justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold", avatarColor(member.name))}>
            {initials(member.name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900">{member.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <StatusDot status={member.status} animate />
              <span className="text-[11px] text-zinc-500">{STATUS_CONFIG[member.status].label}</span>
              <span className="text-[11px] text-zinc-300 mx-0.5">·</span>
              <MapPin className="w-3 h-3 text-zinc-400" />
              <span className="text-[11px] text-zinc-500">{member.region}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
        {[
          { label: "Orders Today", value: String(member.ordersToday), highlight: member.ordersToday > 0 },
          { label: "Monthly %",    value: `${member.monthlyTarget}%`, highlight: member.monthlyTarget >= 80 },
          { label: "Revenue",      value: `$${(member.revenue / 1000).toFixed(1)}k`, highlight: true },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="px-4 py-3 text-center">
            <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">{label}</p>
            <p className={cn("text-base font-bold mt-0.5", highlight ? "text-zinc-900" : "text-zinc-400")}>{value}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="px-5 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
        <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-800 transition-colors">
          <Mail className="w-3.5 h-3.5 text-zinc-400" />
          {member.email}
        </a>
        {member.phone && (
          <a href={`tel:${member.phone}`} className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-800 transition-colors">
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            {member.phone}
          </a>
        )}
      </div>

      {/* Monthly target bar */}
      <div className="px-5 py-3 border-b border-zinc-100">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-semibold text-zinc-500">Monthly Target Progress</p>
          <p className={cn(
            "text-[11px] font-bold",
            member.monthlyTarget >= 90 ? "text-green-600" :
            member.monthlyTarget >= 60 ? "text-blue-600" :
            "text-amber-600"
          )}>
            {member.monthlyTarget}% achieved
          </p>
        </div>
        <ProgressBar value={member.monthlyTarget} />
      </div>

      {/* Activity timeline */}
      <div className="px-5 py-4">
        <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          Activity Timeline
        </p>
        {member.activity.length === 0 ? (
          <p className="text-xs text-zinc-400 text-center py-4">No recent activity</p>
        ) : (
          <div className="space-y-1">
            {member.activity.map((entry, idx) => {
              const cfg = ACTIVITY_ICON[entry.type]
              return (
                <div key={entry.id} className="flex items-start gap-3 relative">
                  {/* Vertical connector line */}
                  {idx < member.activity.length - 1 && (
                    <span className="absolute left-[13px] top-6 bottom-0 w-px bg-zinc-100" />
                  )}
                  <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 z-10", cfg.color)}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0 pb-3">
                    <p className="text-xs text-zinc-700 font-medium leading-tight">{entry.text}</p>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{entry.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SalesTeamClient() {
  const [members, setMembers]       = useState<SalesMember[]>(INITIAL_MEMBERS)
  const [search, setSearch]         = useState("")
  const [filterStatus, setFilterStatus] = useState<MemberStatus | "all">("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return members.filter(m => {
      const matchSearch = !q || m.name.toLowerCase().includes(q) || m.region.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
      const matchStatus = filterStatus === "all" || m.status === filterStatus
      return matchSearch && matchStatus
    })
  }, [members, search, filterStatus])

  const selectedMember = members.find(m => m.id === selectedId) ?? null

  const stats = useMemo(() => ({
    total:   members.length,
    online:  members.filter(m => m.status === "online").length,
    onField: members.filter(m => m.status === "on-field").length,
    orders:  members.reduce((s, m) => s + m.ordersToday, 0),
  }), [members])

  function handleAddMember(data: MemberFormData) {
    const newMember: SalesMember = {
      id:             Date.now().toString(),
      name:           data.name,
      email:          data.email,
      phone:          data.phone,
      region:         data.region,
      status:         "offline",
      ordersToday:    0,
      monthlyTarget:  0,
      revenue:        0,
      activity:       [],
    }
    setMembers(prev => [newMember, ...prev])
    setIsModalOpen(false)
  }

  function handleCardClick(id: string) {
    setSelectedId(prev => (prev === id ? null : id))
  }

  const STATUS_FILTER_TABS: Array<{ key: MemberStatus | "all"; label: string }> = [
    { key: "all",      label: "All" },
    { key: "online",   label: "Online" },
    { key: "on-field", label: "On Field" },
    { key: "offline",  label: "Offline" },
  ]

  return (
    <>
      <div className="space-y-6">
        {/* ── Stats Strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Reps",     value: stats.total,   icon: <Users className="w-4 h-4" />,       color: "bg-green-500/10 text-green-600" },
            { label: "Online Now",     value: stats.online,  icon: <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />, color: "bg-green-500/10 text-green-600" },
            { label: "On Field",       value: stats.onField, icon: <MapPin className="w-4 h-4" />,       color: "bg-amber-500/10 text-amber-600" },
            { label: "Orders Today",   value: stats.orders,  icon: <ShoppingBag className="w-4 h-4" />, color: "bg-blue-500/10 text-blue-600" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 px-4 py-3.5 flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", color)}>
                {icon}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wide">{label}</p>
                <p className="text-xl font-bold text-zinc-900 leading-tight tabular-nums">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="Search name, region…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-lg p-1">
            {STATUS_FILTER_TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium transition-all",
                  filterStatus === key
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/20 gap-2 h-9"
          >
            <UserPlus className="w-4 h-4" />
            Add Member
          </Button>
        </div>

        {/* ── Grid + Activity Panel ── */}
        <div className="flex gap-5 items-start">
          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-zinc-400" />
                </div>
                <p className="text-sm font-semibold text-zinc-900">No members found</p>
                <p className="text-xs text-zinc-400 mt-1">
                  {search ? `No results for "${search}"` : "Add your first team member"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(member => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    selected={selectedId === member.id}
                    onClick={() => handleCardClick(member.id)}
                  />
                ))}
              </div>
            )}

            {search && filtered.length > 0 && (
              <p className="text-xs text-zinc-400 mt-3">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Activity panel */}
          {selectedMember && (
            <div className="w-[320px] shrink-0 sticky top-6">
              <ActivityPanel
                member={selectedMember}
                onClose={() => setSelectedId(null)}
              />
            </div>
          )}
        </div>
      </div>

      <AddMemberModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMember}
      />
    </>
  )
}
