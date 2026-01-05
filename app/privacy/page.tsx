import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1f]">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <p>
              We collect personal information that you provide to us, including your name, email address, birth date,
              birth time, and birth location. This information is necessary to generate your personalized astrology
              report.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <p>
              Your information is used solely to create your astrology report and deliver it to you via email. We do not
              sell, trade, or share your personal information with third parties except as necessary to process payments
              through Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. Payment processing is
              handled securely through Stripe, and we do not store your payment card details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your data rights (GDPR/CCPA requests),
              please contact us at{" "}
              <a href="mailto:privacy@cosmicblueprint.space" className="text-amber-400 hover:underline">
                privacy@cosmicblueprint.space
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
