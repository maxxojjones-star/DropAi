"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Stepper } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  Store,
  Target,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  ArrowRight,
  SkipForward,
} from "lucide-react";

const steps = [
  { id: "store", label: "Store Setup" },
  { id: "goals", label: "Goals" },
  { id: "integrations", label: "Integrations" },
  { id: "preview", label: "AI Preview" },
];

const industries = [
  { id: "fashion", label: "Fashion & Apparel", emoji: "👕" },
  { id: "electronics", label: "Electronics", emoji: "📱" },
  { id: "home", label: "Home & Garden", emoji: "🏠" },
  { id: "beauty", label: "Beauty & Health", emoji: "💄" },
  { id: "sports", label: "Sports & Outdoors", emoji: "⚽" },
  { id: "pets", label: "Pet Supplies", emoji: "🐾" },
  { id: "toys", label: "Toys & Hobbies", emoji: "🎮" },
  { id: "automotive", label: "Automotive", emoji: "🚗" },
  { id: "jewelry", label: "Jewelry & Accessories", emoji: "💎" },
  { id: "other", label: "Other", emoji: "✨" },
];

const revenueTargets = [
  { id: "side", label: "Side Hustle", target: "Under $1K/mo", icon: "🌱" },
  { id: "supplement", label: "Supplement Income", target: "$1K - $5K/mo", icon: "📈" },
  { id: "fulltime", label: "Full-Time Income", target: "$5K - $20K/mo", icon: "🚀" },
  { id: "scale", label: "Scale & Grow", target: "$20K+/mo", icon: "🔥" },
];

const experienceLevels = [
  { id: "beginner", label: "Just Starting", icon: "🌱" },
  { id: "intermediate", label: "Some Experience", icon: "📊" },
  { id: "advanced", label: "Experienced", icon: "🏆" },
  { id: "expert", label: "Ecom Pro", icon: "👑" },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [storeName, setStoreName] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [revenueTarget, setRevenueTarget] = useState("");
  const [experience, setExperience] = useState("");
  const [platform, setPlatform] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleComplete = async () => {
    setIsSaving(true);
    // Simulate saving
    await new Promise((r) => setTimeout(r, 1000));
    window.location.href = "/dashboard";
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return storeName.length > 0 && selectedIndustry;
      case 1: return revenueTarget && experience;
      case 2: return true; // optional
      case 3: return true;
      default: return true;
    }
  };

  return (
    <DashboardLayout title="Welcome to DropAI">
      <div className="max-w-3xl mx-auto">
        {/* Stepper */}
        <Stepper steps={steps} currentStep={currentStep} className="mb-12" />

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Step 1: Store Setup */}
            {currentStep === 0 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 shadow-glow">
                    <Store className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Set Up Your Store</h2>
                  <p className="text-text-muted mt-2">Tell us about your dropshipping business</p>
                </div>

                <Input
                  label="Store Name"
                  placeholder="My Awesome Store"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">Industry / Niche</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {industries.map((ind) => (
                      <button
                        key={ind.id}
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={`p-3 rounded-2xl text-center transition-all duration-200 border ${
                          selectedIndustry === ind.id
                            ? "bg-gradient-brand-subtle border-brand-500/30 shadow-inner-glow"
                            : "glass hover:border-brand-500/20"
                        }`}
                      >
                        <span className="text-2xl block mb-1">{ind.emoji}</span>
                        <span className="text-xs font-medium">{ind.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Goals */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 shadow-glow">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Set Your Goals</h2>
                  <p className="text-text-muted mt-2">Help us tailor DropAI to your needs</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    Monthly Revenue Target
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {revenueTargets.map((rt) => (
                      <button
                        key={rt.id}
                        onClick={() => setRevenueTarget(rt.id)}
                        className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
                          revenueTarget === rt.id
                            ? "bg-gradient-brand-subtle border-brand-500/30 shadow-inner-glow"
                            : "glass hover:border-brand-500/20"
                        }`}
                      >
                        <span className="text-2xl mb-1 block">{rt.icon}</span>
                        <span className="text-sm font-medium block">{rt.label}</span>
                        <span className="text-xs text-text-muted">{rt.target}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-3">
                    Dropshipping Experience
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {experienceLevels.map((el) => (
                      <button
                        key={el.id}
                        onClick={() => setExperience(el.id)}
                        className={`p-4 rounded-2xl text-center transition-all duration-200 border ${
                          experience === el.id
                            ? "bg-gradient-brand-subtle border-brand-500/30 shadow-inner-glow"
                            : "glass hover:border-brand-500/20"
                        }`}
                      >
                        <span className="text-2xl block mb-1">{el.icon}</span>
                        <span className="text-sm font-medium">{el.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Integrations */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 shadow-glow">
                    <ShoppingBag className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Connect Your Store</h2>
                  <p className="text-text-muted mt-2">Link your e-commerce platform (optional, can be done later)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "shopify", label: "Shopify", desc: "Connect your Shopify store", color: "bg-emerald-500/10 text-emerald-400" },
                    { id: "woocommerce", label: "WooCommerce", desc: "Connect your WordPress store", color: "bg-violet-500/10 text-violet-400" },
                    { id: "custom", label: "Custom API", desc: "Use our API for custom stores", color: "bg-brand-500/10 text-brand-400" },
                    { id: "later", label: "Skip for Now", desc: "Set up integration later", color: "bg-surface-100 dark:bg-surface-800 text-text-muted" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`p-6 rounded-2xl text-left transition-all duration-200 border ${
                        platform === p.id
                          ? "bg-gradient-brand-subtle border-brand-500/30 shadow-inner-glow"
                          : "glass hover:border-brand-500/20"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center mb-3`}>
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold mb-1">{p.label}</h3>
                      <p className="text-sm text-text-muted">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: AI Preview */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-brand flex items-center justify-center mb-4 shadow-glow">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">AI Product Preview</h2>
                  <p className="text-text-muted mt-2">Our AI found these trending products for you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Smart Watch Pro", price: "$89.99", margin: "45%", score: 92, trend: "🔥 Trending" },
                    { name: "Wireless Earbuds Gen3", price: "$49.99", margin: "52%", score: 88, trend: "📈 Rising" },
                    { name: "LED Strip Lights 2.0", price: "$24.99", margin: "61%", score: 85, trend: "📈 Rising" },
                    { name: "Phone Gripper Pro", price: "$19.99", margin: "58%", score: 79, trend: "🔥 Trending" },
                  ].map((product) => (
                    <div key={product.name} className="glass-card p-4 flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-brand-subtle flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-6 h-6 text-brand-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm">{product.name}</h3>
                          <Badge variant="success" size="sm">{product.score}</Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm font-semibold">{product.price}</span>
                          <span className="text-xs text-emerald-500">Margin: {product.margin}</span>
                        </div>
                        <p className="text-xs text-text-muted mt-0.5">{product.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-gradient-brand-subtle border border-brand-500/20">
                  <p className="text-sm text-text-secondary text-center">
                    These are AI-generated recommendations based on your niche. Your store will be ready in minutes!
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button variant="ghost" onClick={() => setCurrentStep((prev) => prev - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button variant="ghost" onClick={handleSkip} leftIcon={<SkipForward className="w-4 h-4" />}>
                Skip
              </Button>
            )}
          </div>
          {currentStep < steps.length - 1 ? (
            <Button
              variant="gradient"
              onClick={handleNext}
              disabled={!canProceed()}
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="gradient"
              onClick={handleComplete}
              isLoading={isSaving}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Complete Setup
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}