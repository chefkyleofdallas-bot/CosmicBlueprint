import nodemailer from 'nodemailer';

if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn("SMTP credentials are not set. Email features will fail.");
}

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'user',
    pass: process.env.SMTP_PASS || 'pass',
  },
});

export async function sendEmail(to: string, subject: string, text: string, attachments?: any[]) {
  // In a real app, we'd wrap this in a try/catch and log errors
  console.log(`Sending email to ${to} with subject: ${subject}`);
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Cosmic Blueprint" <support@cosmicblueprint.space>',
    to,
    subject,
    text,
    attachments
  });
}
