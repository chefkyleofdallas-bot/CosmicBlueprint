import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1f]">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
            <p>
              By accessing and using Cosmic Blueprint, you agree to be bound by these Terms of Service and all
              applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Service Description</h2>
            <p>
              Cosmic Blueprint provides personalized astrology reports based on the birth information you provide.
              Reports are delivered digitally via email in PDF format.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Accuracy of Information</h2>
            <p>
              You are responsible for providing accurate birth information. We cannot guarantee the accuracy of reports
              based on incorrect or incomplete data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Refunds</h2>
            <p>
              Due to the digital nature of our products, all sales are final. Refunds may be considered on a
              case-by-case basis for technical issues or errors on our part. Please contact{" "}
              <a href="mailto:support@cosmicblueprint.space" className="text-amber-400 hover:underline">
                support@cosmicblueprint.space
              </a>{" "}
              with any concerns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
            <p>
              Questions about these terms? Contact{" "}
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
