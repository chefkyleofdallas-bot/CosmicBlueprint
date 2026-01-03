import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, buildUrl } from "@shared/routes";
import { reportDetails, astrologyInputSchema, type Order } from "@shared/schema";
import { z } from "zod";
import { stripe } from "./lib/stripe";
import { sendEmail } from "./lib/email";
import { generateReportPDF } from "./lib/pdf";
import express from 'express';

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Create Checkout Session
  app.post(api.checkout.createSession.path, async (req, res) => {
    try {
      const input = api.checkout.createSession.input.parse(req.body);
      const report = reportDetails[input.reportType];

      // Admin bypass logic
      const adminEmail = process.env.ADMIN_EMAIL || 'Kyle.merritt@cosmicblueprint.space';
      if (input.customerEmail.toLowerCase() === adminEmail.toLowerCase()) {
        const order: Order = {
          id: `admin_${Date.now()}`,
          customerEmail: input.customerEmail,
          customerName: input.fullName,
          reportType: input.reportType,
          status: "completed",
          stripeSessionId: `admin_${Date.now()}`,
          createdAt: Date.now(),
          astrologyData: {
            fullName: input.fullName,
            dateOfBirth: input.dateOfBirth,
            timeOfBirth: input.timeOfBirth,
            cityOfBirth: input.cityOfBirth,
            countryOfBirth: input.countryOfBirth,
          }
        };
        await storage.createOrder(order);
        
        // Background generation
        (async () => {
          try {
            const pdfBytes = await generateReportPDF(order);
            await sendEmail(
              input.customerEmail,
              "Admin Preview: Your Cosmic Blueprint Report",
              `Hello Admin,\n\nHere is your free report for testing.\n\nWarmly,\nCosmic Blueprint`,
              [{
                filename: `Admin_Blueprint_${order.reportType}.pdf`,
                content: Buffer.from(pdfBytes)
              }]
            );
          } catch (e) {
            console.error("Admin bypass email error:", e);
          }
        })();

        return res.json({ url: '/success?admin=true' });
      }

      // Get price ID from env or fallback (in a real app, fail if missing)
      const priceId = process.env[report.priceIdEnv] || 'price_mock_id';
      
      const domain = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.get('host')}`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: report.name,
                description: `Personalized ${input.reportType} astrology report for ${input.fullName}`,
              },
              unit_amount: report.price * 100, // cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}/`,
        metadata: {
          reportType: input.reportType,
          customerName: input.fullName,
          // Store other inputs in metadata or separate DB if too large.
          // Stripe metadata has 50 key limit, 500 char value limit.
          dob: input.dateOfBirth,
          tob: input.timeOfBirth || '',
          city: input.cityOfBirth,
          country: input.countryOfBirth,
        },
      });

      if (!session.url) {
        throw new Error("Failed to create Stripe session URL");
      }

      // Store initial order state
      const order: Order = {
        id: session.id, // using session ID as order ID for simplicity in MVP
        customerEmail: "pending@example.com", // will be updated via webhook
        customerName: input.fullName,
        reportType: input.reportType,
        status: "pending",
        stripeSessionId: session.id,
        createdAt: Date.now(),
        astrologyData: {
          fullName: input.fullName,
          dateOfBirth: input.dateOfBirth,
          timeOfBirth: input.timeOfBirth,
          cityOfBirth: input.cityOfBirth,
          countryOfBirth: input.countryOfBirth,
        }
      };
      await storage.createOrder(order);

      res.json({ url: session.url });
    } catch (err: any) {
      console.error("Stripe error:", err);
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: err.message || "Internal Server Error" });
      }
    }
  });

  // Stripe Webhook
  app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      if (!sig || !webhookSecret) {
        // If testing locally without webhook secret, simpler handling or just verify payload structure
         console.log("Skipping signature verification in dev/mock environment if secret missing");
         event = req.body; // In production this is dangerous!
      } else {
         event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      }
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Fulfill the purchase...
      const sessionId = session.id;
      const customerEmail = session.customer_details?.email;
      
      console.log(`Payment successful for session ${sessionId}`);

      // Update order status
      const order = await storage.getOrderBySessionId(sessionId);
      if (order) {
        if (customerEmail) order.customerEmail = customerEmail;
        await storage.updateOrderStatus(sessionId, 'completed');

        // Generate PDF
        try {
          const pdfBytes = await generateReportPDF(order);
          
          // Send Email to Customer
          if (customerEmail) {
            await sendEmail(
              customerEmail,
              "Your Cosmic Blueprint Report Is Ready",
              `Hello ${order.customerName},\n\nYour ${order.reportType} report is attached.\n\nWarmly,\nCosmic Blueprint`,
              [{
                filename: `Cosmic_Blueprint_${order.reportType}.pdf`,
                content: Buffer.from(pdfBytes)
              }]
            );
          }

          // Send Email to Kyle
          const kyleEmail = process.env.KYLE_NOTIFY_EMAIL || 'Kyle.merritt@cosmicblueprint.space';
          await sendEmail(
            kyleEmail,
            `New Cosmic Blueprint Order: ${order.reportType}`,
            `New order from ${order.customerName} (${customerEmail}).\nType: ${order.reportType}\nSession: ${sessionId}`
          );
          
        } catch (error) {
           console.error("Error generating/sending report:", error);
           // In production, we should probably flag this order for manual review
        }
      } else {
        console.warn(`Order not found for session ${sessionId} in webhook`);
      }
    }

    res.json({ received: true });
  });

  return httpServer;
}
