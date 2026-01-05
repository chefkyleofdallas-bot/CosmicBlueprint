import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { reportType, customerName, customerEmail, birthData } = body

    console.log("[v0] Free report request received:", { reportType, customerEmail })

    try {
      await sendEmail({
        to: customerEmail,
        subject: `Your Free ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report - Cosmic Blueprint`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #f59e0b; text-align: center;">Your Cosmic Blueprint Report</h1>
            <p>Hi ${customerName},</p>
            <p>Your free admin report has been generated! Since this is a demonstration, no payment was required.</p>
            <p><strong>Report Type:</strong> ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}</p>
            <p><strong>Birth Information:</strong></p>
            <ul>
              <li>Date: ${birthData.date}</li>
              ${birthData.time ? `<li>Time: ${birthData.time}</li>` : "<li>Time: Not provided</li>"}
              ${birthData.city ? `<li>City: ${birthData.city}</li>` : "<li>City: Not provided</li>"}
            </ul>
            <p>Your personalized PDF report would be attached here in production.</p>
            <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
              Questions? Contact support@cosmicblueprint.space
            </p>
          </div>
        `,
      })
      console.log("[v0] Customer report email sent successfully")
    } catch (emailError) {
      console.error("[v0] Failed to send customer email:", emailError)
      throw emailError // This should fail since it's the main purpose
    }

    try {
      if (process.env.KYLE_NOTIFY_EMAIL) {
        await sendEmail({
          to: process.env.KYLE_NOTIFY_EMAIL,
          subject: "Free Admin Report Generated",
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h2>Admin Report Generated</h2>
              <p><strong>Report Type:</strong> ${reportType}</p>
              <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
              <p><strong>Birth Date:</strong> ${birthData.date}</p>
              ${birthData.time ? `<p><strong>Birth Time:</strong> ${birthData.time}</p>` : ""}
              ${birthData.city ? `<p><strong>Birth City:</strong> ${birthData.city}</p>` : ""}
            </div>
          `,
        })
        console.log("[v0] Admin notification sent successfully")
      }
    } catch (emailError) {
      console.error("[v0] Failed to send admin notification:", emailError)
      // Don't fail if admin notification fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Free report generation error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to generate report" },
      { status: 500 },
    )
  }
}
