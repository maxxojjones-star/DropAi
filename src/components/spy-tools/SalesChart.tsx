"use client";

import { motion } from "framer-motion";

interface SalesDataPoint {
  label: string;
  tiktok: number;
  facebook: number;
  shopify: number;
}

interface SalesChartProps {
  data: SalesDataPoint[];
  title?: string;
}

export function SalesChart({ data, title = "Sales Velocity" }: SalesChartProps) {
  const maxVal = Math.max(...data.flatMap(d => [d.tiktok, d.facebook, d.shopify]));

  return (
    <div className="rounded-2xl p-5 bg-white border border-[#E8E0D6]">
      {title && (
        <h3 className="font-display font-bold text-[#3A2A22] mb-4 text-sm">{title}</h3>
      )}
      <div className="flex items-end gap-3 h-[200px]">
        {data.map((point, i) => {
          const tH = (point.tiktok / maxVal) * 170;
          const fH = (point.facebook / maxVal) * 170;
          const sH = (point.shopify / maxVal) * 170;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5 group relative">
              {/* Stacked platform bars */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: tH }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                style={{ height: tH }}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: fH }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="w-full bg-gradient-to-t from-[#1877F2] to-blue-300 rounded-sm"
                style={{ height: fH }}
              />
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: sH }}
                transition={{ delay: i * 0.11, duration: 0.4 }}
                className="w-full bg-gradient-to-t from-[#0F5257] to-teal-300 rounded-sm"
                style={{ height: sH }}
              />
              <span className="text-[10px] text-[#8B7A6A] mt-1">{point.label}</span>
              {/* Tooltip on hover */}
              <div className="absolute -top-28 left-1/2 -translate-x-1/2 bg-white border border-[#E8E0D6] rounded-xl px-3 py-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-10 pointer-events-none">
                <div className="font-medium text-[#3A2A22] mb-1">{point.label}</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-blue-500" /> TikTok: ${point.tiktok.toLocaleString()}</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-[#1877F2]" /> Facebook: ${point.facebook.toLocaleString()}</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-[#0F5257]" /> Shopify: ${point.shopify.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-3 text-[10px] text-[#8B7A6A]">
        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded bg-blue-500" /> TikTok Shop</div>
        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded bg-[#1877F2]" /> Facebook Shop</div>
        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded bg-[#0F5257]" /> Shopify Store</div>
      </div>
    </div>
  );
}

export const salesVelocityData: SalesDataPoint[] = [
  { label: "Mon", tiktok: 12800, facebook: 8400, shopify: 6200 },
  { label: "Tue", tiktok: 15200, facebook: 9200, shopify: 7100 },
  { label: "Wed", tiktok: 14100, facebook: 10100, shopify: 6900 },
  { label: "Thu", tiktok: 16800, facebook: 11200, shopify: 8400 },
  { label: "Fri", tiktok: 19400, facebook: 13500, shopify: 10200 },
  { label: "Sat", tiktok: 22100, facebook: 14800, shopify: 11800 },
  { label: "Sun", tiktok: 18500, facebook: 12200, shopify: 9500 },
];