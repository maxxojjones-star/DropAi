"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import {
  Sparkles,
  Store,
  TrendingUp,
  Bot,
  BarChart3,
  Globe,
  ArrowRight,
  Star,
  Shield,
  Zap,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function HomePage() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-surface-bg">
      {/* Noise overlay */}
      <div className="noise-bg" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-surface-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="text-xl font-bold gradient-text">DropAI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" variant="gradient">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/3 left-1/4 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span className="text-sm text-text-secondary">
                AI-Powered Dropshipping Operating System
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              Replace{" "}
              <span className="gradient-text">12+ Tools</span>
              <br />
              With One AI Platform
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-text-secondary max-w-2xl mx-auto mb-10"
            >
              DropAI combines AI product research, store building, marketing, and
              automation into a single unified platform. Stop juggling tools and
              start scaling.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="xl" variant="gradient" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="xl" variant="glass">
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-8 mt-12 text-sm text-text-muted"
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> No credit card
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> 14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-400" /> Cancel anytime
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={stagger}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Scale</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-text-secondary max-w-2xl mx-auto">
              From product discovery to customer delivery — DropAI handles every step with AI.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-brand-subtle flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-brand-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-border">
        <div className="absolute inset-0 bg-gradient-brand opacity-[0.03]" />
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Dropshipping Business?
            </h2>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of dropshippers who scaled their business with DropAI.
              Start free, no credit card required.
            </p>
            <Link href="/signup">
              <Button size="xl" variant="gradient" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-text-muted">
          <p>&copy; 2026 DropAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: Sparkles,
    title: "AI Product Research",
    description:
      "Discover viral products before they trend. Our AI analyzes millions of data points across TikTok, Shopify, and social media.",
  },
  {
    icon: Store,
    title: "AI Store Builder",
    description:
      "Launch a professional dropshipping store in minutes. AI generates optimized product pages, collections, and branding.",
  },
  {
    icon: TrendingUp,
    title: "Trend Detection",
    description:
      "Real-time trend analysis across TikTok, Instagram, YouTube, and Google. Never miss the next winning product.",
  },
  {
    icon: Bot,
    title: "AI Automations",
    description:
      "Automate order fulfillment, inventory management, pricing, and customer service with intelligent AI workflows.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive dashboards with profit tracking, conversion metrics, and AI-powered optimization recommendations.",
  },
  {
    icon: Globe,
    title: "Supplier Marketplace",
    description:
      "Access vetted suppliers, negotiate better rates, and automate ordering through our integrated marketplace.",
  },
];