"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { useState } from "react";
import { Search, Star, Globe, Sparkles, ShoppingBag, Layers, Cpu, ExternalLink, TrendingUp, DollarSign } from "lucide-react";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <DashboardLayout title="Marketplace" breadcrumbs={[{ label: "Marketplace" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Tabs
            tabs={[
              { id: "products", label: "Products", icon: <ShoppingBag className="w-4 h-4" /> },
              { id: "suppliers", label: "Suppliers", icon: <Globe className="w-4 h-4" /> },
              { id: "themes", label: "Themes", icon: <Layers className="w-4 h-4" /> },
              { id: "apps", label: "Apps", icon: <Cpu className="w-4 h-4" /> },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <Input placeholder="Search marketplace..." leftIcon={<Search className="w-4 h-4" />} className="max-w-xs" />
        </div>

        {/* Products Tab */}
        <TabPanel tabId="products" activeTab={activeTab}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketplaceProducts.map((product) => (
              <Card key={product.id} hover>
                <CardContent>
                  <div className="w-full h-40 rounded-2xl bg-gradient-brand-subtle mb-4 flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-brand-400/50" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <Badge variant="success" size="sm"><Star className="w-3 h-3 mr-0.5" />{product.score}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <DollarSign className="w-4 h-4 text-text-muted" />
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                    <span className="text-text-muted">|</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-500">{product.trend}%</span>
                  </div>
                  <p className="text-xs text-text-muted mb-3">{product.supplier}</p>
                  <div className="flex gap-2">
                    <Button variant="gradient" size="sm" isFullWidth>Import</Button>
                    <Button variant="glass" size="sm"><ExternalLink className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabPanel>

        {/* Suppliers Tab */}
        <TabPanel tabId="suppliers" activeTab={activeTab}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} hover glass>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-brand-subtle flex items-center justify-center">
                      <Globe className="w-7 h-7 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{supplier.name}</h3>
                      <Badge variant={supplier.verified ? "success" : "default"} size="sm">
                        {supplier.verified ? "Verified" : "Standard"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted mb-3">{supplier.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{supplier.products} products</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{supplier.rating}</span>
                    </div>
                  </div>
                  <Button variant="glass" isFullWidth className="mt-3">View Products</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabPanel>

        {/* Themes Tab */}
        <TabPanel tabId="themes" activeTab={activeTab}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <Card key={theme.id} hover>
                <CardContent>
                  <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 mb-4 flex items-center justify-center">
                    <Layers className="w-10 h-10 text-brand-400/50" />
                  </div>
                  <h3 className="font-semibold mb-1">{theme.name}</h3>
                  <p className="text-xs text-text-muted mb-3">{theme.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="premium" size="sm">{theme.price}</Badge>
                    <Button variant="glass" size="sm">Preview</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabPanel>

        {/* Apps Tab */}
        <TabPanel tabId="apps" activeTab={activeTab}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
              <Card key={app.id} hover glass>
                <CardContent>
                  <div className={`w-12 h-12 rounded-2xl ${app.color} flex items-center justify-center mb-3`}>
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-1">{app.name}</h3>
                  <p className="text-xs text-text-muted mb-3">{app.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" size="sm">{app.category}</Badge>
                    <Button variant="glass" size="sm">{app.price === "Free" ? "Install" : app.price}</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabPanel>
      </div>
    </DashboardLayout>
  );
}

const marketplaceProducts = [
  { id: "mp1", name: "Smart Watch Pro Max", price: 89.99, trend: 45, score: 92, supplier: "TechSupply Co.", shipping: "7-12 days" },
  { id: "mp2", name: "Wireless Earbuds Gen3", price: 49.99, trend: 38, score: 88, supplier: "AudioPro Ltd.", shipping: "5-10 days" },
  { id: "mp3", name: "Pet Hair Remover Pro", price: 14.99, trend: 62, score: 90, supplier: "PetCare Wholesale", shipping: "7-14 days" },
  { id: "mp4", name: "Phone Gripper Ultra", price: 19.99, trend: 28, score: 79, supplier: "GadgetWorld", shipping: "5-8 days" },
  { id: "mp5", name: "LED Strip Lights 2.0", price: 24.99, trend: 35, score: 85, supplier: "HomeSmart Supply", shipping: "7-12 days" },
  { id: "mp6", name: "Fitness Tracker Band", price: 39.99, trend: 22, score: 73, supplier: "TechSupply Co.", shipping: "5-10 days" },
];

const suppliers = [
  { id: "s1", name: "TechSupply Co.", verified: true, description: "Premium electronics and gadgets", products: 234, rating: 4.8 },
  { id: "s2", name: "AudioPro Ltd.", verified: true, description: "High-quality audio equipment", products: 156, rating: 4.7 },
  { id: "s3", name: "PetCare Wholesale", verified: true, description: "Pet supplies at wholesale prices", products: 89, rating: 4.5 },
  { id: "s4", name: "GadgetWorld", verified: false, description: "Trending gadgets and accessories", products: 312, rating: 4.3 },
  { id: "s5", name: "HomeSmart Supply", verified: true, description: "Home improvement and smart devices", products: 178, rating: 4.6 },
  { id: "s6", name: "FashionForward", verified: false, description: "Clothing and accessories", products: 445, rating: 4.1 },
];

const themes = [
  { id: "t1", name: "Minimal Pro", description: "Clean, modern theme for any niche", price: "Free" },
  { id: "t2", name: "Shop Premium", description: "Premium store with advanced features", price: "$49" },
  { id: "t3", name: "Flash Sale", description: "High-converting sales-focused design", price: "$79" },
  { id: "t4", name: "Luxury Dark", description: "Dark mode premium theme", price: "$39" },
];

const apps = [
  { id: "a1", name: "AI Upsell Engine", description: "Smart product recommendations", price: "Free", category: "Conversion", color: "bg-brand-500/10 text-brand-400" },
  { id: "a2", name: "Auto Email Flows", description: "Automated email sequences", price: "$9/mo", category: "Marketing", color: "bg-emerald-500/10 text-emerald-400" },
  { id: "a3", name: "Review Booster", description: "Collect and display reviews", price: "Free", category: "Social Proof", color: "bg-amber-500/10 text-amber-400" },
  { id: "a4", name: "Currency Converter", description: "Multi-currency support", price: "$5/mo", category: "Localization", color: "bg-violet-500/10 text-violet-400" },
];