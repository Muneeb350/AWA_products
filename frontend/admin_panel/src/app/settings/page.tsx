import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SettingsClient } from "@/components/settings/settings-client"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Settings</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your account and preferences</p>
        </div>
        <SettingsClient />
      </div>
    </DashboardLayout>
  )
}
