"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Eye, TrendingUp, DollarSign, Users } from "lucide-react";

interface AdData {
  brand: string;
  headline: string;
  platform: string;
  spend: string;
  impressions: string;
  ctr: string;
  engagement: string;
  objective: string;
  status: string;
}

interface AdSpyCardProps {
  ad: AdData;
  index?: number;
}

export function AdSpyCard({ ad, index = 0 }: AdSpyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-2xl p-5 bg-white border border-[#E8E0D6] hover:shadow-premium-lg hover:border-[#D4AF37]/30 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-brand-subtle flex items-center justify-center text-sm font-bold text-[#0F5257]">
            {ad.brand.charAt(0)}
          </div>
          <div>
            <span className="text-xs font-semibold text-[#3A2A22]">{ad.brand}</span>
            <Badge variant="premium" size="sm" className="ml-2 text-[9px]">{ad.platform}</Badge>
          </div>
        </div>
        <Badge variant={ad.status === "active" ? "success" : "warning"} size="sm">
          {ad.status}
        </Badge>
      </div>
      <p className="font-display font-bold text-[#3A2A22] text-sm my-2 leading-snug">
        &ldquo;{ad.headline}&rdquo;
      </p>
      <div className="grid grid-cols-4 gap-1.5 mt-3">
        <div className="bg-[#F7F3ED] rounded-xl p-2 text-center">
          <DollarSign className="w-3 h-3 text-[#0F5257] mx-auto mb-0.5" />
          <span className="text-[10px] font-bold text-[#0F5257] block">{ad.spend}</span>
          <span className="text-[8px] text-[#8B7A6A]">Spend</span>
        </div>
        <div className="bg-[#F7F3ED] rounded-xl p-2 text-center">
          <Eye className="w-3 h-3 text-[#3A2A22] mx-auto mb-0.5" />
          <span className="text-[10px] font-bold text-[#3A2A22] block">{ad.impressions}</span>
          <span className="text-[8px] text-[#8B7A6A]">Impr.</span>
        </div>
        <div className="bg-[#F7F3ED] rounded-xl p-2 text-center">
          <TrendingUp className="w-3 h-3 text-[#D4AF37] mx-auto mb-0.5" />
          <span className="text-[10px] font-bold text-[#D4AF37] block">{ad.ctr}</span>
          <span className="text-[8px] text-[#8B7A6A]">CTR</span>
        </div>
        <div className="bg-[#F7F3ED] rounded-xl p-2 text-center">
          <Users className="w-3 h-3 text-[#5A4535] mx-auto mb-0.5" />
          <span className="text-[10px] font-bold text-[#5A4535] block">{ad.engagement}</span>
          <span className="text-[8px] text-[#8B7A6A]">Eng.</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E8E0D6]">
        <span className="text-[10px] text-[#8B7A6A]">{ad.objective}</span>
        <Button variant="ghost" size="xs" className="text-[#0F5257]">
          <Eye className="w-3 h-3 mr-1" /> Spy Creative
        </Button>
      </div>
    </motion.div>
  );
}

export const sampleAds: AdData[] = [
  { brand: "FitGear Pro", headline: "Your workout, upgraded. 50% off first month", platform: "TikTok", spend: "$12.4K", impressions: "245K", ctr: "3.2%", engagement: "124K", objective: "Conversions", status: "active" },
  { brand: "SmartHome Co", headline: "Control your home with your voice. See it in action", platform: "Facebook", spend: "$8.9K", impressions: "189K", ctr: "2.8%", engagement: "89K", objective: "Traffic", status: "active" },
  { brand: "GlowUp Beauty", headline: "10-second morning routine that changed my skin", platform: "TikTok", spend: "$21.3K", impressions: "640K", ctr: "5.6%", engagement: "340K", objective: "Conversions", status: "active" },
  { brand: "TechHub", headline: "The future is completely wireless. Watch the demo", platform: "Instagram", spend: "$15.8K", impressions: "410K", ctr: "3.8%", engagement: "210K", objective: "Brand Awareness", status: "active" },
  { brand: "HomeFit", headline: "Your home gym, delivered in one box", platform: "TikTok", spend: "$9.6K", impressions: "198K", ctr: "4.3%", engagement: "98K", objective: "Conversions", status: "active" },
  { brand: "LuxeHome", headline: "Premium living starts with the right details", platform: "Facebook", spend: "$11.2K", impressions: "234K", ctr: "3.5%", engagement: "134K", objective: "Traffic", status: "paused" },
  { brand: "EcoWear", headline: "Sustainable fashion that actually looks good", platform: "Instagram", spend: "$18.7K", impressions: "512K", ctr: "4.1%", engagement: "278K", objective: "Conversions", status: "active" },
  { brand: "PetPulse", headline: "Track your pet's health in real-time", platform: "TikTok", spend: "$7.4K", impressions: "156K", ctr: "2.9%", engagement: "67K", objective: "Traffic", status: "active" },
  { brand: "SoleMate", headline: "Insoles that saved my back — game changer", platform: "Facebook", spend: "$6.8K", impressions: "134K", ctr: "3.6%", engagement: "72K", objective: "Conversions", status: "paused" },
  { brand: "AquaPure", headline: "The water bottle that tells you to drink more", platform: "TikTok", spend: "$14.2K", impressions: "389K", ctr: "4.8%", engagement: "201K", objective: "Brand Awareness", status: "active" },
];

export const platformOptions = [
  { value: "all", label: "All Platforms" },
  { value: "TikTok", label: "TikTok" },
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
];