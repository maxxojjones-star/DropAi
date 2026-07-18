"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { SalesChart, salesVelocityData } from "@/components/spy-tools/SalesChart";
import { StatsCard } from "@/components/spy-tools/StatsCard";
import { DollarSign, ShoppingCart, TrendingUp, Activity, RefreshCw, Calendar, ArrowUpRight } from "lucide-react";

const timeRanges = [
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "90d", label: "90 Days" },
  { id: "custom", label: "Custom" },
];

export default function SalesTrackerPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [platformFilter, setPlatformFilter] = useState("all");

  return (
    <DashboardLayout title="Sales Tracker" breadcrumbs={[{ label: "Sales Tracker" }]}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-[#3A2A22]">Real-Time Sales Velocity</h2>
            <p className="text-sm text-[#8B7A6A]">Track sales across TikTok Shop, Facebook Shop, and Shopify in one view</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" leftIcon={<RefreshCw className="w-3 h-3" />}>
              Refresh
            </Button>
            <Badge variant="success" size="md" className="animate-pulse">
              <Activity className="w-3 h-3 mr-1" /> Live
            </Badge>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-4 h-4 text-[#8B7A6A]" />
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                timeRange === range.id
                  ? "bg-[#0F5257] text-white shadow-premium"
                  : "bg-white text-[#5A4535] border border-[#E8E0D6] hover:border-[#D4AF37]"
              }`}
            >
              {range.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-[#8B7A6A]">Platform:</span>
            {["all", "tiktok", "facebook", "shopify"].map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                  platformFilter === p
                    ? "bg-[#0F5257] text-white"
                    : "bg-white text-[#5A4535] border border-[#E8E0D6]"
                }`}
              >
                {p === "all" ? "All" : p}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Sales (7 Days)"
            value="$128,940"
            change="+18.5%"
            trend="up"
            icon={DollarSign}
            index={0}
          />
          <StatsCard
            label="Orders Fulfilled"
            value="3,247"
            change="+12.3%"
            trend="up"
            icon={ShoppingCart}
            index={1}
          />
          <StatsCard
            label="Avg. Order Value"
            value="$39.72"
            change="+5.8%"
            trend="up"
            icon={TrendingUp}
            index={2}
          />
          <StatsCard
            label="Conversion Rate"
            value="3.42%"
            change="-0.6%"
            trend="down"
            icon={Activity}
            index={3}
          />
        </div>

        {/* Sales Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart data={salesVelocityData} title="Sales Velocity by Platform" />
          </div>

          {/* Top Performing Products */}
          <div className="rounded-2xl p-5 bg-white border border-[#E8E0D6]">
            <h3 className="font-display font-bold text-[#3A2A22] text-sm mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0F5257]" /> Top Performers
            </h3>
            <div className="space-y-3">
              {[
                { name: "LED Face Mask", sales: 847, revenue: "$67,720", platform: "TikTok" },
                { name: "Smart Water Bottle", sales: 623, revenue: "$21,800", platform: "Shopify" },
                { name: "Neck Fan Pro", sales: 512, revenue: "$13,307", platform: "TikTok" },
                { name: "Cat Feeder", sales: 445, revenue: "$31,145", platform: "Facebook" },
                { name: "Packing Cubes Set", sales: 398, revenue: "$7,558", platform: "Shopify" },
              ].map((product, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F7F3ED] transition-colors">
                  <span className="text-[10px] font-bold text-[#8B7A6A] w-5">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#3A2A22] truncate">{product.name}</p>
                    <div className="flex items-center gap-2 text-xs text-[#8B7A6A]">
                      <span>{product.sales} sales</span>
                      <span className="text-[#0F5257] font-medium">{product.revenue}</span>
                    </div>
                  </div>
                  <Badge variant="outline" size="sm" className="text-[9px]">{product.platform}</Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-[#0F5257]">
              View All <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Platform Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-5 bg-white border border-[#E8E0D6]"
        >
          <h3 className="font-display font-bold text-[#3A2A22] text-sm mb-4">Platform Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "TikTok Shop", sales: "$62,400", orders: 1,580, change: "+22.4%", color: "from-blue-500 to-blue-400", bg: "bg-blue-50" },
              { name: "Facebook Shop", sales: "$38,700", orders: 982, change: "+15.8%", color: "from-[#1877F2] to-blue-300", bg: "bg-blue-50" },
              { name: "Shopify Store", sales: "$27,840", orders: 685, change: "+8.2%", color: "from-[#0F5257] to-teal-300", bg: "bg-emerald-50" },
            ].map((platform, i) => (
              <div key={i} className={`rounded-xl p-4 ${platform.bg} border border-[#E8E0D6]`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-[#3A2A22]">{platform.name}</h4>
                  <span className="text-xs font-medium text-emerald-600">{platform.change}</span>
                </div>
                <p className="text-2xl font-bold text-[#3A2A22]">{platform.sales}</p>
                <p className="text-xs text-[#8B7A6A] mt-1">{platform.orders} orders</p>
                <div className="mt-3 h-1.5 rounded-full bg-white/50">
                  <div className={`h-full rounded-full bg-gradient-to-r ${platform.color}`} style={{ width: `${(platform.orders / 1580) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Orders Feed */}
        <div className="rounded-2xl p-5 bg-white border border-[#E8E0D6]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-[#3A2A22] text-sm">Recent Orders</h3>
            <Badge variant="success" size="sm" className="animate-pulse">+12 new</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-[#8B7A6A] border-b border-[#E8E0D6]">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Product</th>
                  <th className="pb-2 font-medium">Platform</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "#ORD-4821", product: "LED Face Mask", platform: "TikTok", amount: "$79.99", status: "completed", time: "2 min ago" },
                  { id: "#ORD-4820", product: "Smart Water Bottle", platform: "Shopify", amount: "$34.99", status: "processing", time: "5 min ago" },
                  { id: "#ORD-4819", product: "Neck Fan Pro", platform: "TikTok", amount: "$25.99", status: "completed", time: "8 min ago" },
                  { id: "#ORD-4818", product: "Cat Feeder", platform: "Facebook", amount: "$69.99", status: "shipped", time: "12 min ago" },
                  { id: "#ORD-4817", product: "Packing Cubes", platform: "Shopify", amount: "$18.99", status: "completed", time: "15 min ago" },
                  { id: "#ORD-4816", product: "LED Face Mask", platform: "TikTok", amount: "$79.99", status: "processing", time: "18 min ago" },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-[#E8E0D6]/50 text-sm hover:bg-[#F7F3ED] transition-colors">
                    <td className="py-3 font-medium text-[#0F5257]">{order.id}</td>
                    <td className="py-3 text-[#3A2A22]">{order.product}</td>
                    <td className="py-3"><Badge variant="outline" size="sm">{order.platform}</Badge></td>
                    <td className="py-3 font-medium text-[#3A2A22]">{order.amount}</td>
                    <td className="py-3">
                      <Badge variant={order.status === "completed" ? "success" : order.status === "processing" ? "info" : "warning"} size="sm">
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-xs text-[#8B7A6A]">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}