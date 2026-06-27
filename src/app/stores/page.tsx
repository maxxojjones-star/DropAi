"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { Store, Plus, ShoppingBag, ExternalLink, CheckCircle, XCircle, AlertCircle, Globe } from "lucide-react";

interface StoreItem {
  id: string;
  name: string;
  platform: string;
  url: string;
  status: string;
  products: number;
  orders: number;
  revenue: number;
}

export default function StoresPage() {
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await fetch("/api/stores");
      const data = await res.json();
      setStores(data.stores || mockStores);
    } catch {
      setStores(mockStores);
    } finally {
      setLoading(false);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "disconnected": return <XCircle className="w-5 h-5 text-red-400" />;
      case "setup": return <AlertCircle className="w-5 h-5 text-amber-400" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout title="Stores" breadcrumbs={[{ label: "Stores" }]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-muted text-sm">{stores.length} store{stores.length !== 1 ? "s" : ""} connected</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Store
          </Button>
        </div>

        {/* Store Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-1/3 mb-4" />
                <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-1/2 mb-2" />
                <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {stores.map((store) => (
              <Card key={store.id} hover glass>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-brand-subtle flex items-center justify-center">
                      <Store className="w-6 h-6 text-brand-400" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {store.name}
                        <Badge size="sm" variant={
                          store.platform === "shopify" ? "info" :
                          store.platform === "woocommerce" ? "warning" : "default"
                        }>
                          {store.platform}
                        </Badge>
                      </CardTitle>
                      <a href={store.url} target="_blank" className="text-xs text-text-muted hover:text-brand-400 flex items-center gap-1">
                        {store.url} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {statusIcon(store.status)}
                      <span className="text-sm capitalize">{store.status}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold">{store.products}</p>
                      <p className="text-xs text-text-muted">Products</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{store.orders}</p>
                      <p className="text-xs text-text-muted">Orders</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">${store.revenue.toLocaleString()}</p>
                      <p className="text-xs text-text-muted">Revenue</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    <Button variant="glass" size="sm" isFullWidth>Dashboard</Button>
                    <Button variant="glass" size="sm" isFullWidth>Settings</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add Store Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Connect a Store" size="lg">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: "shopify", name: "Shopify", desc: "Connect your Shopify store", icon: ShoppingBag, color: "bg-emerald-500/10 text-emerald-400" },
              { id: "woocommerce", name: "WooCommerce", desc: "Self-hosted WordPress store", icon: Globe, color: "bg-violet-500/10 text-violet-400" },
              { id: "custom", name: "Custom API", desc: "Custom store via REST API", icon: Plus, color: "bg-brand-500/10 text-brand-400" },
              { id: "manual", name: "Manual Entry", desc: "Add products manually", icon: Store, color: "bg-amber-500/10 text-amber-400" },
            ].map((p) => (
              <button key={p.id} className="glass-card p-6 text-left hover:border-brand-500/30 transition-all">
                <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center mb-3`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <p className="text-sm text-text-muted">{p.desc}</p>
              </button>
            ))}
          </div>
          <div className="p-4 glass rounded-2xl">
            <p className="text-sm text-text-muted text-center">
              Your store data stays synced in real-time. Connect multiple stores to manage them all from one dashboard.
            </p>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

const mockStores: StoreItem[] = [
  { id: "store_1", name: "Main Store", platform: "shopify", url: "https://mainstore.myshopify.com", status: "active", products: 45, orders: 234, revenue: 48290 },
  { id: "store_2", name: "Europe Store", platform: "shopify", url: "https://eustore.myshopify.com", status: "active", products: 28, orders: 89, revenue: 18340 },
  { id: "store_3", name: "Test Store", platform: "woocommerce", url: "https://teststore.com", status: "setup", products: 0, orders: 0, revenue: 0 },
];