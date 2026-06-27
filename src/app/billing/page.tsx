"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { Check, Zap, Star, Crown, CreditCard, FileText, Ticket, Shield, ArrowRight } from "lucide-react";

const plans = [
  { id: "free", name: "Free", price: "$0", desc: "Perfect for getting started", features: ["1 Store", "50 orders/mo", "Basic AI research", "Community support"], popular: false },
  { id: "starter", name: "Starter", price: "$29", desc: "For aspiring dropshippers", features: ["3 Stores", "500 orders/mo", "AI store builder", "Basic analytics", "Email support"], popular: false },
  { id: "pro", name: "Pro", price: "$79", desc: "For serious sellers", features: ["10 Stores", "5,000 orders/mo", "AI marketing center", "Advanced analytics", "Automation", "Priority support", "Marketplace access"], popular: true },
  { id: "scale", name: "Scale", price: "$199", desc: "For scaling businesses", features: ["Unlimited stores", "Unlimited orders", "AI business coach", "Team features", "White-label options", "Dedicated support", "API access", "Custom integrations"], popular: false },
];

const invoices = [
  { id: "INV-001", date: "Jun 1, 2026", amount: "$79.00", status: "paid", plan: "Pro" },
  { id: "INV-002", date: "May 1, 2026", amount: "$79.00", status: "paid", plan: "Pro" },
  { id: "INV-003", date: "Apr 1, 2026", amount: "$29.00", status: "paid", plan: "Starter" },
];

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  return (
    <DashboardLayout title="Billing" breadcrumbs={[{ label: "Settings" }, { label: "Billing" }]}>
      <div className="space-y-8">
        {/* Current Plan */}
        <div className="p-6 glass rounded-3xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Pro Plan</h2>
              <p className="text-text-muted text-sm">
                $79/mo &middot; Renews Jul 24, 2026 &middot; <span className="text-emerald-500">Active</span>
              </p>
            </div>
          </div>
          <Badge variant="premium" size="lg">Current Plan</Badge>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              billingCycle === "monthly" ? "bg-brand-500 text-white" : "glass"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              billingCycle === "annual" ? "bg-brand-500 text-white" : "glass"
            }`}
          >
            Annual <span className="text-emerald-400 ml-1 text-xs">Save 20%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => {
            const isCurrent = plan.id === currentPlan;
            const annualPrice = billingCycle === "annual" ? Math.round(parseInt(plan.price.replace("$", "0")) * 12 * 0.8) : null;

            return (
              <Card
                key={plan.id}
                className={`relative ${plan.popular ? "ring-2 ring-brand-500" : ""} ${isCurrent ? "border-brand-500" : ""}`}
                glass
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="premium" size="sm"><Zap className="w-3 h-3 mr-1" /> Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "$0" && <span className="text-text-muted text-sm">/mo</span>}
                    {annualPrice && billingCycle === "annual" && (
                      <p className="text-xs text-emerald-500 mt-1">${annualPrice}/yr (${Math.round(annualPrice / 12)}/mo)</p>
                    )}
                  </div>
                  <p className="text-sm text-text-muted mb-4">{plan.desc}</p>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    isFullWidth
                    variant={isCurrent ? "glass" : plan.popular ? "gradient" : "secondary"}
                    onClick={() => setCurrentPlan(plan.id)}
                    disabled={isCurrent}
                    rightIcon={!isCurrent ? <ArrowRight className="w-4 h-4" /> : undefined}
                  >
                    {isCurrent ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Coupon + Payment */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Ticket className="w-4 h-4" /> Coupon Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input placeholder="Enter coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                <Button variant="glass" onClick={() => setCouponApplied(true)} disabled={!coupon}>Apply</Button>
              </div>
              {couponApplied && <p className="text-xs text-emerald-500">Coupon applied! 20% discount for 3 months.</p>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 glass rounded-xl flex items-center gap-3 mb-3">
                <div className="w-10 h-7 rounded bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center text-[8px] text-white font-bold">MC</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-text-muted">Expires 12/28</p>
                </div>
                <Badge variant="success" size="sm">Default</Badge>
              </div>
              <Button variant="glass" isFullWidth>Add Payment Method</Button>
            </CardContent>
          </Card>
        </div>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="w-4 h-4" /> Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-3 glass rounded-xl">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-text-muted" />
                    <div>
                      <p className="text-sm font-medium">{inv.id}</p>
                      <p className="text-xs text-text-muted">{inv.date} &middot; {inv.plan}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">${inv.amount}</span>
                    <Badge variant={inv.status === "paid" ? "success" : "warning"} size="sm">{inv.status}</Badge>
                    <Button variant="ghost" size="sm">Download</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}