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

export const reportDetails: Record<ReportType, { name: string; price: number; priceIdEnv: string; description: string; benefits: string[] }> = {
  natal: { 
    name: "Natal Chart Reading", 
    price: 49, 
    priceIdEnv: "STRIPE_PRICE_ID_NATAL",
    description: "A comprehensive analysis of your birth chart revealing your core personality, strengths, challenges, and life purpose.",
    benefits: ["Complete planetary positions", "House interpretations", "Aspect analysis", "Life path insights"]
  },
  karmic: { 
    name: "Karmic Blueprint", 
    price: 69, 
    priceIdEnv: "STRIPE_PRICE_ID_KARMIC",
    description: "Explore your soul's journey through past life influences, karmic lessons, and evolutionary path.",
    benefits: ["North & South Node analysis", "Past life patterns", "Karmic debt insights", "Soul mission guidance"]
  },
  love: { 
    name: "Love & Compatibility", 
    price: 59, 
    priceIdEnv: "STRIPE_PRICE_ID_LOVE",
    description: "Understand your romantic nature and relationship dynamics with a partner or discover your ideal match.",
    benefits: ["Venus & Mars placements", "Synastry analysis (with partner)", "Love language insights", "Relationship patterns"]
  },
  career: { 
    name: "Career & Purpose", 
    price: 59, 
    priceIdEnv: "STRIPE_PRICE_ID_CAREER",
    description: "Discover your professional strengths, ideal career paths, and how to align work with your cosmic blueprint.",
    benefits: ["Midheaven & 10th house analysis", "Natural talents & skills", "Career timing insights", "Professional purpose alignment"]
  },
  yearly: { 
    name: "Yearly Forecast", 
    price: 79, 
    priceIdEnv: "STRIPE_PRICE_ID_YEARLY",
    description: "A detailed look at the upcoming year with monthly themes, opportunities, and cosmic guidance.",
    benefits: ["Solar return analysis", "Monthly transit guide", "Key dates & timing", "Growth opportunities"]
  }
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
