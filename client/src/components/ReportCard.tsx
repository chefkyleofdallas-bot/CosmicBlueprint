import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type ReportType, reportDetails } from "@shared/schema";
import { Star, Sparkles, ArrowRight } from "lucide-react";

interface ReportCardProps {
  type: ReportType;
  onPurchase: (type: ReportType) => void;
  index: number;
}

const descriptions: Record<ReportType, string> = {
  natal: "Discover your soul's original blueprint. A comprehensive analysis of your birth chart revealing your strengths, challenges, and destiny.",
  karmic: "Uncover past life patterns and karmic debts. Understand why certain themes repeat in your life and how to break free.",
  love: "Decode your heart's language. Analyze compatibility, relationship needs, and your path to finding lasting connection.",
  career: "Align with your true vocation. Identify your professional strengths and the work you were destined to do.",
  yearly: "Your personalized roadmap for the year ahead. Prepare for upcoming transits and opportunities."
};

const features: Record<ReportType, string[]> = {
  natal: ["Sun, Moon, Rising Analysis", "Planetary Aspects", "House Placements", "Life Path Number"],
  karmic: ["South Node Analysis", "Saturn's Lessons", "Pluto Transformations", "Karmic Debts"],
  love: ["Venus & Mars Placement", "7th House Analysis", "Relationship Patterns", "Ideal Partner Traits"],
  career: ["10th House/Midheaven", "Vocational Indicators", "Wealth Potential", "Success Timing"],
  yearly: ["Major Transits", "Monthly Themes", "Key Dates", "Growth Opportunities"]
};

export function ReportCard({ type, onPurchase, index }: ReportCardProps) {
  const details = reportDetails[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl p-8 flex flex-col h-full hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Mystical glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
            {type === 'natal' && <Star className="w-6 h-6" />}
            {type === 'karmic' && <Sparkles className="w-6 h-6" />}
            {type === 'love' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>}
            {type === 'career' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20M12 2l4 4-4-4-4 4"/></svg>}
            {type === 'yearly' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          </div>
          <h3 className="text-2xl font-display mb-2 text-white group-hover:text-primary transition-colors">
            {details.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed min-h-[60px]">
            {descriptions[type]}
          </p>
        </div>

        <div className="mt-auto">
          <ul className="space-y-3 mb-8">
            {features[type].map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
            <span className="text-3xl font-display text-primary font-bold">
              ${details.price}
            </span>
            <Button 
              onClick={() => onPurchase(type)}
              className="bg-white/10 hover:bg-primary hover:text-primary-foreground text-white border-white/10 hover:border-primary transition-all duration-300"
            >
              Start Journey <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
