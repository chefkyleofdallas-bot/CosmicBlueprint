# Cosmic Blueprint

## Overview

Cosmic Blueprint is a premium astrology report e-commerce platform. Users can purchase personalized astrology reports (natal charts, karmic path, love compatibility, career direction, yearly forecasts) through a polished, cosmic-themed landing page. The platform handles payment processing via Stripe, generates branded PDF reports, and delivers them via email.

The application follows a monorepo structure with a React frontend (Vite) and Express backend, sharing type definitions and schemas between client and server.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom cosmic theme (dark mode, purple/gold color palette)
- **UI Components**: shadcn/ui component library (Radix primitives + Tailwind)
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth reveals and transitions

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: REST endpoints defined in `shared/routes.ts` with Zod schemas for input validation
- **Session Storage**: In-memory storage (MemStorage class) for orders - no database required for MVP

### Shared Code
- **Location**: `/shared` directory
- **Schemas**: Zod schemas for report types, astrology inputs, and orders
- **Routes**: API route definitions with input/output schemas for type safety

### Key Design Decisions

1. **No Database for MVP**: Orders stored in memory via MemStorage class. Designed for quick deployment without database setup overhead.

2. **Stripe Checkout Flow**: 
   - User fills form → creates Stripe Checkout session → redirects to Stripe
   - Webhook handles payment confirmation as source of truth
   - Admin bypass for testing (specific email skips payment)

3. **PDF Generation**: Uses pdf-lib (serverless-safe) for generating branded astrology reports server-side.

4. **Email Delivery**: Nodemailer with SMTP for delivering PDF reports to customers.

5. **Type Safety**: Shared Zod schemas ensure frontend forms and backend validation stay synchronized.

## External Dependencies

### Payment Processing
- **Stripe**: Checkout sessions, webhooks for payment verification
- **Environment Variables**: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID_*` for each report type

### Email Service
- **Nodemailer**: SMTP transport for email delivery
- **Environment Variables**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`

### Database
- **Drizzle ORM**: Configured for PostgreSQL but not actively used in MVP
- **Environment Variable**: `DATABASE_URL` (required by drizzle.config.ts)
- **Note**: Current implementation uses in-memory storage; database integration ready when needed

### PDF Generation
- **pdf-lib**: Serverless-compatible PDF creation for report documents

### Third-Party UI
- **Google Fonts**: Playfair Display (display), DM Sans (body), Architects Daughter (handwriting)