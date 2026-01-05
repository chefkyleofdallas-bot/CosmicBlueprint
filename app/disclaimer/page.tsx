import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1f]">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Disclaimer</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Entertainment Purposes</h2>
            <p>
              Cosmic Blueprint astrology reports are provided for entertainment and self-reflection purposes only. They
              should not be considered as professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Not a Substitute for Professional Advice</h2>
            <p>
              Our reports are not a substitute for professional medical, legal, financial, or psychological advice. If
              you need such advice, please consult with a qualified professional.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">No Guarantees</h2>
            <p>
              We make no guarantees about the accuracy of astrological interpretations or their applicability to your
              life. Results and experiences may vary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Personal Responsibility</h2>
            <p>
              You are solely responsible for any decisions or actions you take based on the information in your
              astrology report.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Questions</h2>
            <p>
              For questions about this disclaimer, contact{" "}
              <a href="mailto:support@cosmicblueprint.space" className="text-amber-400 hover:underline">
                support@cosmicblueprint.space
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
