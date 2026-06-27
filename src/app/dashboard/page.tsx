"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart, Eye, Activity,
  ArrowUpRight, MoreHorizontal, Package, Users, Sparkles, Target,
  Zap, AlertTriangle, CheckCircle, Clock, LineChart, BarChart3,
  RefreshCw, Lightbulb, ShoppingBag, CreditCard, Truck,
} from "lucide-react";
import { formatCurrency, formatCompactNumber, formatPercentage, timeAgo } from "@/lib/utils";
import { sampleAnalytics, monthlyAnalytics, performanceMetrics, scoreDistribution } from "@/data/sampleAnalytics";
import { getRecommendations } from "@/services/ai/businessCoach";
import { sampleProducts } from "@/data/sampleProducts";
import type { BusinessCoachRecommendation } from "@/types/ai";

export default function DashboardPage() {
  const [recommendations, setRecommendations] = useState<BusinessCoachRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const recs = await getRecommendations({ revenue: 48290, products: 47, orders: 156, adSpend: 3200 });
      setRecommendations(recs);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card glass>
                <CardContent>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-brand-subtle flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-brand-500" />
                    </div>
                    <Badge variant={stat.trend === "up" ? "success" : "error"} size="sm">
                      {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  <p className="text-sm text-text-muted mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart with AI Analysis */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-500" /> Revenue & Profit Overview</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="success" size="sm">+{monthlyAnalytics[monthlyAnalytics.length-1].revenue - monthlyAnalytics[0].revenue > 0 ? "23.5" : "0"}% vs last year</Badge>
                <Button variant="ghost" size="sm" rightIcon={<MoreHorizontal className="w-4 h-4" />}>This Year</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <div className="flex items-end gap-2 h-[240px]">
                  {monthlyAnalytics.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                      <div className="w-full relative flex flex-col items-center justify-end h-full">
                        {/* Profit bar */}
                        <div
                          className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-sm transition-all hover:opacity-80 cursor-pointer"
                          style={{ height: `${(m.revenue * 0.35 / 35000) * 100}%` }}
                        />
                        {/* Revenue bar */}
                        <div
                          className="w-full bg-gradient-to-t from-brand-500 to-cyan-400 rounded-t-sm transition-all hover:opacity-80 cursor-pointer -mt-1"
                          style={{ height: `${(m.revenue / 35000) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-text-muted">{m.month}</span>
                      {/* Tooltip on hover */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-surface-elevated border border-border rounded-lg px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-10">
                        <div className="text-text-primary font-medium">${formatCompactNumber(m.revenue)}</div>
                        <div className="text-emerald-500">{m.products} products</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-brand-500" /> Revenue</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500" /> Profit (est.)</div>
                  <div className="flex-1 text-right">Avg. Score: {sampleAnalytics.averageScore}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations Panel */}
          <Card glass glow>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                AI Recommendations
              </CardTitle>
              <Button variant="ghost" size="xs" onClick={() => setIsLoading(true)}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse p-3 rounded-xl bg-surface-100 dark:bg-surface-800">
                      <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {recommendations.slice(0, 4).map((rec, i) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 rounded-xl bg-gradient-brand-subtle border border-brand-500/10"
                    >
                      <div className="flex items-start gap-2">
                        <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                          rec.priority === "critical" ? "bg-red-500" :
                          rec.priority === "high" ? "bg-amber-500" :
                          rec.priority === "medium" ? "bg-blue-500" : "bg-green-500"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-text-primary">{rec.title}</p>
                            <Badge variant={
                              rec.priority === "critical" ? "error" :
                              rec.priority === "high" ? "warning" : "info"
                            } size="sm">{rec.priority}</Badge>
                          </div>
                          <p className="text-xs text-text-muted mt-1">{rec.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="default" size="sm">{rec.category}</Badge>
                            <span className="text-[10px] text-text-muted">{rec.impact}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <Button variant="ghost" size="sm" isFullWidth rightIcon={<ArrowUpRight className="w-3 h-3" />}>
                    View All Recommendations
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Products with AI Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Package className="w-4 h-4 text-brand-500" /> Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleProducts.slice(0, 5).map((product, i) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-text-muted w-6">{String(i + 1).padStart(2, "0")}</span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-brand-subtle flex items-center justify-center">
                      <Package className="w-5 h-5 text-brand-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{product.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-text-muted">{formatCurrency(product.price)}</span>
                        <Badge variant="success" size="sm">{product.profitMargin.toFixed(0)}%</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <div className="w-7 h-7 rounded-full bg-gradient-brand flex items-center justify-center text-white text-[10px] font-bold">
                          {product.score.overall}
                        </div>
                      </div>
                      <p className="text-[10px] text-text-muted mt-0.5">AI Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Business Overview */}
          <Card glass>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-brand-500" /> AI Business Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "AI Accuracy Score", value: `${sampleAnalytics.trendAccuracy}%`, icon: Target, color: "text-brand-500", detail: "Trend detection accuracy" },
                  { label: "Forecasting Confidence", value: `${sampleAnalytics.forecastingAccuracy}%`, icon: LineChart, color: "text-cyan-500", detail: "Sales prediction accuracy" },
                  { label: "Active Visitors", value: "847", icon: Users, color: "text-blue-500", detail: "Right now", change: "+12.3%" },
                  { label: "Conversion Rate", value: `${performanceMetrics.conversionRate}%`, icon: Activity, color: "text-emerald-500", detail: "Avg. order value: " + formatCurrency(performanceMetrics.averageOrderValue) },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-100 dark:bg-surface-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-elevated flex items-center justify-center">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{item.label}</p>
                        <p className="text-xs text-text-muted">{item.detail}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-primary">{item.value}</p>
                      {item.change && <p className="text-xs text-emerald-500">{item.change}</p>}
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Products Analyzed</span>
                    <span className="font-bold text-text-primary">{sampleAnalytics.totalProductsAnalyzed.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-muted mt-1">
                    <span>Avg. Product Score</span>
                    <span className="font-bold text-text-primary">{sampleAnalytics.averageScore}/100</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="w-4 h-4 text-brand-500" /> Real-Time Activity</CardTitle>
              <Badge variant="success" size="sm" className="animate-pulse">Live</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        activity.type === "order" ? "bg-emerald-500" :
                        activity.type === "ai" ? "bg-brand-500" :
                        activity.type === "alert" ? "bg-amber-500" :
                        "bg-blue-500"
                      }`} />
                      <div className="w-px h-full bg-border mt-1" />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-text-primary">{activity.action}</p>
                        <activity.icon className={`w-3.5 h-3.5 ${
                          activity.type === "order" ? "text-emerald-500" :
                          activity.type === "ai" ? "text-brand-500" :
                          activity.type === "alert" ? "text-amber-500" : "text-blue-500"
                        }`} />
                      </div>
                      <p className="text-xs text-text-muted mt-0.5">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Mock data with AI integration
const stats = [
  { label: "Total Revenue", value: formatCurrency(48290), change: "+12.5%", trend: "up" as const, icon: DollarSign },
  { label: "Active Orders", value: "156", change: "+8.2%", trend: "up" as const, icon: ShoppingCart },
  { label: "Store Visits", value: formatCompactNumber(12849), change: "+23.1%", trend: "up" as const, icon: Eye },
  { label: "Conversion Rate", value: "3.24%", change: "-0.8%", trend: "down" as const, icon: Activity },
];

const activities = [
  { action: "New order received - Smart Watch Pro", time: "2 min ago", type: "order", icon: ShoppingBag },
  { action: "AI detected trending product in Home & Garden", time: "8 min ago", type: "ai", icon: Sparkles },
  { action: "Product 'Wireless Earbuds' price optimized by AI", time: "15 min ago", type: "ai", icon: Zap },
  { action: "Low stock alert: 3 products running out", time: "28 min ago", type: "alert", icon: AlertTriangle },
  { action: "Facebook Ad campaign reached 50K impressions", time: "1 hour ago", type: "success", icon: TrendingUp },
  { action: "Store inventory synced successfully", time: "2 hours ago", type: "success", icon: RefreshCw },
  { action: "AI recommendation: Increase ad budget by 15%", time: "3 hours ago", type: "ai", icon: Lightbulb },
];