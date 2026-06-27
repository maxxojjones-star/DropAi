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
  Search, TrendingUp, Sparkles, Star, Package, Filter,
  Download, ShoppingCart, ExternalLink, Eye, Heart,
  Share2, ChevronUp, ChevronDown, Globe, BarChart3,
  AlertTriangle, CheckCircle, Clock, RefreshCw,
  Zap, ThumbsUp, MessageCircle, Activity,
  DollarSign, Users, Target, ArrowRight,
} from "lucide-react";
import { formatCurrency, formatCompactNumber, formatPercentage } from "@/lib/utils";
import { sampleProducts } from "@/data/sampleProducts";
import { sampleTrends, sampleViralSignals } from "@/data/sampleTrends";
import { calculateProductScore } from "@/services/ai/productResearch";
import { getScoreLabel, getScoreColor, getDetailedBreakdown } from "@/services/ai/productScoring";
import type { ProductResearchResult, TrendData } from "@/types/ai";

const RESEARCH_TABS = [
  { id: "viral", label: "Viral Finder", icon: <Zap className="w-4 h-4" /> },
  { id: "winning", label: "Winning Products", icon: <Star className="w-4 h-4" /> },
  { id: "trends", label: "Trend Detection", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "analysis", label: "Product Analysis", icon: <BarChart3 className="w-4 h-4" /> },
];

export default function ProductResearchPage() {
  const [activeTab, setActiveTab] = useState("viral");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(sampleProducts);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductResearchResult | null>(null);

  const handleSearch = useCallback(async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const filtered = sampleProducts.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).map(p => ({ ...p, score: calculateProductScore(p) }));
      setProducts(filtered.length > 0 ? filtered : sampleProducts);
      setIsAnalyzing(false);
    }, 800);
  }, [searchQuery]);

  return (
    <DashboardLayout title="Product Research">
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">AI Product Research</h2>
            <p className="text-text-muted mt-1">Discover trending, high-margin products using AI-powered analysis</p>
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Input
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <Button variant="primary" onClick={handleSearch} isLoading={isAnalyzing} leftIcon={<Sparkles className="w-4 h-4" />}>
              Analyze
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs tabs={RESEARCH_TABS} activeTab={activeTab} onTabChange={setActiveTab} variant="pills" />

        {/* === Viral Finder Tab === */}
        <TabPanel tabId="viral" activeTab={activeTab}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Trending Viral Products</h3>
                <p className="text-sm text-text-muted">AI-detected viral signals from social platforms</p>
              </div>
              <Button variant="ghost" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />}>Refresh</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.filter(p => p.score.trendScore >= 75).map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card hover glass className="overflow-hidden group" onClick={() => setSelectedProduct(product)}>
                    <CardContent className="p-0">
                      <div className="relative h-40 bg-gradient-to-br from-brand-500/10 to-cyan-500/10 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent" />
                        <Package className="w-12 h-12 text-brand-500/30" />
                        <Badge variant="premium" size="sm" className="absolute top-3 left-3">
                          <Zap className="w-3 h-3" /> Viral
                        </Badge>
                        {product.score.trendScore >= 90 && (
                          <Badge variant="success" size="sm" className="absolute top-3 right-3">
                            <TrendingUp className="w-3 h-3" /> Trending
                          </Badge>
                        )}
                      </div>
                      <div className="p-4 space-y-3">
                        <h4 className="font-semibold text-text-primary text-sm line-clamp-1">{product.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="info" size="sm">{product.category}</Badge>
                          <span className="text-sm font-medium text-emerald-500">{product.profitMargin.toFixed(0)}% margin</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white text-xs font-bold">
                              {product.score.overall}
                            </div>
                            <span className="text-xs text-text-muted">AI Score</span>
                          </div>
                          <span className="text-lg font-bold text-text-primary">{formatCurrency(product.price)}</span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center gap-3 text-xs text-text-muted">
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {Math.round(product.score.demandScore * 1200)}</span>
                            <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {Math.round(product.score.trendScore * 80)}</span>
                          </div>
                          <Button variant="secondary" size="xs" leftIcon={<ShoppingCart className="w-3 h-3" />}>Import</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabPanel>

        {/* === Winning Products Tab === */}
        <TabPanel tabId="winning" activeTab={activeTab}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Winning Products</h3>
                <p className="text-sm text-text-muted">Profit-optimized product suggestions with AI analysis</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
                <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...products].sort((a, b) => b.score.overall - a.score.overall).map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card hover className="overflow-hidden" onClick={() => setSelectedProduct(product)}>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-text-primary text-sm line-clamp-1">{product.title}</h4>
                          <Badge variant="info" size="sm" className="mt-1">{product.category}</Badge>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-lg font-bold text-text-primary">{formatCurrency(product.price)}</span>
                          <span className="text-xs text-emerald-500 font-medium">{product.profitMargin.toFixed(0)}% margin</span>
                        </div>
                      </div>

                      {/* AI Score Breakdown */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500" style={{ width: `${product.score.overall}%` }} />
                          </div>
                          <span className="text-sm font-bold text-brand-500">{product.score.overall}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {[
                            { label: "Demand", value: product.score.demandScore },
                            { label: "Competition", value: product.score.competitionScore },
                            { label: "Profit", value: product.score.profitScore },
                          ].map(s => (
                            <div key={s.label} className="text-center p-1.5 rounded-lg bg-surface-100 dark:bg-surface-800">
                              <div className="text-text-secondary">{s.label}</div>
                              <div className="font-semibold text-text-primary">{s.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <span>Cost: {formatCurrency(product.cost)}</span>
                        </div>
                        <Button variant="primary" size="sm" leftIcon={<ShoppingCart className="w-3 h-3" />} className="text-xs">Import to Store</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabPanel>

        {/* === Trend Detection Tab === */}
        <TabPanel tabId="trends" activeTab={activeTab}>
          <div className="space-y-6">
            {/* Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleViralSignals.map((signal, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card glass hover>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-text-primary">{signal.platform}</h4>
                          <p className="text-xs text-text-muted">Signal Strength: {signal.strength}%</p>
                        </div>
                      </div>
                      <p className="text-sm text-text-primary">{signal.signal}</p>
                      <div className="space-y-1">
                        {signal.evidence.map((ev, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-text-muted">
                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                            {ev}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-border">
                        <div className="flex-1 h-2 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500" style={{ width: `${signal.strength}%` }} />
                        </div>
                        <span className="text-xs font-medium">{signal.strength}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Trend Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Trend Timeline</CardTitle>
                <CardDescription>Product popularity across platforms over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleTrends.slice(0, 6).map((trend, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-gradient-brand-subtle flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-brand-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary capitalize">{trend.query}</p>
                        <p className="text-xs text-text-muted">on {trend.platform}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={trend.direction === "rising" ? "success" : trend.direction === "falling" ? "error" : "warning"} size="sm">
                          {trend.direction === "rising" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          {trend.direction}
                        </Badge>
                        <span className="text-sm text-text-muted">{formatCompactNumber(trend.volume)}</span>
                        <span className="text-xs text-brand-500 font-medium">+{trend.velocity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabPanel>

        {/* === Product Analysis Tab === */}
        <TabPanel tabId="analysis" activeTab={activeTab}>
          <div className="space-y-6">
            <Card glass>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter product name or URL to analyze..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      leftIcon={<Search className="w-4 h-4" />}
                    />
                  </div>
                  <Button variant="primary" onClick={handleSearch} isLoading={isAnalyzing} leftIcon={<BarChart3 className="w-4 h-4" />}>
                    Analyze Product
                  </Button>
                </div>
              </CardContent>
            </Card>

            {selectedProduct && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-text-primary">{selectedProduct.title}</h3>
                        <Badge variant="info" size="sm" className="mt-1">{selectedProduct.category}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-brand-500">{selectedProduct.score.overall}</div>
                        <div className="text-xs text-text-muted">AI Score</div>
                      </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {getDetailedBreakdown(selectedProduct.score).map((item) => (
                        <div key={item.label} className="text-center p-3 rounded-xl bg-surface-100 dark:bg-surface-800">
                          <div className="text-lg font-bold" style={{ color: getScoreColor(item.value) }}>{item.value}</div>
                          <div className="text-xs text-text-muted mt-1">{item.label}</div>
                          <div className="text-xs text-text-secondary">{(item.weight * 100).toFixed(0)}%</div>
                        </div>
                      ))}
                    </div>

                    {/* Competition & Demand */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card glass>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2"><Target className="w-4 h-4 text-brand-500" /> Demand Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex justify-between"><span className="text-text-muted">Current Demand</span><span className="font-medium">{selectedProduct.demandForecast.currentDemand}/100</span></div>
                          <div className="flex justify-between"><span className="text-text-muted">Projected Growth</span><span className="font-medium text-emerald-500">{selectedProduct.demandForecast.growthRate}%</span></div>
                          <div className="flex justify-between"><span className="text-text-muted">Peak Months</span><span className="font-medium">{selectedProduct.demandForecast.peakMonths.join(", ")}</span></div>
                          <div className="flex justify-between"><span className="text-text-muted">Confidence</span><span className="font-medium">{(selectedProduct.demandForecast.confidence * 100).toFixed(0)}%</span></div>
                        </CardContent>
                      </Card>

                      <Card glass>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2"><Users className="w-4 h-4 text-brand-500" /> Competition Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedProduct.competitors.length > 0 ? (
                            <div className="space-y-3">
                              {selectedProduct.competitors.map((comp, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-surface-100 dark:bg-surface-800">
                                  <div>
                                    <p className="text-sm font-medium">{comp.name}</p>
                                    <p className="text-xs text-text-muted">{comp.estimatedSales.toLocaleString()} sales</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium">{formatCurrency(comp.price)}</p>
                                    <p className="text-xs text-text-muted">{comp.rating} ★ ({comp.reviewCount})</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-text-muted">No direct competitors detected</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* AI Recommendations */}
                    <Card className="border-brand-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-500" /> AI Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { text: `Price at ${formatCurrency(selectedProduct.price)} - ${selectedProduct.profitMargin.toFixed(0)}% margin is excellent`, type: "success" },
                            { text: `Demand score of ${selectedProduct.score.demandScore} indicates strong market interest`, type: "success" },
                            { text: selectedProduct.score.competitionScore < 70 ? "Consider differentiating from competitors with unique branding" : "Competition levels are manageable", type: selectedProduct.score.competitionScore < 70 ? "warning" : "success" },
                            { text: `Trend score of ${selectedProduct.score.trendScore} - ${selectedProduct.score.trendScore >= 80 ? "strong upward momentum" : "moderate interest levels"}`, type: selectedProduct.score.trendScore >= 80 ? "success" : "info" },
                          ].map((rec, i) => (
                            <div key={i} className={`flex items-start gap-2 p-3 rounded-xl text-sm ${
                              rec.type === "success" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" :
                              rec.type === "warning" ? "bg-amber-500/10 text-amber-700 dark:text-amber-400" :
                              "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                            }`}>
                              {rec.type === "success" ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> :
                               rec.type === "warning" ? <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> :
                               <Activity className="w-4 h-4 mt-0.5 shrink-0" />}
                              {rec.text}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="primary" leftIcon={<ShoppingCart className="w-4 h-4" />}>Import Product to Store</Button>
                        <Button variant="secondary" leftIcon={<ExternalLink className="w-4 h-4" />}>View Full Analysis</Button>
                      </CardFooter>
                    </Card>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </TabPanel>
      </div>
    </DashboardLayout>
  );
}