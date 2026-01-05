"use client"

import { useState, useEffect } from "react"
import { ReportCard } from "@/components/report-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubscribeDialog } from "@/components/subscribe-dialog"
import Image from "next/image"

const reports = [
  {
    id: "natal",
    title: "Natal Chart Reading",
    description:
      "A comprehensive analysis of your birth chart revealing your core personality, strengths, challenges, and life purpose.",
    price: 49,
    priceId: process.env.STRIPE_PRICE_ID_NATAL || "",
    features: ["Complete planetary positions", "House interpretations", "Aspect analysis", "Life path insights"],
  },
  {
    id: "karmic",
    title: "Karmic Blueprint",
    description: "Explore your soul's journey through past life influences, karmic lessons, and evolutionary path.",
    price: 69,
    priceId: process.env.STRIPE_PRICE_ID_KARMIC || "",
    features: ["North & South Node analysis", "Past life patterns", "Karmic debt insights", "Soul mission guidance"],
  },
  {
    id: "love",
    title: "Love & Compatibility",
    description:
      "Understand your romantic nature and relationship dynamics with a partner or discover your ideal match.",
    price: 59,
    priceId: process.env.STRIPE_PRICE_ID_LOVE || "",
    features: [
      "Venus & Mars placements",
      "Synastry analysis (with partner)",
      "Love language insights",
      "Relationship patterns",
    ],
  },
  {
    id: "career",
    title: "Career & Purpose",
    description:
      "Discover your professional strengths, ideal career paths, and how to align work with your cosmic blueprint.",
    price: 59,
    priceId: process.env.STRIPE_PRICE_ID_CAREER || "",
    features: [
      "Midheaven & 10th house analysis",
      "Natural talents & skills",
      "Career timing insights",
      "Professional purpose alignment",
    ],
  },
  {
    id: "yearly",
    title: "Yearly Forecast",
    description: "A detailed look at the upcoming year with monthly themes, opportunities, and cosmic guidance.",
    price: 79,
    priceId: process.env.STRIPE_PRICE_ID_YEARLY || "",
    features: ["Solar return analysis", "Monthly transit guide", "Key dates & timing", "Growth opportunities"],
  },
]

export default function HomePage() {
  const [showSubscribe, setShowSubscribe] = useState(false)

  useEffect(() => {
    // Show subscribe popup after 3 seconds if not already shown in this session
    const hasShownPopup = sessionStorage.getItem("cosmic-subscribe-shown")

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowSubscribe(true)
        sessionStorage.setItem("cosmic-subscribe-shown", "true")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a1f]">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a1f] via-[#1a1a3f] to-[#0a0a1f]">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <Image src="/images/logo.png" alt="Cosmic Blueprint Logo" width={200} height={200} priority />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white text-balance">
              Precision Astrology, Personally Designed
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-pretty">
              Unlock the secrets written in the stars. Each report is meticulously crafted to reveal your unique cosmic
              signature and guide your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Choose Your Reading</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-[#0f0f2a]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto text-2xl font-bold text-[#0a0a1f]">
                1
              </div>
              <h3 className="text-xl font-semibold text-white">Select Report</h3>
              <p className="text-gray-400">Choose the reading that resonates with your current journey</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto text-2xl font-bold text-[#0a0a1f]">
                2
              </div>
              <h3 className="text-xl font-semibold text-white">Provide Details</h3>
              <p className="text-gray-400">Enter your birth information for precise calculations</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto text-2xl font-bold text-[#0a0a1f]">
                3
              </div>
              <h3 className="text-xl font-semibold text-white">Receive PDF</h3>
              <p className="text-gray-400">Get your personalized report delivered to your email</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <SubscribeDialog open={showSubscribe} onOpenChange={setShowSubscribe} />
    </div>
  )
}
