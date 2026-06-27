"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Accordion";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import {
  Store,
  Package,
  Globe,
  Sparkles,
  ChevronRight,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useUIStore } from "@/lib/stores";

const steps = [
  { id: "welcome", label: "Welcome", title: "Welcome to DropAI ✨" },
  { id: "store", label: "Connect Store", title: "Connect Your Store" },
  { id: "niche", label: "Choose Niche", title: "What Are You Selling?" },
  { id: "ai", label: "AI Setup", title: "Let AI Do the Heavy Lifting" },
  { id: "done", label: "Done", title: "You're All Set! 🚀" },
];

export function OnboardingWizard() {
  const { isOnboardingOpen, setOnboardingOpen } = useUIStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [storeUrl, setStoreUrl] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);

  if (!isOnboardingOpen) return null;

  const niches = [
    { id: "fashion", label: "Fashion & Apparel", emoji: "👕" },
    { id: "electronics", label: "Electronics & Gadgets", emoji: "📱" },
    { id: "home", label: "Home & Garden", emoji: "🏠" },
    { id: "beauty", label: "Beauty & Health", emoji: "💄" },
    { id: "sports", label: "Sports & Outdoors", emoji: "⚽" },
    { id: "pets", label: "Pet Supplies", emoji: "🐾" },
    { id: "toys", label: "Toys & Hobbies", emoji: "🎮" },
    { id: "automotive", label: "Automotive", emoji: "🚗" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setOnboardingOpen(false);
    }
  };

  const toggleNiche = (id: string) => {
    setSelectedNiches((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-brand flex items-center justify-center shadow-glow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-lg text-text-secondary">
                Your all-in-one AI dropshipping OS. Let&apos;s get you set up in
                under 2 minutes.
              </p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-center gap-4 mb-4">
                <Store className="w-8 h-8 text-brand-400" />
                <div>
                  <h3 className="font-semibold">Connect Your Store</h3>
                  <p className="text-sm text-text-muted">
                    Link your Shopify or WooCommerce store
                  </p>
                </div>
              </div>
              <Input
                placeholder="https://yourstore.myshopify.com"
                value={storeUrl}
                onChange={(e) => setStoreUrl(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="glass" leftIcon={<Globe className="w-4 h-4" />}>
                Connect Shopify
              </Button>
              <Button variant="glass">Connect WooCommerce</Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-text-secondary">Select the niches you&apos;re interested in (pick at least 2):</p>
            <div className="grid grid-cols-2 gap-3">
              {niches.map((niche) => (
                <button
                  key={niche.id}
                  onClick={() => toggleNiche(niche.id)}
                  className={cn(
                    "p-4 rounded-2xl text-left transition-all duration-200 border",
                    selectedNiches.includes(niche.id)
                      ? "bg-gradient-brand-subtle border-brand-500/30 shadow-inner-glow"
                      : "glass hover:border-brand-500/20"
                  )}
                >
                  <span className="text-2xl mb-2 block">{niche.emoji}</span>
                  <span className="text-sm font-medium">{niche.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h4 className="font-medium">AI Product Research</h4>
                  <p className="text-xs text-text-muted">
                    Find winning products in your niche
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <Store className="w-5 h-5 text-accent-400" />
                </div>
                <div>
                  <h4 className="font-medium">Auto Store Setup</h4>
                  <p className="text-xs text-text-muted">
                    AI builds your store pages
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium">Smart Automation</h4>
                  <p className="text-xs text-text-muted">
                    Orders, pricing, and ads automated
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-brand-subtle border border-brand-500/20">
              <p className="text-sm text-text-secondary">
                DropAI will analyze trends, import winning products, and set up
                your store automatically.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-semibold mb-2">Setup Complete!</p>
              <p className="text-text-secondary">
                Your AI dropshipping engine is ready. Let&apos;s find your first
                winning product.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl glass-strong rounded-3xl shadow-glass-lg p-8"
      >
        {/* Close */}
        <button
          onClick={() => setOnboardingOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>

        {/* Stepper */}
        <Stepper
          steps={steps.map((s) => ({ label: s.label }))}
          currentStep={currentStep}
          className="mb-8"
        />

        {/* Step title */}
        <h2 className="text-2xl font-bold mb-6">{steps[currentStep].title}</h2>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          <Button
            variant="gradient"
            onClick={handleNext}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Continue"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}