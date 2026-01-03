import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReportCard } from "@/components/ReportCard";
import { PurchaseModal } from "@/components/PurchaseModal";
import { type ReportType, reportTypes } from "@shared/schema";
import { ArrowDown, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchase = (type: ReportType) => {
    setSelectedReport(type);
    setIsModalOpen(true);
  };

  const scrollToCatalog = () => {
    const catalog = document.getElementById('catalog');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <PurchaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedReport={selectedReport}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Animated background stars */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
             <div className="absolute top-1/3 left-3/4 w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-75 shadow-[0_0_15px_var(--primary)]" />
             <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-accent rounded-full animate-pulse delay-150 shadow-[0_0_10px_var(--accent)]" />
             {/* Nebula effect */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />
          </div>

          <div className="container relative z-10 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary mb-8 backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium tracking-wide uppercase">Precision Astrology</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-glow bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/50 to-white">
                Cosmic Blueprint
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
                Discover the map of your soul. Professional astrological reports designed to reveal your purpose, path, and potential.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={scrollToCatalog}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14 rounded-full font-semibold shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300"
                >
                  Explore Your Blueprint
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={scrollToCatalog}
                  className="text-white border-white/20 hover:bg-white/10 text-lg px-8 h-14 rounded-full"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </section>

        {/* Catalog Section */}
        <section id="catalog" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4 text-white">Celestial Reports</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Choose the guidance you seek. Each report is meticulously calculated based on your unique birth data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reportTypes.map((type, index) => (
                <ReportCard 
                  key={type} 
                  type={type} 
                  index={index}
                  onPurchase={handlePurchase} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-black/20 border-y border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display mb-6 text-white">More Than Just a Horoscope</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-6 shrink-0">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Astronomical Precision</h3>
                      <p className="text-gray-400">
                        We use NASA-grade ephemeris data to calculate planetary positions down to the second of arc for unparalleled accuracy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mr-6 shrink-0">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Deep Psychological Insight</h3>
                      <p className="text-gray-400">
                        Beyond prediction, our reports offer profound psychological understanding of your motivations, fears, and hidden talents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {/* Decorative image placeholder using pure CSS shapes */}
                <div className="aspect-square rounded-full border border-white/10 relative p-12 animate-[spin_60s_linear_infinite]">
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/20 m-4" />
                  <div className="absolute inset-0 rounded-full border border-white/5 m-12" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full blur-[2px]" />
                  <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-3 h-3 bg-accent rounded-full blur-[2px]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-handwriting text-4xl text-white/20 -rotate-12">Know Thyself</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
