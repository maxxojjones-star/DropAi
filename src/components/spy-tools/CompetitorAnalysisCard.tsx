"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Globe, ShoppingCart, TrendingUp, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

interface CompetitorData {
  name: string;
  url: string;
  niche: string;
  estimatedRevenue: string;
  monthlyTraffic: string;
  products: number;
  avgPrice: string;
  socialFollowers: string;
  strengths: string[];
  weaknesses: string[];
  score: number;
}

interface CompetitorAnalysisCardProps {
  competitor: CompetitorData;
  index?: number;
}

export function CompetitorAnalysisCard({ competitor, index = 0 }: CompetitorAnalysisCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl p-5 bg-white border border-[#E8E0D6] hover:shadow-premium-lg transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
            {competitor.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-display font-bold text-[#3A2A22] text-sm">{competitor.name}</h3>
            <div className="flex items-center gap-1 text-[10px] text-[#8B7A6A]">
              <Globe className="w-3 h-3" />
              <span className="truncate max-w-[140px]">{competitor.url}</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
            competitor.score >= 80 ? "bg-emerald-50 text-emerald-600" :
            competitor.score >= 60 ? "bg-amber-50 text-amber-600" :
            "bg-red-50 text-red-500"
          }`}>
            {competitor.score}
          </div>
          <span className="text-[9px] text-[#8B7A6A]">Threat</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-[#F7F3ED] rounded-xl p-2 text-center">
          <ShoppingCart className="w-3 h-3 text-[#0F5257] mx-auto mb-0.5" />
          <span className="text-[10px] font-bold text-[#0F5257] block">{competitor.estimatedRevenue}</span>
          <span className="text-[7px] text-[#8B7A6A]">Revenue</span>
        </div>
        <div className="bg-[#F7F3ED] rounded-xl p-2 text-center">
          <TrendingUp className="w-3 h-3 text-[#D4AF37] mx-auto mb-0.5" />
          <span className="text-[10px] font-bold text-[#D4AF37] block">{competitor.monthlyTraffic}</span>
          <span className="text-[7px] text-[#8B7A6A]">Traffic</span>
        </div>
        <div className="bg-[#F7F3ED] rounded-xl p-2 text-center">
          <svg className="w-3 h-3 text-[#3A2A22] mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-[10px] font-bold text-[#3A2A22] block">{competitor.products}</span>
          <span className="text-[7px] text-[#8B7A6A]">Products</span>
        </div>
        <div className="bg-[#F7F3ED] rounded-xl p-2 text-center">
          <svg className="w-3 h-3 text-[#5A4535] mx-auto mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-bold text-[#5A4535] block">{competitor.avgPrice}</span>
          <span className="text-[7px] text-[#8B7A6A]">Avg Price</span>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="space-y-2">
        <div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium mb-1">
            <CheckCircle className="w-3 h-3" /> Strengths
          </div>
          <div className="flex flex-wrap gap-1">
            {competitor.strengths.map((s, i) => (
              <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium mb-1">
            <AlertTriangle className="w-3 h-3" /> Weaknesses
          </div>
          <div className="flex flex-wrap gap-1">
            {competitor.weaknesses.map((w, i) => (
              <span key={i} className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{w}</span>
            ))}
          </div>
        </div>
      </div>

      <Badge variant="premium" size="sm" className="mt-3 inline-flex">{competitor.niche}</Badge>
    </motion.div>
  );
}

export const sampleCompetitors: CompetitorData[] = [
  {
    name: "FitGear Official", url: "fitgearofficial.com", niche: "Fitness",
    estimatedRevenue: "$187K/mo", monthlyTraffic: "245K", products: 43, avgPrice: "$42",
    socialFollowers: "1.2M", strengths: ["Strong branding", "UGC content", "Fast shipping"],
    weaknesses: ["Limited sizes", "No international", "Thin margins"], score: 72,
  },
  {
    name: "SmartHome Store", url: "smarthomestore.io", niche: "Tech",
    estimatedRevenue: "$94K/mo", monthlyTraffic: "189K", products: 28, avgPrice: "$68",
    socialFollowers: "890K", strengths: ["Product reviews", "SEO traffic", "Low returns"],
    weaknesses: ["Slow support", "Limited catalog", "Price point"], score: 65,
  },
  {
    name: "BeautyGlow Lab", url: "beautyglowlab.com", niche: "Beauty",
    estimatedRevenue: "$142K/mo", monthlyTraffic: "340K", products: 56, avgPrice: "$34",
    socialFollowers: "3.4M", strengths: ["Viral TikTok", "Influencer network", "High margins"],
    weaknesses: ["Saturated niche", "Copycat risk", "High ad spend"], score: 78,
  },
  {
    name: "EcoLiving Co", url: "ecoliving.co", niche: "Home",
    estimatedRevenue: "$76K/mo", monthlyTraffic: "134K", products: 19, avgPrice: "$28",
    socialFollowers: "456K", strengths: ["Eco angle", "Subscription", "Loyal base"],
    weaknesses: ["Niche limiting", "Higher COGS", "Slow growth"], score: 58,
  },
];