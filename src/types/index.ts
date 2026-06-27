export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  costPrice: number;
  images: string[];
  category: string;
  tags: string[];
  supplier: string;
  status: "draft" | "active" | "paused" | "archived";
  sales: number;
  revenue: number;
  profit: number;
  profitMargin: number;
  views: number;
  trend: "up" | "down" | "stable";
  createdAt: string;
  aiScore?: number;
}

export interface Order {
  id: string;
  productId: string;
  productTitle: string;
  quantity: number;
  total: number;
  profit: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  customer: {
    name: string;
    email: string;
    address?: string;
  };
  tracking?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  platform: "shopify" | "woocommerce" | "custom";
  url: string;
  status: "active" | "disconnected" | "setup";
  products: number;
  orders: number;
  revenue: number;
  createdAt: string;
}

export interface Analytics {
  revenue: { value: number; change: number; trend: "up" | "down" };
  orders: { value: number; change: number; trend: "up" | "down" };
  profit: { value: number; change: number; trend: "up" | "down" };
  conversionRate: { value: number; change: number; trend: "up" | "down" };
  averageOrderValue: { value: number; change: number; trend: "up" | "down" };
  traffic: { value: number; change: number; trend: "up" | "down" };
}

export interface AITrend {
  id: string;
  productName: string;
  platform: "tiktok" | "instagram" | "facebook" | "youtube" | "google";
  trendScore: number;
  growthRate: number;
  estimatedDemand: "high" | "medium" | "low";
  competition: "low" | "medium" | "high";
  profitPotential: number;
  sentiment: "positive" | "neutral" | "negative";
  sources: { platform: string; url: string; engagement: number }[];
}