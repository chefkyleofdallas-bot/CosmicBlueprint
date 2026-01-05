"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface SubscribeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SubscribeDialog({ open, onOpenChange }: SubscribeDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    birthTime: "",
    birthCity: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe")
      }

      toast({
        title: "Welcome to Cosmic Blueprint!",
        description: "You've been added to our mailing list. Check your email for exclusive offers.",
      })

      // Reset form and close dialog
      setFormData({ name: "", email: "", birthDate: "", birthTime: "", birthCity: "" })
      onOpenChange(false)
    } catch (error) {
      console.error("[v0] Subscribe error:", error)
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1a1a3a] border-amber-900/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join the Cosmic Community</DialogTitle>
          <DialogDescription className="text-gray-400">
            Get exclusive offers, astrology insights, and early access to new readings
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sub-name" className="text-white">
              Name <span className="text-red-400">*</span>
            </Label>
            <Input
              id="sub-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sub-email" className="text-white">
              Email <span className="text-red-400">*</span>
            </Label>
            <Input
              id="sub-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sub-birthDate" className="text-white">
              Date of Birth <span className="text-red-400">*</span>
            </Label>
            <Input
              id="sub-birthDate"
              type="date"
              required
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sub-birthTime" className="text-white">
              Time of Birth <span className="text-gray-500 text-xs">(optional)</span>
            </Label>
            <Input
              id="sub-birthTime"
              type="time"
              value={formData.birthTime}
              onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sub-birthCity" className="text-white">
              City of Birth <span className="text-gray-500 text-xs">(optional)</span>
            </Label>
            <Input
              id="sub-birthCity"
              value={formData.birthCity}
              onChange={(e) => setFormData({ ...formData, birthCity: e.target.value })}
              className="bg-[#0f0f2a] border-amber-900/30 text-white"
              placeholder="Los Angeles, CA"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-[#0a0a1f] font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
