"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { useState, useEffect } from "react";
import {
  BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, Download,
  Calendar, ArrowUpRight, Eye, Target, Activity
} from "lucide-react";

interface StatCard {
  label: string; value: string; change: string; trend: "up" | "down"; icon: React.ElementType;
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const stats: StatCard[] = [
    { label: "Total Revenue", value: "$48,290", change: "+12.5%", trend: "up", icon: DollarSign },
    { label: "Orders", value: "1,234", change: "+8.3%", trend: "up", icon: ShoppingCart },
    { label: "Conversion Rate", value: "3.24%", change: "+0.8%", trend: "up", icon: Target },
    { label: "Avg. Order Value", value: "$89.50", change: "+5.2%", trend: "up", icon: Activity },
    { label: "Total Profit", value: "$28,974", change: "+15.1%", trend: "up", icon: TrendingUp },
    { label: "Store Visits", value: "12,849", change: "+23.1%", trend: "up", icon: Eye },
  ];

  const chartData = [
    { day: "Mon", revenue: 5200, orders: 42, profit: 3120 },
    { day: "Tue", revenue: 6800, orders: 55, profit: 4080 },
    { day: "Wed", revenue: 4900, orders: 38, profit: 2940 },
    { day: "Thu", revenue: 7200, orders: 61, profit: 4320 },
    { day: "Fri", revenue: 8400, orders: 73, profit: 5040 },
    { day: "Sat", revenue: 6100, orders: 49, profit: 3660 },
    { day: "Sun", revenue: 5690, orders: 44, profit: 3414 },
  ];

  return (
    <DashboardLayout title="Analytics" breadcrumbs={[{ label: "Analytics" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Tabs
            tabs={[
              { id: "overview", label: "Overview" },
              { id: "revenue", label: "Revenue" },
              { id: "products", label: "Products" },
              { id: "ads", label: "Ad Performance" },
              { id: "customers", label: "Customers" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="flex items-center gap-3">
            <div className="flex glass rounded-xl p-1">
              {["7d", "30d", "90d", "1y"].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                    dateRange === range ? "bg-brand-500 text-white" : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <Button variant="glass" size="sm" leftIcon={<Calendar className="w-3 h-3" />}>Custom</Button>
            <Button variant="glass" size="sm" leftIcon={<Download className="w-3 h-3" />}>Export</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((stat) => (
            <Card key={stat.label} glass>
              <CardContent>
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-text-muted" />
                  <span className="text-xs text-text-muted">{stat.label}</span>
                </div>
                <p className="text-xl font-bold">{stat.value}</p>
                <div className={`flex items-center gap-1 text-xs mt-1 ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
                  <ArrowUpRight className={`w-3 h-3 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders</CardTitle>
            <Badge variant="info">Last 7 days</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end gap-2">
              {chartData.map((d) => {
                const maxRevenue = Math.max(...chartData.map((x) => x.revenue));
                const heightPct = (d.revenue / maxRevenue) * 100;
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col items-center gap-0.5">
                      <div
                        className="w-full bg-brand-500/20 rounded-t-lg relative overflow-hidden"
                        style={{ height: `${heightPct * 0.7}%` }}
                      >
                        <div
                          className="absolute bottom-0 w-full bg-gradient-to-t from-brand-500 to-brand-400 rounded-t-lg"
                          style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                        />
                      </div>
                      <div
                        className="w-full bg-accent-500/20 rounded-t-lg"
                        style={{ height: `${(d.orders / Math.max(...chartData.map((x) => x.orders))) * 40}%` }}
                      >
                        <div
                          className="w-full bg-gradient-to-t from-accent-500 to-accent-400 rounded-t-lg"
                          style={{ height: `${(d.orders / Math.max(...chartData.map((x) => x.orders))) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-text-muted">{d.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-text-muted">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-brand-500" /> Revenue</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-accent-500" /> Orders</span>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Smart Watch Pro Max", "Wireless Earbuds Gen3", "Pet Hair Remover", "Phone Gripper Pro"].map((name, i) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-text-muted w-5">{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{name}</p>
                      <div className="w-full h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full mt-1">
                        <div className="h-full bg-gradient-to-r from-brand-500 to-accent-400 rounded-full" style={{ width: `${80 - i * 15}%` }} />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-emerald-500">${(500 - i * 100).toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Ad Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { platform: "Facebook Ads", spend: 1250, revenue: 4800, roas: 3.84 },
                  { platform: "TikTok Ads", spend: 800, revenue: 3200, roas: 4.0 },
                  { platform: "Google Ads", spend: 600, revenue: 1800, roas: 3.0 },
                ].map((ad) => (
                  <div key={ad.platform} className="flex items-center justify-between p-3 glass rounded-xl">
                    <div>
                      <p className="text-sm font-medium">{ad.platform}</p>
                      <p className="text-xs text-text-muted">Spent: ${ad.spend.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-500">${ad.revenue.toLocaleString()}</p>
                      <Badge variant="success" size="sm">{ad.roas}x ROAS</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}