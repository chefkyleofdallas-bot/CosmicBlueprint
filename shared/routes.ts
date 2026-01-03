import { z } from 'zod';
import { astrologyInputSchema, orderSchema } from './schema';

export const api = {
  checkout: {
    createSession: {
      method: 'POST' as const,
      path: '/api/create-checkout-session',
      input: astrologyInputSchema,
      responses: {
        200: z.object({ url: z.string() }),
        400: z.object({ message: z.string() }),
        500: z.object({ message: z.string() }),
      },
    },
  },
  // Webhooks are typically handled separately as they don't have a standard client-side caller
};

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// Helper to build URLs (required by frontend)
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
