"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Tabs, TabPanel } from "@/components/ui/Tabs";
import { useState, useEffect } from "react";
import { Plus, Search, Sparkles, TrendingUp, Filter, ArrowUpDown, Download, Eye } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  costPrice: number;
  sales: number;
  revenue: number;
  status: string;
  aiScore: number;
  trend: string;
  category: string;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showImport, setShowImport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || mockProducts);
    } catch {
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const filtered = products.filter((p) => {
    if (activeTab === "active" && p.status !== "active") return false;
    if (activeTab === "draft" && p.status !== "draft") return false;
    if (activeTab === "archived" && p.status !== "archived") return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const columns: Column<Product>[] = [
    { key: "title", header: "Product", sortable: true, width: "35%",
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand-subtle flex items-center justify-center">
            <Eye className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <p className="font-medium text-sm">{p.title}</p>
            <p className="text-xs text-text-muted">{p.category}</p>
          </div>
        </div>
      )
    },
    { key: "price", header: "Price", sortable: true,
      render: (p) => <span className="font-medium">${p.price.toFixed(2)}</span>
    },
    { key: "sales", header: "Sales", sortable: true },
    { key: "revenue", header: "Revenue", sortable: true,
      render: (p) => <span className="font-medium">${p.revenue.toFixed(2)}</span>
    },
    { key: "aiScore", header: "AI Score", sortable: true,
      render: (p) => (
        <Badge variant={p.aiScore >= 80 ? "success" : p.aiScore >= 60 ? "info" : "warning"}>
          <Sparkles className="w-3 h-3 mr-1" /> {p.aiScore}
        </Badge>
      )
    },
    { key: "trend", header: "Trend", sortable: true,
      render: (p) => (
        <div className="flex items-center gap-1">
          <TrendingUp className={`w-3 h-3 ${p.trend === "up" ? "text-emerald-400" : "text-red-400"}`} />
          <span className={p.trend === "up" ? "text-emerald-400" : "text-red-400"}>
            {p.trend === "up" ? "+12%" : "-3%"}
          </span>
        </div>
      )
    },
    { key: "status", header: "Status",
      render: (p) => (
        <Badge variant={p.status === "active" ? "success" : p.status === "draft" ? "warning" : "default"}>
          {p.status}
        </Badge>
      )
    },
  ];

  return (
    <DashboardLayout title="Products" breadcrumbs={[{ label: "Products" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Tabs
            tabs={[
              { id: "all", label: "All Products", badge: <Badge size="sm">{products.length}</Badge> },
              { id: "active", label: "Active" },
              { id: "draft", label: "Drafts" },
              { id: "archived", label: "Archived" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="flex items-center gap-3">
            <Button variant="glass" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
            <Button variant="glass" leftIcon={<Sparkles className="w-4 h-4" />}>AI Research</Button>
            <Button onClick={() => setShowImport(true)} leftIcon={<Plus className="w-4 h-4" />}>
              Import Product
            </Button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(p) => p.id}
          searchable
          searchPlaceholder="Search products..."
          loading={loading}
          emptyMessage="No products found. Import your first product!"
          onRowClick={(p) => window.location.href = `/products/${p.id}`}
        />
      </div>

      {/* Import Modal */}
      <Modal isOpen={showImport} onClose={() => setShowImport(false)} title="Import Product" size="lg">
        <div className="space-y-4">
          <Input placeholder="Product URL (AliExpress, Amazon, Shopify, etc.)" leftIcon={<Search className="w-4 h-4" />} />
          <div className="p-4 glass rounded-2xl text-center">
            <p className="text-sm text-text-muted">Or paste a product URL from any supported platform</p>
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
  { id: "1", title: "Smart Watch Pro Max", price: 89.99, costPrice: 35, sales: 234, revenue: 20877, status: "active", aiScore: 92, trend: "up", category: "Electronics", createdAt: "2026-01-15" },
  { id: "2", title: "Wireless Earbuds Gen3", price: 49.99, costPrice: 18, sales: 189, revenue: 9448, status: "active", aiScore: 88, trend: "up", category: "Electronics", createdAt: "2026-01-20" },
  { id: "3", title: "Phone Gripper Pro", price: 19.99, costPrice: 7, sales: 156, revenue: 3118, status: "active", aiScore: 79, trend: "up", category: "Accessories", createdAt: "2026-02-01" },
  { id: "4", title: "LED Strip Lights 2.0", price: 24.99, costPrice: 9, sales: 142, revenue: 3548, status: "draft", aiScore: 85, trend: "up", category: "Home", createdAt: "2026-02-05" },
  { id: "5", title: "Fitness Tracker Band", price: 39.99, costPrice: 15, sales: 98, revenue: 3919, status: "active", aiScore: 73, trend: "down", category: "Electronics", createdAt: "2026-02-10" },
  { id: "6", title: "Portable Charger 20000mAh", price: 34.99, costPrice: 12, sales: 87, revenue: 3044, status: "draft", aiScore: 81, trend: "up", category: "Electronics", createdAt: "2026-02-15" },
  { id: "7", title: "Aromatherapy Diffuser", price: 29.99, costPrice: 11, sales: 76, revenue: 2279, status: "archived", aiScore: 65, trend: "down", category: "Home", createdAt: "2026-01-05" },
  { id: "8", title: "Pet Hair Remover", price: 14.99, costPrice: 5, sales: 212, revenue: 3177, status: "active", aiScore: 90, trend: "up", category: "Pets", createdAt: "2026-03-01" },
];