"use client";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Target, Eye, Star, Download, ShoppingBag, Clock, TrendingUp, DollarSign, Filter, Globe, Sparkles, Users, Zap, BarChart3, ArrowUpRight, ChevronDown } from "lucide-react";

const TABS = [
  { id: "shops", label: "Shop Library", icon: ShoppingBag },
  { id: "ads", label: "Ad Library", icon: Target },
  { id: "advertisers", label: "Advertiser Tracker", icon: Eye },
  { id: "portfolio", label: "Weekly Portfolio", icon: Star },
];

const SHOPS = [
  { name: "FitGear Official", revenue: "$187K/mo", products: 43, niche: "Fitness", platform: "TikTok Shop", growth: "+24%", score: 87, country: "US" },
  { name: "SmartHome Store", revenue: "$94K/mo", products: 28, niche: "Tech", platform: "Shopify", growth: "+15%", score: 72, country: "US" },
  { name: "EcoLiving Co", revenue: "$76K/mo", products: 19, niche: "Home & Garden", platform: "TikTok Shop", growth: "+8%", score: 65, country: "UK" },
  { name: "BeautyGlow Lab", revenue: "$142K/mo", products: 56, niche: "Beauty", platform: "Facebook Shop", growth: "+31%", score: 91, country: "US" },
  { name: "PetParadise", revenue: "$51K/mo", products: 22, niche: "Pets", platform: "Shopify", growth: "+12%", score: 68, country: "CA" },
  { name: "TechTrendz", revenue: "$203K/mo", products: 67, niche: "Electronics", platform: "TikTok Shop", growth: "+42%", score: 94, country: "US" },
  { name: "LuxeHome Co", revenue: "$118K/mo", products: 34, niche: "Home Decor", platform: "Instagram", growth: "+19%", score: 78, country: "US" },
  { name: "GreenLeaf Organics", revenue: "$63K/mo", products: 15, niche: "Wellness", platform: "Shopify", growth: "+27%", score: 82, country: "AU" },
  { name: "StyleSwift", revenue: "$156K/mo", products: 48, niche: "Fashion", platform: "TikTok Shop", growth: "+35%", score: 88, country: "US" },
];

const ADS = [
  { brand: "FitGear Pro", headline: "Your workout, upgraded. 50% off first month", platform: "TikTok", spend: "$12,400", impressions: "245K", ctr: "3.2%", engagement: "124K", objective: "Conversions", status: "active", creative: "Video" },
  { brand: "SmartHome Co", headline: "Control with your voice. See it in action", platform: "Facebook", spend: "$8,900", impressions: "189K", ctr: "2.8%", engagement: "89K", objective: "Traffic", status: "active", creative: "Carousel" },
  { brand: "GlowUp Beauty", headline: "10-sec morning routine that changed my skin", platform: "TikTok", spend: "$21,300", impressions: "640K", ctr: "5.6%", engagement: "340K", objective: "Conversions", status: "active", creative: "Video" },
  { brand: "TechHub", headline: "The future is completely wireless. Watch the demo", platform: "Instagram", spend: "$15,800", impressions: "410K", ctr: "3.8%", engagement: "210K", objective: "Brand Awareness", status: "active", creative: "Reel" },
  { brand: "HomeFit", headline: "Your home gym, delivered in one box", platform: "TikTok", spend: "$9,600", impressions: "198K", ctr: "4.3%", engagement: "98K", objective: "Conversions", status: "active", creative: "Video" },
  { brand: "LuxeHome", headline: "Premium living starts with the right details", platform: "Facebook", spend: "$11,200", impressions: "234K", ctr: "3.5%", engagement: "134K", objective: "Traffic", status: "paused", creative: "Image" },
  { brand: "EcoWear", headline: "Sustainable fashion that actually looks good", platform: "Instagram", spend: "$18,700", impressions: "512K", ctr: "4.1%", engagement: "278K", objective: "Conversions", status: "active", creative: "Reel" },
  { brand: "PetPulse", headline: "Track your pet's health in real-time", platform: "TikTok", spend: "$7,400", impressions: "156K", ctr: "2.9%", engagement: "67K", objective: "Traffic", status: "active", creative: "Video" },
];

const ADVERTISERS = [
  { name: "FitGear Pro", platform: "Facebook", ads: 24, spend: "$187K", followers: "1.2M", avgCTR: "3.8%", niche: "Fitness", topProduct: "Smart Watch" },
  { name: "SmartHome Co", platform: "TikTok", ads: 18, spend: "$94K", followers: "890K", avgCTR: "4.2%", niche: "Tech", topProduct: "Smart Plug" },
  { name: "BeautyGlow", platform: "TikTok", ads: 42, spend: "$312K", followers: "3.4M", avgCTR: "5.1%", niche: "Beauty", topProduct: "LED Mask" },
  { name: "TechTrendz", platform: "Facebook", ads: 15, spend: "$78K", followers: "456K", avgCTR: "3.5%", niche: "Electronics", topProduct: "Neck Fan" },
  { name: "EcoLiving Co", platform: "Instagram", ads: 28, spend: "$145K", followers: "2.1M", avgCTR: "4.6%", niche: "Home", topProduct: "Bamboo Set" },
  { name: "LuxeHome", platform: "TikTok", ads: 31, spend: "$203K", followers: "1.8M", avgCTR: "3.9%", niche: "Decor", topProduct: "LED Strip" },
];

const PICKS = [
  { name: "Smart Water Bottle", revenue: "$8,940", margin: "67%", reason: "Viral on TikTok — 2.4M views", trend: "🔥", score: 92 },
  { name: "LED Neck Massager", revenue: "$6,720", margin: "72%", reason: "Low competition, high demand", trend: "📈", score: 88 },
  { name: "Phone Lens Kit", revenue: "$4,560", margin: "81%", reason: "High margin, repeat purchases", trend: "⭐", score: 85 },
  { name: "Cable Organizer Kit", revenue: "$3,240", margin: "76%", reason: "Universal problem, viral potential", trend: "📈", score: 79 },
  { name: "Car Air Freshener Pro", revenue: "$5,180", margin: "84%", reason: "Low cost, high perceived value", trend: "🔥", score: 86 },
  { name: "Resistance Bands Set", revenue: "$4,890", margin: "79%", reason: "Evergreen fitness demand", trend: "⭐", score: 74 },
  { name: "UV Sanitizer Wand", revenue: "$7,320", margin: "73%", reason: "Health trend momentum", trend: "📈", score: 83 },
  { name: "Phone Stand Holder", revenue: "$2,980", margin: "88%", reason: "Ultra-low cost, high volume", trend: "🔥", score: 81 },
];

export default function ResearchHubPage() {
  const [tab, setTab] = useState("shops");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("revenue");

  const filteredShops = SHOPS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.niche.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAds = ADS.filter(a => a.brand.toLowerCase().includes(searchQuery.toLowerCase()) || a.headline.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredAdvertisers = ADVERTISERS.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.niche.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPicks = PICKS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <DashboardLayout title="Research Hub" breadcrumbs={[{ label: "Research Hub" }]}>
      <div className="space-y-6 animate-fade-in">
        {/* Tab Navigation */}
        <div className="flex gap-2 flex-wrap">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === t.id ? "bg-[#0F5257] text-white shadow-premium" : "bg-white text-[#5A4535] border border-[#E8E0D6] hover:border-[#D4AF37]"
              }`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7A6A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${tab === "shops" ? "shops, niches..." : tab === "ads" ? "brands, headlines..." : tab === "advertisers" ? "advertisers..." : "products..."}`}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#E8E0D6] bg-white text-[#3A2A22] placeholder:text-[#8B7A6A] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8B7A6A]">
            <Filter className="w-3 h-3" /> Sort:
            {["revenue", "growth", "score"].map((s) => (
              <button key={s} onClick={() => setSortBy(s)}
                className={`px-2 py-1 rounded-lg transition-all capitalize ${
                  sortBy === s ? "bg-[#0F5257] text-white" : "bg-white text-[#5A4535] border border-[#E8E0D6]"
                }`}>{s}</button>
            ))}
          </div>
          <Badge variant="outline" className="flex items-center gap-1 text-[10px]">
            <Clock className="w-3 h-3" /> Updated 2h ago
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          {/* Shop Library */}
          {tab === "shops" && (
            <motion.div key="shops" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredShops.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                  className="rounded-2xl p-5 bg-white border border-[#E8E0D6] hover:shadow-premium-lg hover:border-[#D4AF37]/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-lg text-[#3A2A22] group-hover:text-[#0F5257] transition-colors">{s.name}</h3>
                        <span className="text-[10px] text-[#8B7A6A]">{s.country}</span>
                      </div>
                      <p className="text-xs text-[#5A4535]">{s.niche}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] whitespace-nowrap">{s.platform}</Badge>
                  </div>
                  <div className="flex gap-3 text-sm text-[#5A4535] mb-3">
                    <span>💰 <strong className="text-[#0F5257]">{s.revenue}</strong></span>
                    <span>📦 {s.products}</span>
                    <span className="text-emerald-600 flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />{s.growth}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-1.5 rounded-full bg-[#F0ECE6]">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#0F5257] to-[#D4AF37]" style={{ width: `${s.score}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-[#0F5257]">{s.score}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-[#0F5257] text-[#0F5257] hover:bg-[#0F5257] hover:text-white transition-all">
                    <Eye className="w-3 h-3 mr-1" /> Analyze Store
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Ad Library */}
          {tab === "ads" && (
            <motion.div key="ads" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredAds.map((ad, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="rounded-2xl p-5 bg-white border border-[#E8E0D6] hover:shadow-premium-lg hover:border-[#D4AF37]/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-brand-subtle flex items-center justify-center text-sm font-bold text-[#0F5257]">{ad.brand.charAt(0)}</div>
                      <div>
                        <span className="text-xs font-semibold text-[#3A2A22]">{ad.brand}</span>
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary" size="sm" className="text-[9px]">{ad.platform}</Badge>
                          <span className="text-[9px] text-[#8B7A6A]">{ad.creative}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={ad.status === "active" ? "success" : "warning"} size="sm" className="text-[9px]">{ad.status}</Badge>
                  </div>
                  <p className="font-semibold text-[#3A2A22] text-sm mb-3 leading-snug line-clamp-2">&ldquo;{ad.headline}&rdquo;</p>
                  <div className="grid grid-cols-4 gap-1.5 py-2 border-t border-[#E8E0D6]">
                    <div className="text-center"><span className="text-[10px] font-bold text-[#0F5257] block">{ad.spend}</span><span className="text-[8px] text-[#8B7A6A]">Spend</span></div>
                    <div className="text-center"><span className="text-[10px] font-bold text-[#3A2A22] block">{ad.impressions}</span><span className="text-[8px] text-[#8B7A6A]">Impr.</span></div>
                    <div className="text-center"><span className="text-[10px] font-bold text-[#D4AF37] block">{ad.ctr}</span><span className="text-[8px] text-[#8B7A6A]">CTR</span></div>
                    <div className="text-center"><span className="text-[10px] font-bold text-[#5A4535] block">{ad.engagement}</span><span className="text-[8px] text-[#8B7A6A]">Eng.</span></div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[9px] text-[#8B7A6A]">{ad.objective}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="xs" className="text-[#0F5257] p-1"><Eye className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="xs" className="text-[#0F5257] p-1"><Download className="w-3 h-3" /></Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Advertiser Tracker */}
          {tab === "advertisers" && (
            <motion.div key="advertisers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAdvertisers.map((adv, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="rounded-2xl p-5 bg-white border border-[#E8E0D6] hover:shadow-premium-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-white font-bold">{adv.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-[#3A2A22] truncate">{adv.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-[#8B7A6A]">
                        <Users className="w-3 h-3" /> {adv.followers} followers
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{adv.platform}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="bg-[#F7F3ED] rounded-xl p-2.5">
                      <span className="font-bold text-[#0F5257] block">{adv.ads}</span>
                      <span className="text-[9px] text-[#8B7A6A]">Active Ads</span>
                    </div>
                    <div className="bg-[#F7F3ED] rounded-xl p-2.5">
                      <span className="font-bold text-[#D4AF37] block">{adv.spend}</span>
                      <span className="text-[9px] text-[#8B7A6A]">Est. Spend</span>
                    </div>
                    <div className="bg-[#F7F3ED] rounded-xl p-2.5">
                      <span className="font-bold text-[#3A2A22] block">{adv.avgCTR}</span>
                      <span className="text-[9px] text-[#8B7A6A]">Avg CTR</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8B7A6A]">🏷️ {adv.niche}</span>
                    <span className="text-[#3A2A22]">Top: <strong>{adv.topProduct}</strong></span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 bg-[#0F5257] text-white hover:bg-[#0C4246]"><Eye className="w-3 h-3" /> Follow</Button>
                    <Button variant="outline" size="sm" className="border-[#E8E0D6]"><BarChart3 className="w-3 h-3" /></Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Weekly Portfolio */}
          {tab === "portfolio" && (
            <motion.div key="portfolio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#5A4535]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] inline mr-1" />
                  AI-curated winning products — updated weekly with margin analysis and trend data.
                </p>
                <Button variant="glass" size="sm" leftIcon={<Download className="w-3 h-3" />}>Export All</Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredPicks.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="rounded-2xl p-5 bg-white border border-[#E8E0D6] hover:shadow-premium-lg hover:border-[#D4AF37]/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">{p.trend}</span>
                        <Badge variant="premium" size="sm" className="text-[9px] bg-[#D4AF37]/10 text-[#D4AF37]">Pick of Week</Badge>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        p.score >= 85 ? "bg-emerald-50 text-emerald-600" : p.score >= 75 ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-500"
                      }`}>{p.score}</div>
                    </div>
                    <h4 className="font-display font-bold text-[#3A2A22] group-hover:text-[#0F5257] transition-colors">{p.name}</h4>
                    <p className="text-xs text-[#5A4535] mt-1 leading-snug">{p.reason}</p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-[#F7F3ED] rounded-xl p-2.5 text-center">
                        <span className="font-bold text-[#0F5257] block">{p.revenue}</span>
                        <span className="text-[9px] text-[#8B7A6A]">Revenue</span>
                      </div>
                      <div className="bg-[#F7F3ED] rounded-xl p-2.5 text-center">
                        <span className="font-bold text-[#D4AF37] block">{p.margin}</span>
                        <span className="text-[9px] text-[#8B7A6A]">Margin</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="flex-1 bg-[#0F5257] text-white hover:bg-[#0C4246]"><Download className="w-3 h-3" /> Import</Button>
                      <Button variant="outline" size="sm" className="border-[#E8E0D6]"><ArrowUpRight className="w-3 h-3" /></Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}