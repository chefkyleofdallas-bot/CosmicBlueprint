import { z } from "zod";

export const reportTypes = [
  "natal",
  "karmic",
  "love",
  "career",
  "yearly"
] as const;

export const ReportTypeEnum = z.enum(reportTypes);
export type ReportType = z.infer<typeof ReportTypeEnum>;

export const reportDetails: Record<ReportType, { name: string; price: number; priceIdEnv: string }> = {
  natal: { name: "Cosmic Blueprint – Natal Report", price: 29, priceIdEnv: "STRIPE_PRICE_ID_NATAL" },
  karmic: { name: "Soul Path & Karmic Blueprint", price: 34, priceIdEnv: "STRIPE_PRICE_ID_KARMIC" },
  love: { name: "Love & Relationship Blueprint", price: 39, priceIdEnv: "STRIPE_PRICE_ID_LOVE" },
  career: { name: "Career & Life Direction Blueprint", price: 34, priceIdEnv: "STRIPE_PRICE_ID_CAREER" },
  yearly: { name: "Yearly Personal Forecast", price: 24, priceIdEnv: "STRIPE_PRICE_ID_YEARLY" }
};

export const astrologyInputSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  timeOfBirth: z.string().optional(),
  cityOfBirth: z.string().min(1, "City of birth is required"),
  countryOfBirth: z.string().min(1, "Country of birth is required"),
  customerEmail: z.string().email("Valid email is required"),
  reportType: ReportTypeEnum,
});

export type AstrologyInput = z.infer<typeof astrologyInputSchema>;

// Schema for storing orders if we were using a DB, but used for type consistency
export const orderSchema = z.object({
  id: z.string(),
  customerEmail: z.string(),
  customerName: z.string(),
  reportType: ReportTypeEnum,
  status: z.enum(["pending", "completed", "failed"]),
  stripeSessionId: z.string(),
  createdAt: z.number(), // timestamp
  astrologyData: astrologyInputSchema.omit({ reportType: true }),
});

export type Order = z.infer<typeof orderSchema>;
