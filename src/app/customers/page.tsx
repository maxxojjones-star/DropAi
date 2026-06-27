"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { useState } from "react";
import { Users, Mail, DollarSign, ShoppingCart, Eye, TrendingUp, MessageCircle } from "lucide-react";

interface Customer {
  id: string; name: string; email: string; totalOrders: number;
  totalSpent: number; avgOrderValue: number; lastOrder: string;
  status: string; tags: string[]; lifetimeValue: number;
}

export default function CustomersPage() {
  const [customers] = useState<Customer[]>(mockCustomers);

  const stats = [
    { label: "Total Customers", value: customers.length, icon: Users, change: "+12%" },
    { label: "Active", value: customers.filter((c) => c.status === "active").length, icon: Eye, change: "+8%" },
    { label: "Avg LTV", value: `$${(customers.reduce((s, c) => s + c.lifetimeValue, 0) / customers.length).toFixed(0)}`, icon: TrendingUp, change: "+15%" },
    { label: "Repeat Rate", value: "68%", icon: ShoppingCart, change: "+5%" },
  ];

  const columns: Column<Customer>[] = [
    { key: "name", header: "Customer", sortable: true, width: "25%",
      render: (c) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-brand-subtle flex items-center justify-center text-sm font-bold text-brand-400">
            {c.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-medium">{c.name}</p>
            <p className="text-xs text-text-muted">{c.email}</p>
          </div>
        </div>
      )
    },
    { key: "totalOrders", header: "Orders", sortable: true },
    { key: "totalSpent", header: "Total Spent", sortable: true,
      render: (c) => <span className="font-medium">${c.totalSpent.toFixed(2)}</span>
    },
    { key: "avgOrderValue", header: "AOV", sortable: true,
      render: (c) => <span>${c.avgOrderValue.toFixed(2)}</span>
    },
    { key: "lifetimeValue", header: "LTV", sortable: true,
      render: (c) => <span className="font-medium text-emerald-500">${c.lifetimeValue.toFixed(2)}</span>
    },
    { key: "lastOrder", header: "Last Order", sortable: true,
      render: (c) => <span className="text-xs text-text-muted">{c.lastOrder}</span>
    },
    { key: "status", header: "Status",
      render: (c) => (
        <Badge variant={c.status === "active" ? "success" : c.status === "new" ? "info" : "warning"}>{c.status}</Badge>
      )
    },
    { key: "tags", header: "Tags",
      render: (c) => (
        <div className="flex gap-1 flex-wrap">
          {c.tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="default" size="sm">{t}</Badge>
          ))}
          {c.tags.length > 2 && <Badge size="sm">+{c.tags.length - 2}</Badge>}
        </div>
      )
    },
  ];

  return (
    <DashboardLayout title="Customers" breadcrumbs={[{ label: "Customers" }]}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} glass>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-brand-subtle flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-text-muted">{s.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DataTable
          columns={columns}
          data={customers}
          keyExtractor={(c) => c.id}
          searchable
          searchPlaceholder="Search customers..."
          emptyMessage="No customers found"
        />
      </div>
    </DashboardLayout>
  );
}

const mockCustomers: Customer[] = [
  { id: "c1", name: "John Smith", email: "john@example.com", totalOrders: 12, totalSpent: 1079.88, avgOrderValue: 89.99, lastOrder: "2 days ago", status: "active", tags: ["VIP", "Repeat"], lifetimeValue: 1079.88 },
  { id: "c2", name: "Sarah Johnson", email: "sarah@example.com", totalOrders: 8, totalSpent: 639.92, avgOrderValue: 79.99, lastOrder: "5 days ago", status: "active", tags: ["Repeat"], lifetimeValue: 639.92 },
  { id: "c3", name: "Mike Chen", email: "mike@example.com", totalOrders: 3, totalSpent: 149.97, avgOrderValue: 49.99, lastOrder: "1 week ago", status: "active", tags: ["New"], lifetimeValue: 149.97 },
  { id: "c4", name: "Emily Davis", email: "emily@example.com", totalOrders: 15, totalSpent: 1498.50, avgOrderValue: 99.90, lastOrder: "3 days ago", status: "active", tags: ["VIP", "Repeat", "High Value"], lifetimeValue: 1498.50 },
  { id: "c5", name: "Alex Wilson", email: "alex@example.com", totalOrders: 1, totalSpent: 89.99, avgOrderValue: 89.99, lastOrder: "2 weeks ago", status: "new", tags: ["New"], lifetimeValue: 89.99 },
  { id: "c6", name: "Lisa Brown", email: "lisa@example.com", totalOrders: 6, totalSpent: 359.94, avgOrderValue: 59.99, lastOrder: "1 week ago", status: "active", tags: ["Repeat"], lifetimeValue: 359.94 },
];