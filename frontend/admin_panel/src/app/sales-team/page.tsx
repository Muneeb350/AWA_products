import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SalesTeamClient } from "@/components/sales-team/sales-team-client"

export default function SalesTeamPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Sales Team</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Monitor reps, track targets, and view daily activity
          </p>
        </div>
        <SalesTeamClient />
      </div>
    </DashboardLayout>
  )
}
