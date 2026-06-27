// DropAI - Business Coach Service
// AI business coach with personalized recommendations
import { createChatCompletion, getMockMode } from "./aiClient";
import type { BusinessCoachRecommendation } from "@/types/ai";

export async function getRecommendations(storeData: { revenue: number; products: number; orders: number; adSpend: number }): Promise<BusinessCoachRecommendation[]> {
  if (getMockMode()) {
    return [
      { id: "rec-1", category: "products", priority: "high", title: "Expand Your Product Catalog", description: "Add 5-10 more trending products to increase your catalog size. Stores with 50+ products see 3x more revenue.", impact: "High revenue growth", effort: "medium", actionable: true, steps: ["Research trending products in your niche", "Import top 10 products using AI product research", "Optimize product listings for conversions"], metrics: ["Product count", "Revenue per visitor"] },
      { id: "rec-2", category: "marketing", priority: "critical", title: "Optimize Ad Campaigns", description: "Your ad spend efficiency can be improved by retargeting visitors who didn't convert.", impact: "Reduce CPA by 30%", effort: "medium", actionable: true, steps: ["Set up Facebook Pixel retargeting", "Create lookalike audiences from converters", "A/B test your ad creatives"], metrics: ["ROAS", "CPA", "Conversion rate"] },
      { id: "rec-3", category: "pricing", priority: "high", title: "Dynamic Pricing Strategy", description: "Adjust prices based on competitor movement and demand to maximize margins.", impact: "Increase profit margins by 15-20%", effort: "low", actionable: true, steps: ["Enable AI pricing optimizer", "Set minimum and maximum price bounds", "Monitor competitor prices weekly"], metrics: ["Average order value", "Profit margin"] },
      { id: "rec-4", category: "operations", priority: "medium", title: "Automate Order Fulfillment", description: "Set up automated order routing to reduce processing time and errors.", impact: "Save 10+ hours/week", effort: "medium", actionable: true, steps: ["Connect supplier APIs", "Set up auto-ordering rules", "Configure tracking notifications"], metrics: ["Order processing time", "Error rate"] },
      { id: "rec-5", category: "growth", priority: "low", title: "Build Email Marketing Funnel", description: "Capture emails and create automated sequences to drive repeat purchases.", impact: "Increase LTV by 40%", effort: "high", actionable: true, steps: ["Set up email capture popup", "Create welcome sequence", "Build abandoned cart emails"], metrics: ["Email capture rate", "Open rate", "Repeat purchase rate"] },
    ];
  }
  try {
    const response = await createChatCompletion([
      { role: "system", content: "You are a dropshipping business coach. Provide actionable recommendations. Return JSON array." },
      { role: "user", content: `Analyze this store: Revenue $${storeData.revenue}, Products ${storeData.products}, Orders ${storeData.orders}, Ad spend $${storeData.adSpend}. Give top 5 recommendations.` },
    ]);
    return JSON.parse(response.choices[0]?.message?.content?.replace(/```json|```/g, "").trim() || "[]");
  } catch { return []; }
}

export async function askCoach(question: string): Promise<string> {
  if (getMockMode()) return "Great question! Based on industry data, I recommend focusing on product research first. Find products with high demand (score 80+) and low competition. Use our AI product research tool to discover trending items with good margins (70%+). Once you have 10-20 solid products, invest in Facebook/Instagram ads with a $10-20 daily budget to test.";
  try {
    const r = await createChatCompletion([
      { role: "system", content: "You are an expert dropshipping business coach. Give specific, actionable advice." },
      { role: "user", content: question },
    ]);
    return r.choices[0]?.message?.content || "";
  } catch { return "I'd be happy to help! Could you please rephrase your question?"; }
}

// Profit Optimizer Service
export async function optimizeProfit(storeData: { revenue: number; cost: number; adSpend: number; fees: number }): Promise<{ currentProfit: number; optimizedProfit: number; savings: number; recommendations: { area: string; title: string; savings: number; difficulty: string }[] }> {
  const currentProfit = storeData.revenue - storeData.cost - storeData.adSpend - storeData.fees;
  if (getMockMode()) {
    return {
      currentProfit,
      optimizedProfit: Math.round(currentProfit * 1.35),
      savings: Math.round(currentProfit * 0.35),
      recommendations: [
        { area: "supplier", title: "Negotiate bulk discounts with suppliers", savings: Math.round(storeData.cost * 0.12), difficulty: "medium" },
        { area: "advertising", title: "Optimize ad targeting to reduce CPA", savings: Math.round(storeData.adSpend * 0.25), difficulty: "medium" },
        { area: "shipping", title: "Negotiate better shipping rates", savings: Math.round(storeData.fees * 0.15), difficulty: "easy" },
        { area: "pricing", title: "Increase prices by 5-10% on top products", savings: Math.round(storeData.revenue * 0.07), difficulty: "easy" },
      ],
    };
  }
  try {
    const r = await createChatCompletion([{ role: "user", content: `Optimize profits for store: revenue $${storeData.revenue}, cost $${storeData.cost}, ad spend $${storeData.adSpend}, fees $${storeData.fees}.` }]);
    return JSON.parse(r.choices[0]?.message?.content?.replace(/```json|```/g, "").trim() || "{}");
  } catch { return { currentProfit, optimizedProfit: currentProfit, savings: 0, recommendations: [] }; }
}