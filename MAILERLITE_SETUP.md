# MailerLite Integration Setup

## Step 1: Add API Key to Environment Variables

1. In your Vercel project dashboard, go to **Settings** → **Environment Variables**
2. Add a new environment variable:
   - **Key**: `MAILERLITE_API_KEY`
   - **Value**: Your MailerLite API key (get it from MailerLite dashboard)
   - **Environment**: Select all (Production, Preview, Development)
3. Click **Save**
4. Redeploy your application for the changes to take effect

## Step 2: Create Custom Fields in MailerLite (Optional but Recommended)

To store birth data in MailerLite, create these custom fields in your MailerLite account:

1. Go to your MailerLite dashboard → **Subscribers** → **Fields**
2. Create the following custom fields:
   - `birth_date` (type: Text or Date)
   - `birth_time` (type: Text)
   - `birth_city` (type: Text)

These fields will store the astrological birth data from your subscribers.

## Step 3: Test the Integration

1. After adding the API key and redeploying, test the subscribe form
2. Check your MailerLite dashboard to confirm the subscriber was added
3. Check the Vercel function logs to see if there are any errors

## How It Works

- When someone subscribes, they are automatically added to your MailerLite account
- Their birth data is stored in custom fields (if you've created them)
- A local backup is still saved to `data/subscribers.json` as a failsafe
- If MailerLite is unavailable, the subscription still succeeds (graceful fallback)

## Getting Your MailerLite API Key

1. Log in to your MailerLite account
2. Go to **Integrations** → **Developer API**
3. Generate a new API token
4. Copy the token and paste it into your Vercel environment variables

## Benefits

- Automatic email campaigns and automation workflows
- Segmentation based on subscriber data
- Professional email marketing tools
- Analytics and reporting
- GDPR compliance tools built-in
