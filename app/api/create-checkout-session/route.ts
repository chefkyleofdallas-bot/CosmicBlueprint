import { type NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const stripe = getStripe();

  const { reportType, customerName, customerEmail } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: process.env[`STRIPE_PRICE_${reportType.toUpperCase()}`],
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    metadata: {
      report_type: reportType,
      customer_name: customerName,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
  });

  return NextResponse.json({ url: session.url });
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceId, reportType, customerName, customerEmail, birthData } = body

    // Validate input
    if (!priceId || !reportType || !customerName || !customerEmail || !birthData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.PUBLIC_SITE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.PUBLIC_SITE_URL || "http://localhost:3000"}`,
      customer_email: customerEmail,
      metadata: {
        reportType,
        customerName,
        birthDate: birthData.date,
        birthTime: birthData.time,
        birthCity: birthData.city,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("[v0] Checkout session error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
