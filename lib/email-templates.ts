/**
 * Email template helpers for Cosmic Blueprint
 *
 * These helpers return ready-to-use subject lines and HTML bodies for the
 * different emails our application needs to send. Centralising the
 * templates in one file makes it easy to update the look and feel of
 * customer communications without scattering strings across multiple
 * modules. If additional emails are needed in future (e.g. password
 * resets or promotional messages) they can be added here.
 */

/**
 * Generate the welcome email for new Cosmic Blueprint customers.
 *
 * When a user first lands on the site and provides their email (for
 * example to sign up for a newsletter or to receive a free mini report),
 * you can send them this welcome email. It introduces the brand and
 * explains what to expect next.
 *
 * @param name The customer's first name, used for personalisation.
 */
export function getWelcomeEmail(name: string) {
  const subject = "Welcome to Cosmic Blueprint!"
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d97706; margin-bottom: 0.5rem;">Welcome to Cosmic Blueprint, ${name}!</h2>
      <p>We're so happy you've decided to explore your cosmic design with us. Our mission is to provide
      <strong>precision astrology, personally designed</strong> to give you clarity and insight for your life journey.</p>
      <p>Over the coming days you'll receive more information about our reports and how they can help you understand
      your unique gifts, challenges and soul purpose. In the meantime, feel free to browse the reports on
      our website or reply to this email with any questions.</p>
      <p style="margin-top: 30px;">Warmly,<br/>The Cosmic Blueprint Team</p>
    </div>
  `
  return { subject, html }
}

/**
 * Generate the order confirmation email for a completed purchase.
 *
 * This template is used when a customer completes checkout for one of our
 * astrological reports. It thanks the customer for their purchase and
 * provides any next steps. The actual report PDF should still be sent
 * separately via the webhook logic with the report attached.
 *
 * @param name The customer's first name
 * @param reportType The report key (e.g. "natal", "karmic", "love")
 */
export function getOrderConfirmationEmail(name: string, reportType: string) {
  const titleMap: Record<string, string> = {
    natal: "Natal Chart Reading",
    karmic: "Karmic Blueprint",
    love: "Love & Compatibility Report",
    career: "Career & Purpose Report",
    yearly: "Yearly Forecast",
  }
  const reportTitle = titleMap[reportType] || "Astrology Report"
  const subject = `Thank you for your ${reportTitle} purchase!`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d97706; margin-bottom: 0.5rem;">Your ${reportTitle} is on its way, ${name}!</h2>
      <p>Thank you for ordering the <strong>${reportTitle}</strong> from Cosmic Blueprint. We truly appreciate your trust
      in our work and are excited to share your personalised report with you.</p>
      <p>Your report is currently being generated and will be delivered as a PDF attachment in a separate email
      within a few minutes. If you don’t see it, please check your spam folder or reply to this email and we'll resend it.</p>
      <p>In the meantime, here's a quick reminder of what you'll get:</p>
      <ul>
        <li>Deep insights into your cosmic design based on your birth details</li>
        <li>Actionable guidance to help you align with your highest potential</li>
        <li>Lifetime access to your PDF so you can revisit it any time</li>
      </ul>
      <p style="margin-top: 30px;">With gratitude,<br/>The Cosmic Blueprint Team</p>
    </div>
  `
  return { subject, html }
}