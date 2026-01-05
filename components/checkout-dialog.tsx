"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface Report {
  id: string
  title: string
  price: number
  priceId: string
}

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  report: Report
}

export function CheckoutDialog({ open, onOpenChange, report }: CheckoutDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [showAdminInput, setShowAdminInput] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    birthTime: "",
    birthCity: "",
  })

  const verifyAdminCode = () => {
    if (adminCode === "COSMIC2026") {
      setIsAdmin(true)
      setShowAdminInput(false)
      toast({
        title: "Admin Access Granted",
        description: "You can now purchase reports for free",
      })
    } else {
      toast({
        title: "Invalid Admin Code",
        description: "Please check your code and try again",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isAdmin) {
        const response = await fetch("/api/generate-free-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reportType: report.id,
            customerName: formData.name,
            customerEmail: formData.email,
            birthData: {
              date: formData.birthDate,
              time: formData.birthTime,
              city: formData.birthCity,
            },
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to generate report")
        }

        toast({
          title: "Report Generated!",
          description: "Your free admin report has been sent to your email",
        })
        onOpenChange(false)
        return
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: report.priceId,
          reportType: report.id,
          customerName: formData.name,
          customerEmail: formData.email,
          birthData: {
            date: formData.birthDate,
            time: formData.birthTime,
            city: formData.birthCity,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      window.location.href = data.url
    } catch (error) {
      console.error("[v0] Checkout error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to proceed to checkout",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a3a] border-amber-900/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{report.title}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Provide your birth information for an accurate reading
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAdmin && !showAdminInput && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAdminInput(true)}
              className="text-xs text-gray-500 hover:text-amber-400"
            >
              Admin Access
            </Button>
          )}

          {showAdminInput && !isAdmin && (
            <div className="space-y-2 p-3 bg-[#0f0f2a] rounded-lg border border-amber-900/20">
              <Label htmlFor="adminCode" className="text-white text-sm">
                Admin Code
              </Label>
              <div className="flex gap-2">
                <Input
                  id="adminCode"
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="bg-[#1a1a3a] border-amber-900/30 text-white"
                  placeholder="Enter admin code"
                />
                <Button
                  type="button"
                  onClick={verifyAdminCode}
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-[#0a0a1f]"
                >
                  Verify
                </Button>
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-sm text-amber-400">✓ Admin Mode: Free Report</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Full Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email <span className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate" className="text-white">
              Birth Date <span className="text-red-400">*</span>
            </Label>
            <Input
              id="birthDate"
              type="date"
              required
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthTime" className="text-white">
              Birth Time <span className="text-gray-500 text-xs">(optional)</span>
            </Label>
            <Input
              id="birthTime"
              type="time"
              value={formData.birthTime}
              onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthCity" className="text-white">
              Birth City <span className="text-gray-500 text-xs">(optional)</span>
            </Label>
            <Input
              id="birthCity"
              value={formData.birthCity}
              onChange={(e) => setFormData({ ...formData, birthCity: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
              placeholder="Los Angeles, CA"
            />
          </div>

          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold text-amber-400">{isAdmin ? "FREE" : `$${report.price}`}</span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-[#0a0a1f] font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : isAdmin ? (
                "Generate Free Report"
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
