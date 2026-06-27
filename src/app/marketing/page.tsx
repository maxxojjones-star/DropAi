"use client";

import { useState, useCallback } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import {
  Sparkles, Image as ImageIcon, FileText, BarChart3,
  Play, Copy, Check, RefreshCw, Download, Send,
  Facebook, Instagram, Globe, Youtube, ChevronDown,
  DollarSign, Eye, MousePointerClick, TrendingUp,
  ShoppingCart, Share2, Settings, AlertCircle,
  Palette, Type, Target,
} from "lucide-react";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";
import { sampleProducts } from "@/data/sampleProducts";

const MARKETING_TABS = [
  { id: "ad-generator", label: "AI Ad Generator", icon: <Play className="w-4 h-4" /> },
  { id: "image-generator", label: "AI Image Generator", icon: <ImageIcon className="w-4 h-4" /> },
  { id: "copywriting", label: "AI Copywriting", icon: <FileText className="w-4 h-4" /> },
  { id: "campaigns", label: "Campaigns", icon: <BarChart3 className="w-4 h-4" /> },
];

const PLATFORMS = [
  { id: "tiktok", label: "TikTok", icon: Play },
  { id: "facebook", label: "Facebook", icon: Facebook },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "google", label: "Google", icon: Globe },
  { id: "youtube", label: "YouTube", icon: Youtube },
];

const AD_FORMATS = ["Image", "Video", "Carousel", "Story"];
const COPY_TYPES = ["Product Description", "Ad Copy", "Email", "SMS", "Social Post"];
const TONES = ["Professional", "Casual", "Luxury", "Youthful", "Authoritative"];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("ad-generator");
  const [selectedProduct, setSelectedProduct] = useState(sampleProducts[0]?.id || "");
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");
  const [selectedFormat, setSelectedFormat] = useState("Image");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [selectedCopyType, setSelectedCopyType] = useState("Product Description");
  const [prompt, setPrompt] = useState("");
  const [imageStyle, setImageStyle] = useState("product_photo");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAd, setGeneratedAd] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [generatedCopy, setGeneratedCopy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAd = useCallback(async () => {
    setIsGenerating(true);
    setGeneratedAd(null);
    const product = sampleProducts.find(p => p.id === selectedProduct);
    await new Promise(r => setTimeout(r, 1500));
    setGeneratedAd(
      `🔥 Don't miss out on the ${product?.title || "ultimate"} product!\n\n` +
      `✨ Premium quality that you deserve\n` +
      `💰 Only ${product ? formatCurrency(product.price) : "$XX.XX"}\n` +
      `⭐ Rated ★★★★★ by thousands\n\n` +
      `👉 Shop now on ${selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}!\n` +
      `#ad #trending #musthave #${selectedPlatform}`
    );
    setIsGenerating(false);
  }, [selectedProduct, selectedPlatform]);

  const handleGenerateImage = useCallback(async () => {
    setIsGenerating(true);
    setGeneratedImages([]);
    await new Promise(r => setTimeout(r, 1800));
    setGeneratedImages([
      `https://picsum.photos/seed/ad-${Date.now()}/800/800`,
      `https://picsum.photos/seed/ad-${Date.now() + 1}/800/800`,
      `https://picsum.photos/seed/ad-${Date.now() + 2}/800/800`,
    ]);
    setIsGenerating(false);
  }, []);

  const handleGenerateCopy = useCallback(async () => {
    setIsGenerating(true);
    setGeneratedCopy(null);
    const product = sampleProducts.find(p => p.id === selectedProduct);
    await new Promise(r => setTimeout(r, 1200));
    setGeneratedCopy(
      `**${product?.title || "Premium Product"}**\n\n` +
      `Experience unmatched quality with our latest product. Designed for those who demand the best, ` +
      `it combines cutting-edge technology with elegant design.\n\n` +
      `**Why choose us?**\n` +
      `✅ Premium materials\n✅ Fast shipping worldwide\n✅ 30-day satisfaction guarantee\n✅ 24/7 customer support\n\n` +
      `**Limited time offer!**\n` +
      `${product ? formatCurrency(product.price) : "$XX.XX"} — Shop now!`
    );
    setIsGenerating(false);
  }, [selectedProduct]);

  const CAMPAIGN_DATA = [
    { name: "Summer Sale 2024", platform: "Facebook", status: "Active", impressions: 125000, clicks: 4200, spend: 3200, revenue: 12800, roas: 4.0 },
    { name: "New Product Launch", platform: "Instagram", status: "Active", impressions: 98000, clicks: 3100, spend: 2500, revenue: 8750, roas: 3.5 },
    { name: "Retargeting Q3", platform: "TikTok", status: "Paused", impressions: 45000, clicks: 1800, spend: 1200, revenue: 3600, roas: 3.0 },
    { name: "Brand Awareness", platform: "Google", status: "Active", impressions: 210000, clicks: 5600, spend: 4800, revenue: 19200, roas: 4.0 },
  ];

  return (
    <DashboardLayout title="Marketing Center">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">AI Marketing Center</h2>
            <p className="text-text-muted mt-1">Generate ads, images, and copy with AI — then track campaign performance</p>
          </div>
          <Badge variant="premium" size="lg" className="flex items-center gap-1">
            <Sparkles className="w-4 h-4" /> Powered by AI
          </Badge>
        </motion.div>

        <Tabs tabs={MARKETING_TABS} activeTab={activeTab} onTabChange={setActiveTab} variant="pills" />

        {/* === AI Ad Generator === */}
        <TabPanel tabId="ad-generator" activeTab={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Play className="w-4 h-4 text-brand-500" /> Ad Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Product</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-surface-elevated border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {sampleProducts.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Platform</label>
                  <div className="grid grid-cols-5 gap-2">
                    {PLATFORMS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPlatform(p.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs transition-all ${
                          selectedPlatform === p.id
                            ? "bg-brand-500 text-white shadow-lg"
                            : "bg-surface-100 dark:bg-surface-800 text-text-muted hover:text-text-primary"
                        }`}
                      >
                        <p.icon className="w-4 h-4" />
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Ad Format</label>
                  <div className="flex gap-2">
                    {AD_FORMATS.map(f => (
                      <button
                        key={f}
                        onClick={() => setSelectedFormat(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedFormat === f
                            ? "bg-brand-500 text-white"
                            : "bg-surface-100 dark:bg-surface-800 text-text-muted hover:text-text-primary"
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Tone</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-surface-elevated border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                  >
                    {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  isFullWidth
                  onClick={handleGenerateAd}
                  isLoading={isGenerating}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Generate Ad
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Eye className="w-4 h-4 text-brand-500" /> Ad Preview</CardTitle>
                {generatedAd && (
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="xs" onClick={() => handleCopy(generatedAd)}>
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="xs"><Download className="w-4 h-4" /></Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {generatedAd ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 border border-brand-500/20">
                      <pre className="whitespace-pre-wrap text-sm text-text-primary font-sans">{generatedAd}</pre>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>{selectedFormat} format</span>
                      <span>{selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}</span>
                      <span>{selectedTone} tone</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-text-muted">
                    <Play className="w-12 h-12 mb-3 opacity-30" />
                    <p>Configure your ad and click Generate</p>
                    <p className="text-xs mt-1">AI will create optimized copy for your product</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        {/* === AI Image Generator === */}
        <TabPanel tabId="image-generator" activeTab={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ImageIcon className="w-4 h-4 text-brand-500" /> Image Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Image Description"
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  leftIcon={<ImageIcon className="w-4 h-4" />}
                />

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "product_photo", label: "Product Photo", icon: ImageIcon },
                      { id: "lifestyle", label: "Lifestyle", icon: Target },
                      { id: "white_background", label: "White BG", icon: Palette },
                      { id: "marketing", label: "Marketing", icon: Share2 },
                    ].map(s => (
                      <button
                        key={s.id}
                        onClick={() => setImageStyle(s.id)}
                        className={`flex items-center gap-2 p-3 rounded-xl text-xs font-medium transition-all ${
                          imageStyle === s.id
                            ? "bg-brand-500 text-white shadow-lg"
                            : "bg-surface-100 dark:bg-surface-800 text-text-muted hover:text-text-primary"
                        }`}
                      >
                        <s.icon className="w-4 h-4" />
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  isFullWidth
                  onClick={handleGenerateImage}
                  isLoading={isGenerating}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Generate Images
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Images</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {generatedImages.map((url, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="aspect-square rounded-xl bg-gradient-to-br from-brand-500/10 to-cyan-500/10 flex items-center justify-center overflow-hidden group relative"
                      >
                        <ImageIcon className="w-8 h-8 text-brand-500/30" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button variant="ghost" size="xs" className="text-white"><Download className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="xs" className="text-white"><Copy className="w-4 h-4" /></Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-text-muted">
                    <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
                    <p>AI will generate images here</p>
                    <p className="text-xs mt-1">Powered by DALL-E 3</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        {/* === AI Copywriting === */}
        <TabPanel tabId="copywriting" activeTab={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="w-4 h-4 text-brand-500" /> Copy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Product</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-surface-elevated border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {sampleProducts.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Copy Type</label>
                  <div className="flex flex-wrap gap-2">
                    {COPY_TYPES.map(ct => (
                      <button
                        key={ct}
                        onClick={() => setSelectedCopyType(ct)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          selectedCopyType === ct
                            ? "bg-brand-500 text-white"
                            : "bg-surface-100 dark:bg-surface-800 text-text-muted hover:text-text-primary"
                        }`}
                      >
                        {ct}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Tone</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-surface-elevated border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                  >
                    {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <Button
                  variant="gradient"
                  size="lg"
                  isFullWidth
                  onClick={handleGenerateCopy}
                  isLoading={isGenerating}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Generate Copy
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                {generatedCopy && (
                  <Button variant="ghost" size="xs" onClick={() => handleCopy(generatedCopy)}>
                    {copied ? <><Check className="w-4 h-4 text-emerald-500" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {generatedCopy ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="p-4 rounded-xl bg-surface-100 dark:bg-surface-800">
                      <pre className="whitespace-pre-wrap text-sm text-text-primary font-sans">{generatedCopy}</pre>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-text-muted">
                      <Badge variant="info" size="sm">{selectedCopyType}</Badge>
                      <Badge variant="default" size="sm">{selectedTone}</Badge>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-text-muted">
                    <FileText className="w-12 h-12 mb-3 opacity-30" />
                    <p>AI-generated copy will appear here</p>
                    <p className="text-xs mt-1">Choose type and tone, then generate</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        {/* === Campaigns === */}
        <TabPanel tabId="campaigns" activeTab={activeTab}>
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Total Spend", value: "$11,700", change: "+12.5%", icon: DollarSign, color: "text-emerald-500" },
                { label: "Impressions", value: "478K", change: "+8.3%", icon: Eye, color: "text-blue-500" },
                { label: "Clicks", value: "14.7K", change: "+15.2%", icon: MousePointerClick, color: "text-purple-500" },
                { label: "Avg. ROAS", value: "3.6x", change: "+5.8%", icon: TrendingUp, color: "text-brand-500" },
              ].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card glass>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        <span className="text-xs text-emerald-500 font-medium">{stat.change}</span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                      <p className="text-xs text-text-muted">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Campaign Table */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-text-muted font-medium">Campaign</th>
                        <th className="text-left py-3 px-2 text-text-muted font-medium">Platform</th>
                        <th className="text-left py-3 px-2 text-text-muted font-medium">Status</th>
                        <th className="text-right py-3 px-2 text-text-muted font-medium">Impressions</th>
                        <th className="text-right py-3 px-2 text-text-muted font-medium">Clicks</th>
                        <th className="text-right py-3 px-2 text-text-muted font-medium">Spend</th>
                        <th className="text-right py-3 px-2 text-text-muted font-medium">Revenue</th>
                        <th className="text-right py-3 px-2 text-text-muted font-medium">ROAS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CAMPAIGN_DATA.map((c, i) => (
                        <tr key={i} className="border-b border-border hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                          <td className="py-3 px-2 font-medium text-text-primary">{c.name}</td>
                          <td className="py-3 px-2 text-text-secondary">{c.platform}</td>
                          <td className="py-3 px-2">
                            <Badge variant={c.status === "Active" ? "success" : "warning"} size="sm">{c.status}</Badge>
                          </td>
                          <td className="py-3 px-2 text-right text-text-primary">{formatCompactNumber(c.impressions)}</td>
                          <td className="py-3 px-2 text-right text-text-primary">{formatCompactNumber(c.clicks)}</td>
                          <td className="py-3 px-2 text-right text-text-primary">{formatCurrency(c.spend)}</td>
                          <td className="py-3 px-2 text-right text-text-primary">{formatCurrency(c.revenue)}</td>
                          <td className="py-3 px-2 text-right">
                            <span className="font-semibold text-emerald-500">{c.roas}x</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>
      </div>
    </DashboardLayout>
  );
}