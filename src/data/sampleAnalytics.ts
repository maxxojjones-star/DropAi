// DropAI - Sample Analytics Data
// Analytics data for UI development
import type { AIAnalytics } from "@/types/ai";

export const sampleAnalytics: AIAnalytics = {
  totalProductsAnalyzed: 2847,
  averageScore: 74.3,
  topCategories: [
    { category: "Beauty & Skincare", count: 523, avgScore: 82.1 },
    { category: "Health & Wellness", count: 412, avgScore: 79.6 },
    { category: "Electronics & Gadgets", count: 389, avgScore: 71.2 },
    { category: "Pets & Animals", count: 245, avgScore: 76.8 },
    { category: "Travel & Outdoors", count: 198, avgScore: 73.4 },
  ],
  trendAccuracy: 87.3,
  forecastingAccuracy: 82.6,
};

export const monthlyAnalytics = [
  { month: "Jan", products: 320, avgScore: 72, revenue: 12400, orders: 520 },
  { month: "Feb", products: 350, avgScore: 73, revenue: 13800, orders: 580 },
  { month: "Mar", products: 410, avgScore: 74, revenue: 15200, orders: 640 },
  { month: "Apr", products: 450, avgScore: 75, revenue: 16800, orders: 710 },
  { month: "May", products: 490, avgScore: 74, revenue: 18200, orders: 780 },
  { month: "Jun", products: 520, avgScore: 76, revenue: 19500, orders: 820 },
  { month: "Jul", products: 560, avgScore: 75, revenue: 21000, orders: 890 },
  { month: "Aug", products: 580, avgScore: 77, revenue: 22500, orders: 940 },
  { month: "Sep", products: 610, avgScore: 76, revenue: 23800, orders: 1000 },
  { month: "Oct", products: 640, avgScore: 78, revenue: 25200, orders: 1060 },
  { month: "Nov", products: 680, avgScore: 79, revenue: 27800, orders: 1150 },
  { month: "Dec", products: 720, avgScore: 80, revenue: 32000, orders: 1320 },
];

export const performanceMetrics = {
  conversionRate: 3.2,
  averageOrderValue: 38.50,
  customerAcquisitionCost: 12.40,
  returnOnAdSpend: 3.8,
  customerLifetimeValue: 156.00,
  churnRate: 2.1,
  emailOpenRate: 24.5,
  clickThroughRate: 3.8,
};

export const scoreDistribution = [
  { range: "90-100", count: 142, label: "Excellent" },
  { range: "80-89", count: 385, label: "Great" },
  { range: "70-79", count: 620, label: "Good" },
  { range: "60-69", count: 480, label: "Fair" },
  { range: "0-59", count: 320, label: "Poor" },
];