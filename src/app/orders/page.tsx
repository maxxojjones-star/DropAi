"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { useState, useEffect } from "react";
import { Package, Truck, RefreshCw, DollarSign, TrendingUp, Eye } from "lucide-react";

interface Order {
  id: string;
  productTitle: string;
  quantity: number;
  total: number;
  profit: number;
  status: string;
  customerName: string;
  createdAt: string;
  tracking?: string;
  profitMargin: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || mockOrders);
    } catch {
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const filtered = statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter);

  const stats = [
    { label: "Total Orders", value: orders.length, icon: Package, change: "+12%" },
    { label: "Pending", value: orders.filter((o) => o.status === "pending").length, icon: RefreshCw, change: "+3%" },
    { label: "Revenue", value: `$${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}`, icon: DollarSign, change: "+18%" },
    { label: "Avg. Profit", value: `${(orders.reduce((s, o) => s + o.profitMargin, 0) / (orders.length || 1)).toFixed(1)}%`, icon: TrendingUp, change: "+2.3%" },
  ];

  const columns: Column<Order>[] = [
    { key: "id", header: "Order ID", sortable: true,
      render: (o) => <span className="font-mono text-xs">#{o.id.slice(0, 8).toUpperCase()}</span>
    },
    { key: "productTitle", header: "Product", sortable: true, width: "30%",
      render: (o) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
            <Package className="w-4 h-4 text-text-muted" />
          </div>
          <span className="text-sm">{o.productTitle}</span>
        </div>
      )
    },
    { key: "customerName", header: "Customer", sortable: true },
    { key: "quantity", header: "Qty" },
    { key: "total", header: "Total", sortable: true,
      render: (o) => <span className="font-medium">${o.total.toFixed(2)}</span>
    },
    { key: "profit", header: "Profit", sortable: true,
      render: (o) => <span className="text-emerald-500 font-medium">${o.profit.toFixed(2)}</span>
    },
    { key: "status", header: "Status",
      render: (o) => (
        <Badge
          variant={
            o.status === "delivered" ? "success" :
            o.status === "shipped" ? "info" :
            o.status === "processing" ? "warning" :
            o.status === "cancelled" ? "error" : "default"
          }
        >
          {o.status}
        </Badge>
      )
    },
    { key: "createdAt", header: "Date", sortable: true,
      render: (o) => <span className="text-xs text-text-muted">{new Date(o.createdAt).toLocaleDateString()}</span>
    },
  ];

  return (
    <DashboardLayout title="Orders" breadcrumbs={[{ label: "Orders" }]}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} glass>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-brand-subtle flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-text-muted">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-sm transition-all ${
                statusFilter === s
                  ? "bg-brand-500 text-white"
                  : "glass hover:bg-surface-100 dark:hover:bg-surface-800"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <Button variant="glass" size="sm" leftIcon={<RefreshCw className="w-3 h-3" />}>
              Sync Orders
            </Button>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(o) => o.id}
          searchable
          searchPlaceholder="Search by order ID or customer..."
          loading={loading}
          emptyMessage="No orders found"
          onRowClick={(o) => setSelectedOrder(o)}
        />
      </div>

      {/* Order Detail Modal */}
      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Order #${selectedOrder?.id.slice(0, 8).toUpperCase()}`} size="lg">
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-text-muted mb-1">Product</p>
                <p className="font-medium">{selectedOrder.productTitle}</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-text-muted mb-1">Customer</p>
                <p className="font-medium">{selectedOrder.customerName}</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-text-muted mb-1">Total</p>
                <p className="font-medium text-lg">${selectedOrder.total.toFixed(2)}</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-text-muted mb-1">Profit</p>
                <p className="font-medium text-lg text-emerald-500">${selectedOrder.profit.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button isFullWidth variant="gradient" leftIcon={<Truck className="w-4 h-4" />}>
                Update Fulfillment
              </Button>
              <Button isFullWidth variant="glass">
                View Tracking
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}

const mockOrders: Order[] = [
  { id: "ord_001", productTitle: "Smart Watch Pro Max", quantity: 1, total: 89.99, profit: 54.99, status: "delivered", customerName: "John Smith", createdAt: "2026-06-20T10:30:00Z", profitMargin: 61 },
  { id: "ord_002", productTitle: "Wireless Earbuds Gen3", quantity: 2, total: 99.98, profit: 63.98, status: "shipped", customerName: "Sarah Johnson", createdAt: "2026-06-21T14:00:00Z", profitMargin: 64 },
  { id: "ord_003", productTitle: "Pet Hair Remover", quantity: 1, total: 14.99, profit: 9.99, status: "processing", customerName: "Mike Chen", createdAt: "2026-06-22T09:15:00Z", profitMargin: 66 },
  { id: "ord_004", productTitle: "Phone Gripper Pro", quantity: 3, total: 59.97, profit: 38.97, status: "pending", customerName: "Emily Davis", createdAt: "2026-06-22T16:45:00Z", profitMargin: 65 },
  { id: "ord_005", productTitle: "Smart Watch Pro Max", quantity: 1, total: 89.99, profit: 54.99, status: "delivered", customerName: "Alex Wilson", createdAt: "2026-06-19T11:20:00Z", profitMargin: 61 },
  { id: "ord_006", productTitle: "Fitness Tracker Band", quantity: 1, total: 39.99, profit: 24.99, status: "cancelled", customerName: "Lisa Brown", createdAt: "2026-06-18T08:00:00Z", profitMargin: 62 },
  { id: "ord_007", productTitle: "LED Strip Lights 2.0", quantity: 2, total: 49.98, profit: 31.98, status: "shipped", customerName: "David Kim", createdAt: "2026-06-22T12:30:00Z", profitMargin: 64 },
];