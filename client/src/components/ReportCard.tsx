import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type ReportType, reportDetails } from "@shared/schema";
import { ArrowRight, Check } from "lucide-react";
import natalImg from "@/assets/reports/natal.png";
import karmicImg from "@/assets/reports/karmic.png";
import loveImg from "@/assets/reports/love.png";
import careerImg from "@/assets/reports/career.png";
import yearlyImg from "@/assets/reports/yearly.png";

const reportImages: Record<ReportType, string> = {
  natal: natalImg,
  karmic: karmicImg,
  love: loveImg,
  career: careerImg,
  yearly: yearlyImg,
};

interface ReportCardProps {
  type: ReportType;
  onPurchase: (type: ReportType) => void;
  index: number;
}

export function ReportCard({ type, onPurchase, index }: ReportCardProps) {
  const details = reportDetails[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col h-full hover:border-primary/30 transition-all duration-300 group relative"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={reportImages[type]} 
          alt={details.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a103c] to-transparent opacity-60" />
      </div>

      <div className="p-8 flex flex-col flex-grow relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-display mb-3 text-white group-hover:text-primary transition-colors">
            {details.name}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {details.description}
          </p>
          
          <ul className="space-y-3">
            {details.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-300">
                <Check className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-display text-primary font-bold">
              ${details.price}
            </span>
          </div>
          <Button 
            onClick={() => onPurchase(type)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
          >
            Purchase <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
