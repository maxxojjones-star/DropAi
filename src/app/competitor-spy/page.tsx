"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { CompetitorAnalysisCard, sampleCompetitors } from "@/components/spy-tools/CompetitorAnalysisCard";
import { StatsCard } from "@/components/spy-tools/StatsCard";
import { Search, Globe, Target, AlertTriangle, TrendingUp, Zap, ExternalLink, FileText } from "lucide-react";

export default function CompetitorSpyPage() {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (!url.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <DashboardLayout title="Competitor Spy" breadcrumbs={[{ label: "Competitor Spy" }]}>
      <div className="space-y-6 animate-fade-in">
        {/* Hero URL Analyzer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 bg-gradient-to-br from-[#0F5257] to-[#093235] text-white"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-display font-bold">Competitor URL Analyzer</h2>
              <p className="text-white/70 text-sm mt-1">
                Paste any competitor store URL to get instant analysis on products, pricing, traffic, and ad strategies.
              </p>
              <div className="flex gap-3 mt-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://competitor-store.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] backdrop-blur"
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  />
                </div>
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing || !url.trim()}
                  className="bg-[#D4AF37] text-[#3A2A22] hover:bg-[#C19B2E] font-semibold px-6"
                  leftIcon={analyzing ? undefined : <Zap className="w-4 h-4" />}
                >
                  {analyzing ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
              {/* Sample URLs */}
              <div className="flex items-center gap-2 mt-3 text-xs text-white/50">
                <span>Try:</span>
                {["fitgearofficial.com", "beautyglowlab.com", "smarthomestore.io"].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setUrl(sample)}
                    className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard label="Stores Analyzed" value="1,284" change="+24.5%" trend="up" icon={Globe} index={0} />
          <StatsCard label="Products Scraped" value="38,472" change="+18.2%" trend="up" icon={Target} index={1} />
          <StatsCard label="Competitor Alerts" value="12" change="+3" trend="up" icon={AlertTriangle} index={2} />
          <StatsCard label="Avg Store Score" value="68.4" change="+2.1%" trend="up" icon={TrendingUp} index={3} />
        </div>

        {/* Analyzed Competitors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleCompetitors.map((comp, i) => (
            <CompetitorAnalysisCard key={i} competitor={comp} index={i} />
          ))}
        </div>

        {/* Competitive Insights */}
        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 bg-white border border-[#E8E0D6]"
          >
            <h3 className="font-display font-bold text-[#3A2A22] text-sm mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0F5257]" /> Competitive Insights Report
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#F7F3ED]">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-[#0F5257]" />
                  <span className="text-sm font-semibold text-[#3A2A22]">Top Products</span>
                </div>
                <ul className="space-y-2 text-xs text-[#5A4535]">
                  <li className="flex justify-between"><span>LED Face Mask</span><span className="font-medium text-[#0F5257]">$34.99 avg</span></li>
                  <li className="flex justify-between"><span>Smart Water Bottle</span><span className="font-medium text-[#0F5257]">$29.99 avg</span></li>
                  <li className="flex justify-between"><span>Phone Gripper</span><span className="font-medium text-[#0F5257]">$14.99 avg</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F3ED]">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-sm font-semibold text-[#3A2A22]">Pricing Strategy</span>
                </div>
                <ul className="space-y-2 text-xs text-[#5A4535]">
                  <li className="flex justify-between"><span>Avg Price Point</span><span className="font-medium">$42.50</span></li>
                  <li className="flex justify-between"><span>Price Range</span><span className="font-medium">$14.99 - $89.99</span></li>
                  <li className="flex justify-between"><span>Discount Depth</span><span className="font-medium">15-25% off</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-[#F7F3ED]">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-semibold text-[#3A2A22]">Vulnerabilities</span>
                </div>
                <ul className="space-y-2 text-xs text-[#5A4535]">
                  <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> 3 stores have poor mobile UX</li>
                  <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> 2 stores have slow page loads</li>
                  <li className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Limited payment options</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="glass" size="sm" leftIcon={<ExternalLink className="w-3 h-3" />}>
                Full Competitive Report
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}