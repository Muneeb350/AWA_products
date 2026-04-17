import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { InventoryClient } from "@/components/inventory/inventory-client"

export default function InventoryPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Inventory</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Track stock levels and manage supply
          </p>
        </div>
        <InventoryClient />
      </div>
    </DashboardLayout>
  )
}
