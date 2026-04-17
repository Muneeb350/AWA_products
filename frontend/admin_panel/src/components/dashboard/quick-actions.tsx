"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download, BarChart2, RefreshCw } from "lucide-react"

const actions = [
  {
    label: "Add New Product",
    icon: Plus,
    primary: true,
  },
  {
    label: "Export Report",
    icon: Download,
    primary: false,
  },
  {
    label: "View Analytics",
    icon: BarChart2,
    primary: false,
  },
  {
    label: "Sync Inventory",
    icon: RefreshCw,
    primary: false,
  },
]

export function QuickActions() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Shortcuts to common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {actions.map(({ label, icon: Icon, primary }) =>
            primary ? (
              <Button
                key={label}
                className="justify-start gap-3 bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/20 h-10"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ) : (
              <Button
                key={label}
                variant="outline"
                className="justify-start gap-3 text-zinc-600 hover:text-zinc-900 border-zinc-200 h-10"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  )
}
