import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { generatePDF } from "@/lib/pdf-generator";
import { sendEmail } from "@/lib/email-sender";

export async function POST(req: Request) {
  const stripe = getStripe();

  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing Stripe signature or webhook secret" },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Stripe webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const {
      reportType,
      customerName,
      birthDate = "",
      birthTime = "",
      birthCity = "",
    } = session.metadata || {};

    const customerEmail = session.customer_email;

    if (!customerEmail || !reportType || !customerName) {
      console.error("❌ Missing required metadata");
      return NextResponse.json({ received: true });
    }

    console.log("✅ Processing order:", reportType, customerEmail);

    // Generate PDF
    const pdfBuffer = await generatePDF({
      reportType,
      customerName,
      birthDate,
      birthTime,
      birthCity,
    });

    // Email customer
    await sendEmail({
      to: customerEmail,
      subject: `Your ${reportType} Report – Cosmic Blueprint`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d97706;">Your Cosmic Blueprint Is Ready ✨</h2>
          <p>Hi ${customerName},</p>
          <p>Your personalized <strong>${reportType}</strong> report is attached.</p>
          <p>We hope it brings clarity and insight.</p>
          <p style="margin-top: 30px;">With cosmic alignment,<br/>Cosmic Blueprint</p>
        </div>
      `,
      attachments: [
        {
          filename: `cosmic-blueprint-${reportType}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    // Notify Kyle
    await sendEmail({
      to: process.env.KYLE_NOTIFY_EMAIL || "Kyle.merritt@cosmicblueprint.space",
      subject: `New Cosmic Blueprint Order: ${reportType}`,
      text: `
New order received:

Report: ${reportType}
Customer: ${customerName}
Email: ${customerEmail}
Birth Date: ${birthDate}
Birth Time: ${birthTime}
Birth City: ${birthCity}
      `,
    });

    console.log("✅ Order completed successfully");
  }

  return NextResponse.json({ received: true });
}
