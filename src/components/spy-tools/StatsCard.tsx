"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  index?: number;
}

export function StatsCard({ label, value, change, trend = "up", icon: Icon, index = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl p-4 bg-white border border-[#E8E0D6] hover:shadow-premium-lg transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-gradient-brand-subtle flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#0F5257]" />
          </div>
        )}
        {change && (
          <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${
            trend === "up" ? "bg-emerald-50 text-emerald-600" : 
            trend === "down" ? "bg-red-50 text-red-500" :
            "bg-gray-50 text-gray-500"
          }`}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : trend === "down" ? <TrendingDown className="w-3 h-3" /> : null}
            {change}
          </span>
        )}
      </div>
      <p className="text-xl font-bold text-[#3A2A22]">{value}</p>
      <p className="text-xs text-[#8B7A6A] mt-0.5">{label}</p>
    </motion.div>
  );
}