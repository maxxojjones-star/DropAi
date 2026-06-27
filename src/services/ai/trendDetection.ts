// DropAI - Trend Detection Service
// Trend analysis across TikTok, Instagram, Facebook, YouTube, Google Trends
import { createChatCompletion, getMockMode } from "./aiClient";
import type { TrendData, ViralSignal } from "@/types/ai";

const TREND_PLATFORMS = ["tiktok", "instagram", "facebook", "youtube", "google"] as const;

export async function analyzeTrends(query: string, platforms?: string[]): Promise<TrendData[]> {
  if (getMockMode()) {
    const targets = platforms || [...TREND_PLATFORMS];
    return targets.map(p => ({
      platform: p as TrendData["platform"],
      query,
      direction: (["rising", "stable", "falling"] as const)[Math.floor(Math.random() * 3)],
      velocity: Math.round(Math.random() * 10 * 10) / 10,
      volume: Math.round(Math.random() * 500000),
      relatedQueries: [`${query} ${p}`, `best ${query}`, `${query} review`],
      timestamp: new Date(),
    }));
  }
  try {
    const response = await createChatCompletion([
      { role: "system", content: "You are a trend analysis expert for e-commerce and dropshipping." },
      { role: "user", content: `Analyze trending data for "${query}" on ${(platforms || [...TREND_PLATFORMS]).join(", ")}. Return JSON array.` },
    ]);
    return JSON.parse(response.choices[0]?.message?.content?.replace(/```json|```/g, "").trim() || "[]");
  } catch { return []; }
}

export async function detectViralSignals(category?: string): Promise<ViralSignal[]> {
  if (getMockMode()) {
    return [
      { platform: "TikTok", signal: `#${category || "viral"} content surging`, strength: Math.round(70 + Math.random() * 25), evidence: ["Rising views", "High engagement rate", "Creator adoption"] },
      { platform: "Instagram", signal: "Influencer promotion surge", strength: Math.round(60 + Math.random() * 30), evidence: ["Sponsored posts increasing", "Reels engagement up"] },
      { platform: "Google", signal: "Search volume increasing", strength: Math.round(65 + Math.random() * 20), evidence: ["Upward search trend", "Related queries growing"] },
    ];
  }
  try {
    const r = await createChatCompletion([{ role: "user", content: `Detect viral product signals in ${category || "dropshipping"} market right now. Return JSON array.` }]);
    return JSON.parse(r.choices[0]?.message?.content?.replace(/```json|```/g, "").trim() || "[]");
  } catch { return []; }
}

export function getTrendingCategories(): string[] {
  return ["Health & Wellness", "Beauty & Skincare", "Electronics & Gadgets", "Pets & Animals", "Travel & Outdoors", "Home & Kitchen", "Fashion & Accessories", "Fitness & Sports", "Baby & Kids", "Office & Business"];
}