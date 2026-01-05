"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { CheckoutDialog } from "@/components/checkout-dialog"

interface Report {
  id: string
  title: string
  description: string
  price: number
  priceId: string
  features: string[]
}

interface ReportCardProps {
  report: Report
}

export function ReportCard({ report }: ReportCardProps) {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Card className="bg-[#1a1a3a] border-amber-900/30 flex flex-col">
        <CardHeader>
          <CardTitle className="text-white text-2xl">{report.title}</CardTitle>
          <CardDescription className="text-gray-400">{report.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="mb-6">
            <span className="text-4xl font-bold text-amber-400">${report.price}</span>
          </div>
          <ul className="space-y-3">
            {report.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setShowDialog(true)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-[#0a0a1f] font-semibold"
          >
            Get Your Report
          </Button>
        </CardFooter>
      </Card>

      <CheckoutDialog open={showDialog} onOpenChange={setShowDialog} report={report} />
    </>
  )
}
