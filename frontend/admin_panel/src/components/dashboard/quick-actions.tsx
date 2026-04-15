"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="border-zinc-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1 bg-zinc-900 hover:bg-zinc-800">
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
