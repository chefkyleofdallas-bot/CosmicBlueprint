import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-amber-900/30 bg-[#0a0a1f]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Cosmic Blueprint" width={50} height={50} className="rounded-full" />
          <span className="text-xl font-bold text-white">Cosmic Blueprint</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/privacy" className="text-gray-300 hover:text-amber-400 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-gray-300 hover:text-amber-400 transition-colors">
            Terms
          </Link>
          <Link href="/disclaimer" className="text-gray-300 hover:text-amber-400 transition-colors">
            Disclaimer
          </Link>
        </nav>
      </div>
    </header>
  )
}
