import { Link } from "wouter";
import logoUrl from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src={logoUrl} alt="Cosmic Blueprint" className="w-8 h-8 object-contain" />
              <span className="font-display text-xl font-bold text-white">
                Cosmic Blueprint
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Illuminating your path through the precision of ancient wisdom and modern cosmic insight. Discover your true self.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-white mb-6">Reports</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><span className="hover:text-primary cursor-pointer transition-colors">Natal Chart</span></li>
              <li><span className="hover:text-primary cursor-pointer transition-colors">Karmic Path</span></li>
              <li><span className="hover:text-primary cursor-pointer transition-colors">Love Compatibility</span></li>
              <li><span className="hover:text-primary cursor-pointer transition-colors">Career Direction</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white mb-6">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white mb-6">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>support@cosmicblueprint.com</li>
              <li>123 Starlight Avenue</li>
              <li>Celestial City, CP 99999</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Cosmic Blueprint. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
