import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const stripe = getStripe();

  const body = await req.json();
  const {
    reportType,
    customerName,
    customerEmail,
    birthDate = "",
    birthTime = "",
    birthCity = "",
  } = body;

  if (!reportType || !customerName || !customerEmail) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const priceMap: Record<string, string | undefined> = {
    natal: process.env.STRIPE_PRICE_NATAL,
    karmic: process.env.STRIPE_PRICE_KARMIC,
    love: process.env.STRIPE_PRICE_LOVE,
    career: process.env.STRIPE_PRICE_CAREER,
    yearly: process.env.STRIPE_PRICE_YEARLY,
  };

  const priceId = priceMap[reportType];

  if (!priceId) {
    return NextResponse.json(
      { error: "Invalid report type" },
      { status: 400 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    metadata: {
      reportType,
      customerName,
      birthDate,
      birthTime,
      birthCity,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
  });

  return NextResponse.json({ url: session.url });
}
