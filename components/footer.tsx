import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-amber-900/30 bg-[#0a0a1f] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Cosmic Blueprint</h3>
            <p className="text-gray-400 text-sm">Precision Astrology, Personally Designed</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Disclaimer
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                <span className="text-gray-300">Support:</span>{" "}
                <a href="mailto:support@cosmicblueprint.space" className="hover:text-amber-400 transition-colors">
                  support@cosmicblueprint.space
                </a>
              </p>
              <p className="text-gray-400 text-sm">
                <span className="text-gray-300">Privacy:</span>{" "}
                <a href="mailto:privacy@cosmicblueprint.space" className="hover:text-amber-400 transition-colors">
                  privacy@cosmicblueprint.space
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-amber-900/30 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Cosmic Blueprint. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
