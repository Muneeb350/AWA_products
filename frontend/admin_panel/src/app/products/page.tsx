import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProductsClient } from "@/components/products/products-client"

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            Products
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your product catalog
          </p>
        </div>
        <ProductsClient />
      </div>
    </DashboardLayout>
  )
}
