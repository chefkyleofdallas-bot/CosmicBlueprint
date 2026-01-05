import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { addMailerLiteSubscriber } from "@/lib/mailerlite"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"

async function saveSubscriber(subscriber: {
  name: string
  email: string
  birthDate: string
  birthTime?: string
  birthCity?: string
}) {
  try {
    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), "data")
    try {
      await mkdir(dataDir, { recursive: true })
    } catch (e) {
      // Directory might already exist
    }

    const filePath = join(dataDir, "subscribers.json")

    // Read existing subscribers
    let subscribers = []
    try {
      const fileContent = await readFile(filePath, "utf-8")
      subscribers = JSON.parse(fileContent)
    } catch (e) {
      // File doesn't exist yet
    }

    // Add new subscriber with timestamp
    subscribers.push({
      ...subscriber,
      subscribedAt: new Date().toISOString(),
    })

    // Write back to file
    await writeFile(filePath, JSON.stringify(subscribers, null, 2))
    console.log("[v0] Subscriber saved to file")
  } catch (error) {
    console.error("[v0] Failed to save subscriber:", error)
    // Don't fail the request if storage fails
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, birthDate, birthTime, birthCity } = body

    console.log("[v0] Subscribe request received:", { name, email })

    // Validate required fields
    if (!name || !email || !birthDate) {
      return NextResponse.json({ error: "Name, email, and birth date are required" }, { status: 400 })
    }

    const mailerliteResult = await addMailerLiteSubscriber({
      name,
      email,
      birthDate,
      birthTime,
      birthCity,
    })

    if (mailerliteResult.success) {
      console.log("[v0] Subscriber added to MailerLite")
    } else {
      console.log("[v0] MailerLite sync failed (non-fatal):", mailerliteResult.reason || mailerliteResult.error)
    }

    await saveSubscriber({ name, email, birthDate, birthTime, birthCity })

    const welcomeResult = await sendEmail({
      to: email,
      subject: "Welcome to Cosmic Blueprint!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f59e0b; text-align: center;">Welcome to Cosmic Blueprint</h1>
          <p>Hi ${name},</p>
          <p>Thank you for joining our cosmic community! We're excited to have you on this astrological journey.</p>
          <p>As a subscriber, you'll receive:</p>
          <ul>
            <li>Exclusive discounts on all readings</li>
            <li>Monthly cosmic insights and forecasts</li>
            <li>Early access to new reports and features</li>
            <li>Special offers just for you</li>
          </ul>
          <p><strong>Your Birth Information:</strong></p>
          <ul>
            <li>Date: ${birthDate}</li>
            ${birthTime ? `<li>Time: ${birthTime}</li>` : ""}
            ${birthCity ? `<li>City: ${birthCity}</li>` : ""}
          </ul>
          <p>Stay tuned for personalized insights based on your cosmic blueprint!</p>
          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            If you have any questions, contact us at support@cosmicblueprint.space
          </p>
        </div>
      `,
    })

    if (welcomeResult.success) {
      console.log("[v0] Welcome email sent")
    }

    if (process.env.KYLE_NOTIFY_EMAIL) {
      const notifyResult = await sendEmail({
        to: process.env.KYLE_NOTIFY_EMAIL,
        subject: "New Cosmic Blueprint Subscriber",
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Subscriber Alert</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Birth Date:</strong> ${birthDate}</p>
            ${birthTime ? `<p><strong>Birth Time:</strong> ${birthTime}</p>` : ""}
            ${birthCity ? `<p><strong>Birth City:</strong> ${birthCity}</p>` : ""}
          </div>
        `,
      })

      if (notifyResult.success) {
        console.log("[v0] Admin notification sent")
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Subscribe error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to subscribe" }, { status: 500 })
  }
}
