"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Tabs } from "@/components/ui/Tabs";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Sparkles, TrendingUp, Download, ShoppingCart, DollarSign, Package, Star } from "lucide-react";

interface Product {
  id: string; title: string; price: number; costPrice: number; sales: number;
  revenue: number; profit: number; profitMargin: number; status: string;
  aiScore: number; trend: string; category: string; platform: string;
  supplier: string; createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showImport, setShowImport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || mockProducts);
    } catch { setProducts(mockProducts); }
    finally { setLoading(false); }
  };

  const filtered = products.filter((p) => {
    if (activeTab === "active" && p.status !== "active") return false;
    if (activeTab === "draft" && p.status !== "draft") return false;
    if (activeTab === "archived" && p.status !== "archived") return false;
    if (activeTab === "high" && p.aiScore < 85) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const columns: Column<Product>[] = [
    { key: "title", header: "Product", sortable: true, width: "28%",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand-subtle flex items-center justify-center">
            <Package className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <p className="font-medium text-sm text-[#3A2A22]">{p.title}</p>
            <div className="flex items-center gap-2 text-xs text-[#8B7A6A]">
              <span>{p.category}</span>
              <span>•</span>
              <Badge variant="outline" size="sm" className="text-[8px]">{p.platform}</Badge>
            </div>
          </div>
        </div>
      )
    },
    { key: "price", header: "Price", sortable: true, render: (p) => <span className="font-medium text-[#3A2A22]">${p.price.toFixed(2)}</span> },
    { key: "sales", header: "Sales", sortable: true, render: (p) => <span className="font-medium">{p.sales.toLocaleString()}</span> },
    { key: "revenue", header: "Revenue", sortable: true, render: (p) => <span className="font-medium text-[#0F5257]">${p.revenue.toLocaleString()}</span> },
    { key: "profitMargin", header: "Margin", sortable: true,
      render: (p) => (
        <Badge variant={p.profitMargin >= 75 ? "success" : p.profitMargin >= 60 ? "info" : "warning"} size="sm">{p.profitMargin}%</Badge>
      )
    },
    { key: "aiScore", header: "AI Score", sortable: true,
      render: (p) => (
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
          p.aiScore >= 85 ? "bg-emerald-50 text-emerald-600" : p.aiScore >= 70 ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-500"
        }`}>{p.aiScore}</div>
      )
    },
    { key: "trend", header: "Trend", sortable: true,
      render: (p) => (
        <div className="flex items-center gap-1">
          <TrendingUp className={`w-3 h-3 ${p.trend === "up" ? "text-emerald-500" : "text-red-500"}`} />
          <span className={`text-xs ${p.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>{p.trend === "up" ? "+12%" : "-3%"}</span>
        </div>
      )
    },
    { key: "status", header: "Status",
      render: (p) => <Badge variant={p.status === "active" ? "success" : p.status === "draft" ? "warning" : "default"} size="sm">{p.status}</Badge>
    },
  ];

  return (
    <DashboardLayout title="Product Library" breadcrumbs={[{ label: "Products" }]}>
      <div className="space-y-6 animate-fade-in">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: "Total Products", value: "248", icon: Package, color: "text-[#0F5257]" },
            { label: "Active SKUs", value: products.filter(p => p.status === "active").length.toString(), icon: ShoppingCart, color: "text-emerald-600" },
            { label: "Total Revenue", value: "$48,290", icon: DollarSign, color: "text-[#D4AF37]" },
            { label: "Avg Margin", value: "76.4%", icon: TrendingUp, color: "text-blue-600" },
            { label: "Avg AI Score", value: "83.2", icon: Star, color: "text-purple-600" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-xl p-3.5 bg-white border border-[#E8E0D6] flex items-center gap-3 hover:shadow-premium transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-brand-subtle flex items-center justify-center">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <p className="text-lg font-bold text-[#3A2A22]">{stat.value}</p>
                <p className="text-[10px] text-[#8B7A6A]">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs
            tabs={[
              { id: "all", label: "All Products", badge: <Badge size="sm">{products.length}</Badge> },
              { id: "active", label: "Active" },
              { id: "draft", label: "Drafts" },
              { id: "high", label: "High Score", badge: <Badge variant="premium" size="sm"><Sparkles className="w-2.5 h-2.5" /></Badge> },
              { id: "archived", label: "Archived" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-[#E8E0D6] rounded-xl overflow-hidden">
              <button onClick={() => setViewMode("table")} className={`p-2 ${viewMode === "table" ? "bg-[#0F5257] text-white" : "bg-white text-[#5A4535]"} transition-all`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </button>
              <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-[#0F5257] text-white" : "bg-white text-[#5A4535]"} transition-all`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
            </div>
            <Button variant="glass" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
            <Button variant="glass" leftIcon={<Sparkles className="w-4 h-4" />}>AI Research</Button>
            <Button onClick={() => setShowImport(true)} leftIcon={<Plus className="w-4 h-4" />}>Import Product</Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7A6A]" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[#E8E0D6] bg-white text-[#3A2A22] placeholder:text-[#8B7A6A] focus:outline-none focus:border-[#D4AF37] text-sm"
          />
        </div>

        {/* Content */}
        {viewMode === "table" ? (
          <DataTable columns={columns} data={filtered} keyExtractor={(p) => p.id}
            searchable={false} loading={loading}
            emptyMessage="No products found. Import your first product!"
            onRowClick={(p) => window.location.href = `/products/${p.id}`}
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="rounded-2xl p-4 bg-white border border-[#E8E0D6] hover:shadow-premium-lg hover:border-[#D4AF37]/30 transition-all cursor-pointer group"
                onClick={() => window.location.href = `/products/${p.id}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={p.status === "active" ? "success" : "draft"} size="sm">{p.status}</Badge>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold ${p.aiScore >= 85 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{p.aiScore}</div>
                </div>
                <h4 className="font-display font-bold text-[#3A2A22] text-sm group-hover:text-[#0F5257] transition-colors">{p.title}</h4>
                <p className="text-[10px] text-[#8B7A6A] mt-0.5">{p.category} • {p.platform}</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-[#F7F3ED] rounded-lg p-2">
                    <span className="text-[10px] text-[#8B7A6A] block">Price</span>
                    <span className="text-xs font-bold text-[#3A2A22]">${p.price.toFixed(2)}</span>
                  </div>
                  <div className="bg-[#F7F3ED] rounded-lg p-2">
                    <span className="text-[10px] text-[#8B7A6A] block">Margin</span>
                    <span className="text-xs font-bold text-[#0F5257]">{p.profitMargin}%</span>
                  </div>
                  <div className="bg-[#F7F3ED] rounded-lg p-2">
                    <span className="text-[10px] text-[#8B7A6A] block">Sales</span>
                    <span className="text-xs font-bold text-[#3A2A22]">{p.sales}</span>
                  </div>
                  <div className="bg-[#F7F3ED] rounded-lg p-2">
                    <span className="text-[10px] text-[#8B7A6A] block">Revenue</span>
                    <span className="text-xs font-bold text-[#D4AF37]">${p.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={showImport} onClose={() => setShowImport(false)} title="Import Product" size="lg">
        <div className="space-y-4">
          <Input placeholder="Product URL (AliExpress, Amazon, Shopify, etc.)" leftIcon={<Search className="w-4 h-4" />} />
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#E8E0D6]" />
            <span className="text-[10px] text-[#8B7A6A] uppercase">or</span>
            <div className="flex-1 h-px bg-[#E8E0D6]" />
          </div>
          <div className="p-4 glass rounded-2xl text-center">
            <p className="text-sm text-text-muted">Paste a product URL from any supported platform and AI will auto-import the details.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="glass" isFullWidth>Import from URL</Button>
            <Button variant="glass" isFullWidth>Manual Entry</Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

const mockProducts: Product[] = [
  { id: "1", title: "Smart Watch Pro Max", price: 89.99, costPrice: 35, sales: 234, revenue: 20877, profit: 12870, profitMargin: 77, status: "active", aiScore: 92, trend: "up", category: "Electronics", platform: "Shopify", supplier: "Supplier A", createdAt: "2026-01-15" },
  { id: "2", title: "Wireless Earbuds Gen3", price: 49.99, costPrice: 18, sales: 189, revenue: 9448, profit: 6047, profitMargin: 74, status: "active", aiScore: 88, trend: "up", category: "Electronics", platform: "TikTok Shop", supplier: "Supplier B", createdAt: "2026-01-20" },
  { id: "3", title: "Phone Gripper Pro", price: 19.99, costPrice: 7, sales: 156, revenue: 3118, profit: 2027, profitMargin: 75, status: "active", aiScore: 79, trend: "up", category: "Accessories", platform: "Shopify", supplier: "Supplier A", createdAt: "2026-02-01" },
  { id: "4", title: "LED Strip Lights 2.0", price: 24.99, costPrice: 9, sales: 142, revenue: 3548, profit: 2273, profitMargin: 74, status: "draft", aiScore: 85, trend: "up", category: "Home", platform: "Facebook Shop", supplier: "Supplier C", createdAt: "2026-02-05" },
  { id: "5", title: "Fitness Tracker Band", price: 39.99, costPrice: 15, sales: 98, revenue: 3919, profit: 2449, profitMargin: 73, status: "active", aiScore: 73, trend: "down", category: "Electronics", platform: "TikTok Shop", supplier: "Supplier B", createdAt: "2026-02-10" },
  { id: "6", title: "Portable Charger 20000mAh", price: 34.99, costPrice: 12, sales: 87, revenue: 3044, profit: 2000, profitMargin: 76, status: "draft", aiScore: 81, trend: "up", category: "Electronics", platform: "Shopify", supplier: "Supplier A", createdAt: "2026-02-15" },
  { id: "7", title: "Aromatherapy Diffuser", price: 29.99, costPrice: 11, sales: 76, revenue: 2279, profit: 1443, profitMargin: 72, status: "archived", aiScore: 65, trend: "down", category: "Home", platform: "Facebook Shop", supplier: "Supplier C", createdAt: "2026-01-05" },
  { id: "8", title: "Pet Hair Remover", price: 14.99, costPrice: 5, sales: 212, revenue: 3177, profit: 2119, profitMargin: 80, status: "active", aiScore: 90, trend: "up", category: "Pets", platform: "TikTok Shop", supplier: "Supplier B", createdAt: "2026-03-01" },
];