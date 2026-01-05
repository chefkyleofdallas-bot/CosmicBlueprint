# Cosmic Blueprint

Precision Astrology, Personally Designed - A Next.js app for delivering personalized astrology reports via Stripe payments.

## Features

- 5 Astrology Reports (Natal, Karmic, Love, Career, Yearly)
- Stripe Checkout Integration
- Automated PDF Generation
- Email Delivery (Customer + Admin notification)
- Legal Pages (Privacy, Terms, Disclaimer)
- Fully Vercel-compatible (Free tier friendly)

## Tech Stack

- **Framework:** Next.js 16 App Router
- **Styling:** Tailwind CSS v4
- **Payments:** Stripe Checkout + Webhooks
- **PDF:** pdf-lib (serverless-friendly)
- **Email:** nodemailer via SMTP
- **Deployment:** Vercel

## Environment Variables

Create these in your Vercel project settings:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_NATAL=price_...
STRIPE_PRICE_ID_KARMIC=price_...
STRIPE_PRICE_ID_LOVE=price_...
STRIPE_PRICE_ID_CAREER=price_...
STRIPE_PRICE_ID_YEARLY=price_...

# SMTP Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=support@cosmicblueprint.space

# Notifications
KYLE_NOTIFY_EMAIL=Kyle.merritt@cosmicblueprint.space

# Site
PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/cosmic-blueprint.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click "Deploy"

### 3. Add Environment Variables

In your Vercel project dashboard:
1. Go to Settings → Environment Variables
2. Add all the variables listed above
3. Redeploy the project

### 4. Set Up Stripe Webhook

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter: `https://your-domain.vercel.app/api/stripe-webhook`
4. Select event: `checkout.session.completed`
5. Copy the webhook signing secret
6. Add it to Vercel as `STRIPE_WEBHOOK_SECRET`
7. Redeploy

### 5. Create Stripe Products

1. Go to [Stripe Products](https://dashboard.stripe.com/products)
2. Create 5 products with prices:
   - Natal Chart Reading: $49
   - Karmic Blueprint: $69
   - Love & Compatibility: $59
   - Career & Purpose: $59
   - Yearly Forecast: $79
3. Copy each Price ID and add to Vercel env vars
4. Redeploy

### 6. Test the Flow

1. Visit your site
2. Click "Get Your Report" on any card
3. Fill in birth details
4. Complete test payment (use Stripe test card: 4242 4242 4242 4242)
5. Verify email delivery

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## SMTP Setup (Gmail Example)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use the generated password as `SMTP_PASS`

## Troubleshooting

**Webhook not receiving events:**
- Verify webhook URL in Stripe dashboard
- Check webhook secret matches env var
- View logs in Vercel dashboard

**Emails not sending:**
- Verify SMTP credentials
- Check spam folder
- Test SMTP connection separately

**PDF generation fails:**
- Check Vercel function logs
- Ensure serverless function timeout is sufficient (default 10s should work)

## Support

For issues or questions: Kyle.merritt@cosmicblueprint.space

## License

All rights reserved © 2026 Cosmic Blueprint
