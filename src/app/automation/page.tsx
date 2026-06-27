"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Switch } from "@/components/ui/Select";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { useState } from "react";
import {
  Bot, DollarSign, Package, Truck, RefreshCw,
  Sparkles, TrendingUp, AlertTriangle, CheckCircle, Zap, Activity
} from "lucide-react";

interface Automation {
  id: string; name: string; description: string; icon: React.ElementType;
  enabled: boolean; category: string; lastRun: string; status: string;
}

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const filtered = activeTab === "all" ? automations : automations.filter((a) => a.category === activeTab);

  return (
    <DashboardLayout title="Automations" breadcrumbs={[{ label: "Automations" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Tabs
            tabs={[
              { id: "all", label: "All", badge: <Badge size="sm">{automations.length}</Badge> },
              { id: "pricing", label: "Pricing", icon: <DollarSign className="w-3 h-3" /> },
              { id: "inventory", label: "Inventory", icon: <Package className="w-3 h-3" /> },
              { id: "orders", label: "Orders", icon: <Truck className="w-3 h-3" /> },
              { id: "suppliers", label: "Suppliers", icon: <RefreshCw className="w-3 h-3" /> },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Activity className="w-4 h-4" />
            {automations.filter((a) => a.enabled).length}/{automations.length} active
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="glass rounded-3xl p-6 bg-gradient-brand-subtle border border-brand-500/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">AI Suggestion</h3>
              <p className="text-sm text-text-secondary mb-3">
                Based on your store analysis, enabling &quot;Auto Price Optimization&quot; could increase profit margins by 12%. 
                Your current pricing is 8% below market average for {3} products.
              </p>
              <Button variant="gradient" size="sm" onClick={() => toggleAutomation("auto-pricing")}>
                Enable Smart Pricing
              </Button>
            </div>
          </div>
        </div>

        {/* Automation List */}
        <div className="space-y-3">
          {filtered.map((auto) => {
            const Icon = auto.icon;
            return (
              <div key={auto.id} className="glass-card p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${
                    auto.enabled ? "bg-gradient-brand-subtle" : "bg-surface-100 dark:bg-surface-800"
                  } flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${auto.enabled ? "text-brand-400" : "text-text-muted"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{auto.name}</h3>
                      <Badge variant={
                        auto.status === "active" ? "success" :
                        auto.status === "paused" ? "warning" : "default"
                      } size="sm">
                        {auto.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-muted">{auto.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="default" size="sm">{auto.category}</Badge>
                      <span className="text-xs text-text-muted">Last run: {auto.lastRun}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {auto.id === "auto-pricing" && auto.enabled && (
                    <div className="flex items-center gap-1 text-xs text-emerald-500">
                      <TrendingUp className="w-3 h-3" /> +12% margin
                    </div>
                  )}
                  <Switch checked={auto.enabled} onChange={() => toggleAutomation(auto.id)} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Automations Running", value: automations.filter((a) => a.enabled).length, icon: Zap, change: "Active" },
            { label: "Hours Saved/Week", value: "12", icon: Bot, change: "+3 this week" },
            { label: "Errors This Week", value: "2", icon: AlertTriangle, change: "Resolved" },
            { label: "Profit Impact", value: "+$1,240", icon: TrendingUp, change: "This month" },
          ].map((s) => (
            <Card key={s.label} glass>
              <CardContent>
                <div className="flex items-center gap-2 mb-1">
                  <s.icon className="w-4 h-4 text-brand-400" />
                  <span className="text-xs text-text-muted">{s.label}</span>
                </div>
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs text-text-muted">{s.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

const mockAutomations: Automation[] = [
  { id: "auto-pricing", name: "Smart Pricing Optimizer", description: "AI adjusts prices based on demand, competition, and profit targets", icon: DollarSign, enabled: true, category: "pricing", lastRun: "2 min ago", status: "active" },
  { id: "auto-inventory", name: "Auto Inventory Sync", description: "Real-time inventory tracking and low stock alerts", icon: Package, enabled: true, category: "inventory", lastRun: "5 min ago", status: "active" },
  { id: "auto-order-routing", name: "Order Routing", description: "Automatically route orders to best supplier based on price & speed", icon: Truck, enabled: true, category: "orders", lastRun: "1 hour ago", status: "active" },
  { id: "auto-supplier-switch", name: "Smart Supplier Switching", description: "Auto-switch suppliers when better prices or faster shipping found", icon: RefreshCw, enabled: false, category: "suppliers", lastRun: "1 day ago", status: "paused" },
  { id: "auto-profit-optimizer", name: "Profit Maximizer", description: "Find optimal price points to maximize profit margins", icon: TrendingUp, enabled: false, category: "pricing", lastRun: "3 days ago", status: "paused" },
  { id: "auto-stock-reorder", name: "Auto Reorder", description: "Automatically reorder products when stock runs low", icon: Package, enabled: true, category: "inventory", lastRun: "30 min ago", status: "active" },
];