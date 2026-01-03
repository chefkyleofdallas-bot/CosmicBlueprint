import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/logo.png";

export function Navbar() {
  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <img src={logoUrl} alt="Cosmic Blueprint" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
          <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            Cosmic Blueprint
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <button onClick={scrollToCatalog} className="hover:text-white transition-colors">Reports</button>
          <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          <Button 
            onClick={scrollToCatalog}
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Get Your Blueprint
          </Button>
        </div>
      </div>
    </nav>
  );
}
