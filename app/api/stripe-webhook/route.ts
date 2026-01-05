import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { generatePDF } from "@/lib/pdf-generator"
import { sendEmail } from "@/lib/email-sender"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("[v0] Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // Extract metadata
      const { reportType, customerName, birthDate, birthTime, birthCity } = session.metadata || {}
      const customerEmail = session.customer_email

      if (!customerEmail || !reportType || !customerName) {
        console.error("[v0] Missing required metadata")
        return NextResponse.json({ received: true })
      }

      console.log("[v0] Processing order for:", customerEmail, reportType)

      // Generate PDF
      const pdfBuffer = await generatePDF({
        reportType,
        customerName,
        birthDate: birthDate || "",
        birthTime: birthTime || "",
        birthCity: birthCity || "",
      })

      // Send email to customer
      await sendEmail({
        to: customerEmail,
        subject: `Your ${reportType} Report - Cosmic Blueprint`,
        text: `Hi ${customerName},\n\nThank you for your purchase! Your personalized ${reportType} report is attached.\n\nBest regards,\nCosmic Blueprint Team`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d97706;">Your Cosmic Blueprint is Ready!</h2>
            <p>Hi ${customerName},</p>
            <p>Thank you for your purchase! Your personalized <strong>${reportType}</strong> report is attached to this email.</p>
            <p>We hope this reading provides valuable insights into your cosmic journey.</p>
            <p style="margin-top: 30px;">Best regards,<br/>Cosmic Blueprint Team</p>
          </div>
        `,
        attachments: [
          {
            filename: `cosmic-blueprint-${reportType}-${Date.now()}.pdf`,
            content: pdfBuffer,
          },
        ],
      })

      // Send notification to Kyle
      await sendEmail({
        to: process.env.KYLE_NOTIFY_EMAIL || "Kyle.merritt@cosmicblueprint.space",
        subject: `New Order: ${reportType} - ${customerName}`,
        text: `New order received:\n\nReport: ${reportType}\nCustomer: ${customerName}\nEmail: ${customerEmail}\nBirth: ${birthDate} at ${birthTime} in ${birthCity}`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Order Received</h2>
            <ul>
              <li><strong>Report:</strong> ${reportType}</li>
              <li><strong>Customer:</strong> ${customerName}</li>
              <li><strong>Email:</strong> ${customerEmail}</li>
              <li><strong>Birth Date:</strong> ${birthDate}</li>
              <li><strong>Birth Time:</strong> ${birthTime}</li>
              <li><strong>Birth City:</strong> ${birthCity}</li>
            </ul>
          </div>
        `,
      })

      console.log("[v0] Order processed successfully")
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
