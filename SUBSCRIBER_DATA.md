# Subscriber Data Management

## Current Implementation

Subscriber data is currently stored in a local JSON file at `data/subscribers.json`. This file is automatically created when the first subscriber signs up.

## Data Structure

Each subscriber entry contains:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "birthDate": "1990-01-15",
  "birthTime": "14:30", // Optional
  "birthCity": "New York", // Optional
  "subscribedAt": "2026-01-04T20:30:00.000Z"
}
```

## Migration Options

### Option 1: MailerLite Integration

To integrate with MailerLite:
1. Sign up for a MailerLite account at https://www.mailerlite.com
2. Get your API key from Account Settings → Integrations
3. Add `MAILERLITE_API_KEY` to your environment variables
4. The subscribe API will automatically sync subscribers to MailerLite

### Option 2: Database Storage (Supabase)

For a more robust solution with full control:
1. Connect Supabase integration from the v0 sidebar
2. Create a `subscribers` table with the schema above
3. Update the subscribe API to use Supabase client
4. Benefits: Easy querying, export to CSV, RLS security, real-time updates

### Option 3: Database Storage (Neon)

For PostgreSQL with SQL access:
1. Connect Neon integration from the v0 sidebar
2. Create a `subscribers` table via SQL
3. Update the subscribe API to use Neon client
4. Benefits: Full SQL control, easy backups, migration-ready

## Accessing Current Subscribers

The `data/subscribers.json` file contains all subscriber data. You can:
- Download it directly from your server
- Parse it with any JSON tool
- Import it into your CRM or email service
- Use it for promotional campaigns

## Note for Vercel Deployment

The file-based storage works locally and in preview deployments, but **will not persist on Vercel production** since the filesystem is read-only. For production, you MUST migrate to one of the database or MailerLite options above.
