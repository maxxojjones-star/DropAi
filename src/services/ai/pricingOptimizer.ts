// DropAI - Pricing Optimizer Service
// Dynamic pricing suggestions based on market data
import { createChatCompletion, getMockMode } from "./aiClient";
import type { PricingSuggestion } from "@/types/ai";

export async function getPricingSuggestion(product: { title: string; currentPrice: number; cost: number; category: string }): Promise<PricingSuggestion> {
  if (getMockMode()) {
    const optimalMargin = 75;
    const suggestedPrice = Math.round(product.cost / (1 - optimalMargin / 100) * 100) / 100;
    return {
      currentPrice: product.currentPrice,
      suggestedPrice: Math.max(suggestedPrice, product.currentPrice * 0.9),
      minPrice: Math.round(product.cost * 1.5 * 100) / 100,
      maxPrice: Math.round(product.cost * 5 * 100) / 100,
      confidence: Math.round(70 + Math.random() * 20),
      reasoning: [
        `Optimal margin of ${optimalMargin}% suggests pricing around $${suggestedPrice}`,
        `Competitors in ${product.category} typically price 3-5x cost`,
        "Current price is within competitive range but could be optimized",
      ],
      competitorPrices: [product.currentPrice * 0.85, product.currentPrice * 1.1, product.currentPrice * 0.95],
      optimalMargin,
    };
  }
  try {
    const r = await createChatCompletion([{ role: "user", content: `Suggest optimal pricing for: ${product.title} (cost: $${product.cost}, current: $${product.currentPrice}, category: ${product.category}). Return JSON.` }]);
    return JSON.parse(r.choices[0]?.message?.content?.replace(/```json|```/g, "").trim() || "{}");
  } catch { return { currentPrice: product.currentPrice, suggestedPrice: product.currentPrice, minPrice: product.cost * 1.5, maxPrice: product.cost * 4, confidence: 50, reasoning: ["Unable to analyze"], competitorPrices: [], optimalMargin: 50 }; }
}

export function calculateOptimalPrice(cost: number, desiredMarginPercent: number): number {
  return Math.round(cost / (1 - desiredMarginPercent / 100) * 100) / 100;
}

// Sales Forecasting Service
export async function forecastSales(historicalData: number[]): Promise<{ daily: number[]; weekly: number[]; monthly: number[]; confidence: number; trend: string }> {
  if (getMockMode()) {
    const avg = historicalData.length ? historicalData.reduce((a, b) => a + b, 0) / historicalData.length : 100;
    return {
      daily: Array.from({ length: 30 }, (_, i) => Math.round(avg * (0.8 + Math.random() * 0.4) * (1 + i * 0.01))),
      weekly: Array.from({ length: 12 }, () => Math.round(avg * 7 * (0.85 + Math.random() * 0.3))),
      monthly: Array.from({ length: 6 }, (_, i) => Math.round(avg * 30 * (0.9 + Math.random() * 0.2) * (1 + i * 0.03))),
      confidence: Math.round(70 + Math.random() * 20),
      trend: avg > 110 ? "up" : avg < 90 ? "down" : "stable",
    };
  }
  try {
    const r = await createChatCompletion([{ role: "user", content: `Forecast sales from data: [${historicalData.join(", ")}]. Return JSON with daily(30), weekly(12), monthly(6), confidence, trend.` }]);
    return JSON.parse(r.choices[0]?.message?.content?.replace(/```json|```/g, "").trim() || "{}");
  } catch { return { daily: [], weekly: [], monthly: [], confidence: 0, trend: "stable" }; }
}

// Risk Detection Service
export async function assessProductRisk(product: { title: string; supplier: string; price: number; category: string }): Promise<{ overallRisk: string; score: number; risks: { type: string; severity: string; description: string; mitigation: string }[] }> {
  if (getMockMode()) {
    const score = Math.round(30 + Math.random() * 40); // lower is better
    return {
      overallRisk: score < 30 ? "low" : score < 50 ? "medium" : "high",
      score,
      risks: [
        { type: "supplier_reliability", severity: "medium", description: `Supplier ${product.supplier} has average fulfillment ratings`, mitigation: "Order samples first, check reviews" },
        { type: "price_volatility", severity: "low", description: "Price fluctuations in this category are minimal", mitigation: "Set price alerts" },
        { type: "competition", severity: score > 40 ? "high" : "medium", description: `${product.category} has ${score > 40 ? "high" : "moderate"} competition levels`, mitigation: `Differentiate through ${score > 40 ? "unique packaging or bundles" : "quality and service"}` },
      ],
    };
  }
  try {
    const r = await createChatCompletion([{ role: "user", content: `Assess risk for: ${product.title} from ${product.supplier} ($${product.price} in ${product.category}). Return JSON.` }]);
    return JSON.parse(r.choices[0]?.message?.content?.replace(/```json|```/g, "").trim() || "{}");
  } catch { return { overallRisk: "medium", score: 50, risks: [] }; }
}

// Automation Service
export async function evaluateAutomationRule(rule: { type: string; conditions: any[] }): Promise<{ shouldExecute: boolean; reason: string; priority: number }> {
  if (getMockMode()) {
    return {
      shouldExecute: Math.random() > 0.3,
      reason: `Rule "${rule.type}" conditions met: suitable for automation`,
      priority: Math.round(30 + Math.random() * 70),
    };
  }
  try {
    const r = await createChatCompletion([{ role: "user", content: `Evaluate automation rule: ${JSON.stringify(rule)}. Should it execute? Return JSON with shouldExecute, reason, priority.` }]);
    return JSON.parse(r.choices[0]?.message?.content?.replace(/```json|```/g, "").trim() || "{}");
  } catch { return { shouldExecute: false, reason: "Evaluation failed", priority: 0 }; }
}