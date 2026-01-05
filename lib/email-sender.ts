import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  text: string
  html: string
  attachments?: Array<{
    filename: string
    content: Buffer
  }>
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "support@cosmicblueprint.space",
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments,
  })

  console.log("[v0] Email sent successfully to:", options.to)
}
