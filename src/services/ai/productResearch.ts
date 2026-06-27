import { createChatCompletion, getMockMode } from "./aiClient";
import type { ProductResearchResult, AIProductScore } from "@/types/ai";

const MOCK_PRODUCTS: ProductResearchResult[] = [
  {
    id: "prod-001", title: "Smart Water Bottle with Temperature Display",
    description: "Insulated stainless steel water bottle with LED temp display and hydration tracking.",
    category: "Health & Wellness", price: 34.99, cost: 8.50, profitMargin: 75.7,
    score: { overall: 87, demandScore: 92, competitionScore: 68, profitScore: 85, trendScore: 95, seasonalityScore: 80, supplierReliability: 90 },
    trends: [], competitors: [],
    demandForecast: { currentDemand: 85, projectedDemand: 92, growthRate: 15.4, seasonalityFactor: 1.2, confidence: 0.85, peakMonths: ["January"], lowMonths: ["March"] },
    source: "AI Research", images: [], timestamp: new Date(),
  },
  {
    id: "prod-002", title: "LED Light Therapy Face Mask",
    description: "Professional-grade LED light therapy mask for skin rejuvenation. 7 color modes.",
    category: "Beauty & Skincare", price: 79.99, cost: 18.00, profitMargin: 77.5,
    score: { overall: 91, demandScore: 94, competitionScore: 72, profitScore: 88, trendScore: 96, seasonalityScore: 85, supplierReliability: 88 },
    trends: [], competitors: [],
    demandForecast: { currentDemand: 90, projectedDemand: 95, growthRate: 22.8, seasonalityFactor: 1.1, confidence: 0.88, peakMonths: ["December"], lowMonths: ["April"] },
    source: "AI Research", images: [], timestamp: new Date(),
  },
  {
    id: "prod-003", title: "Portable Neck Fan with 6000mAh Battery",
    description: "Hands-free wearable neck fan with 72-hour battery life. 3-speed settings.",
    category: "Electronics & Gadgets", price: 25.99, cost: 6.80, profitMargin: 73.8,
    score: { overall: 84, demandScore: 88, competitionScore: 65, profitScore: 82, trendScore: 90, seasonalityScore: 75, supplierReliability: 85 },
    trends: [], competitors: [],
    demandForecast: { currentDemand: 78, projectedDemand: 85, growthRate: 12.5, seasonalityFactor: 1.5, confidence: 0.82, peakMonths: ["July"], lowMonths: ["January"] },
    source: "AI Research", images: [], timestamp: new Date(),
  },
  {
    id: "prod-004", title: "Automatic Cat Feeder with Camera",
    description: "Smart pet feeder with 1080p camera, two-way audio, scheduled feeding.",
    category: "Pets & Animals", price: 69.99, cost: 18.50, profitMargin: 73.6,
    score: { overall: 88, demandScore: 90, competitionScore: 70, profitScore: 84, trendScore: 92, seasonalityScore: 88, supplierReliability: 87 },
    trends: [], competitors: [],
    demandForecast: { currentDemand: 82, projectedDemand: 89, growthRate: 18.2, seasonalityFactor: 1.05, confidence: 0.86, peakMonths: ["December"], lowMonths: ["June"] },
    source: "AI Research", images: [], timestamp: new Date(),
  },
];

export function calculateProductScore(product: Partial<ProductResearchResult>): AIProductScore {
  const s = product.score;
  const demandScore = Math.round(Math.min(100, (s?.demandScore ?? 70) + (Math.random() - 0.3) * 20));
  const competitionScore = Math.round(Math.min(100, (s?.competitionScore ?? 65) + (Math.random() - 0.5) * 20));
  const profitScore = Math.round(Math.min(100, (s?.profitScore ?? 75) + (Math.random() - 0.3) * 15));
  const trendScore = Math.round(Math.min(100, (s?.trendScore ?? 70) + (Math.random() - 0.2) * 25));
  const seasonalityScore = Math.round(Math.min(100, (s?.seasonalityScore ?? 70) + (Math.random() - 0.4) * 20));
  const supplierReliability = Math.round(Math.min(100, (s?.supplierReliability ?? 75) + (Math.random() - 0.3) * 15));
  const overall = Math.round(demandScore*0.25 + competitionScore*0.20 + profitScore*0.20 + trendScore*0.20 + seasonalityScore*0.10 + supplierReliability*0.05);
  return { overall, demandScore, competitionScore, profitScore, trendScore, seasonalityScore, supplierReliability };
}

export async function searchProducts(query: string, category?: string): Promise<ProductResearchResult[]> {
  if (getMockMode()) {
    let results = [...MOCK_PRODUCTS];
    if (query) results = results.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    if (category) results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
    return results.map(p => ({ ...p, score: calculateProductScore(p) }));
  }
  try {
    const response = await createChatCompletion([
      { role: "system", content: "You are a product research expert for dropshipping. Return JSON array." },
      { role: "user", content: `Find trending products for: ${query}${category ? " in category: " + category : ""}` },
    ]);
    const text = response.choices[0]?.message?.content || "[]";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return MOCK_PRODUCTS.map(p => ({ ...p, score: calculateProductScore(p) }));
  }
}

export function getProductById(id: string): ProductResearchResult | undefined {
  return MOCK_PRODUCTS.find(p => p.id === id);
}

export function getAllProductCategories(): string[] {
  return [...new Set(MOCK_PRODUCTS.map(p => p.category))];
}