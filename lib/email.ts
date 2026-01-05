import nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"

let cachedTransporter: Transporter | null = null

export async function createEmailTransporter() {
  if (cachedTransporter) {
    return cachedTransporter
  }

  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    console.log("[v0] SMTP not configured - emails will be skipped")
    return null
  }

  try {
    const portNumber = Number.parseInt(port || "587", 10)

    const config = {
      host: String(host),
      port: portNumber,
      secure: portNumber === 465,
      auth: {
        user: String(user),
        pass: String(pass),
      },
      tls: {
        rejectUnauthorized: false,
      },
    }

    console.log("[v0] Creating transporter with host:", config.host, "port:", config.port)

    const transporter = nodemailer.createTransport(config)

    cachedTransporter = transporter
    return transporter
  } catch (error) {
    console.error("[v0] Failed to create email transporter:", error)
    return null
  }
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const transporter = await createEmailTransporter()

    if (!transporter) {
      console.log("[v0] Email not sent - transporter not available")
      return { success: false, reason: "Email service not configured" }
    }

    const from = process.env.EMAIL_FROM || process.env.SMTP_USER

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    })

    console.log("[v0] Email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("[v0] Email send error:", error)
    return { success: false, error: String(error) }
  }
}
