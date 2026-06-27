"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useState } from "react";
import {
  ShoppingBag, CreditCard, BarChart3, Video, Globe,
  Mail, MessageCircle, Zap, Link2, CheckCircle, XCircle, ExternalLink
} from "lucide-react";

interface Integration {
  id: string; name: string; description: string; icon: React.ElementType;
  category: string; status: "connected" | "disconnected" | "pending"; color: string;
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: i.status === "connected" ? "disconnected" as const : "connected" as const }
          : i
      )
    );
  };

  const categories = ["All", "E-Commerce", "Payments", "Marketing", "Analytics", "Communication"];

  return (
    <DashboardLayout title="Integrations" breadcrumbs={[{ label: "Settings" }, { label: "Integrations" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {integrations.filter((i) => i.status === "connected").length} Connected
            </h2>
            <p className="text-sm text-text-muted">Connect your favorite tools to DropAI</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.id} hover className="group">
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${integration.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {integration.status === "connected" ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : integration.status === "pending" ? (
                      <div className="w-5 h-5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    ) : (
                      <XCircle className="w-5 h-5 text-text-muted" />
                    )}
                  </div>
                  <h3 className="font-semibold mb-1">{integration.name}</h3>
                  <p className="text-xs text-text-muted mb-4">{integration.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" size="sm">{integration.category}</Badge>
                    <Button
                      variant={integration.status === "connected" ? "glass" : "primary"}
                      size="sm"
                      onClick={() => toggleIntegration(integration.id)}
                    >
                      {integration.status === "connected" ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

const mockIntegrations: Integration[] = [
  { id: "shopify", name: "Shopify", description: "Sync products, orders, and customers", icon: ShoppingBag, category: "E-Commerce", status: "connected", color: "bg-emerald-500/10 text-emerald-500" },
  { id: "woocommerce", name: "WooCommerce", description: "Connect your WordPress store", icon: Globe, category: "E-Commerce", status: "connected", color: "bg-violet-500/10 text-violet-500" },
  { id: "stripe", name: "Stripe", description: "Payment processing and billing", icon: CreditCard, category: "Payments", status: "connected", color: "bg-indigo-500/10 text-indigo-500" },
  { id: "paypal", name: "PayPal", description: "Accept PayPal payments", icon: CreditCard, category: "Payments", status: "disconnected", color: "bg-blue-500/10 text-blue-500" },
  { id: "google-analytics", name: "Google Analytics", description: "Track store traffic and behavior", icon: BarChart3, category: "Analytics", status: "connected", color: "bg-orange-500/10 text-orange-500" },
  { id: "meta-ads", name: "Meta Ads", description: "Facebook & Instagram advertising", icon: Video, category: "Marketing", status: "disconnected", color: "bg-blue-600/10 text-blue-600" },
  { id: "tiktok", name: "TikTok Ads", description: "Create and manage TikTok campaigns", icon: Video, category: "Marketing", status: "disconnected", color: "bg-black/10 dark:bg-white/10 text-black dark:text-white" },
  { id: "klaviyo", name: "Klaviyo", description: "Email marketing & SMS automation", icon: Mail, category: "Marketing", status: "pending", color: "bg-teal-500/10 text-teal-500" },
  { id: "mailchimp", name: "Mailchimp", description: "Email campaigns and automation", icon: Mail, category: "Marketing", status: "disconnected", color: "bg-yellow-500/10 text-yellow-500" },
  { id: "zapier", name: "Zapier", description: "Connect with 5000+ apps", icon: Zap, category: "Communication", status: "disconnected", color: "bg-orange-400/10 text-orange-400" },
];