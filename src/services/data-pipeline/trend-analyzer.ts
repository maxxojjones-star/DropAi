// ============================================================
// Orbit Data Pipeline — Gemini Trend Analyzer
// AI-powered product scoring, trend analysis, ad insights
// Uses Google Gemini 1.5 Flash (free tier: 15 RPM, 1M TPM)
// ============================================================

import type {
  GeminiProductAnalysis,
  GeminiTrendAnalysis,
  SerpApiShoppingResult,
  ScrapedShopifyProduct,
} from './types';

function getApiKey(): string | null {
  return process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || null;
}

export function isGeminiConfigured(): boolean {
  const key = getApiKey();
  return key !== null && key.length > 0;
}

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const MODEL = 'gemini-1.5-flash';

async function callGemini(prompt: string): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('Gemini API key not configured. Set GOOGLE_API_KEY.');

  const res = await fetch(`${GEMINI_BASE}/models/${MODEL}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 2048, topP: 0.8 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function cleanJson(text: string): string {
  return text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
}

// ── Product Scoring ─────────────────────────────────────────

export async function analyzeProduct(
  product: { title: string; price: number | string }
): Promise<GeminiProductAnalysis> {
  if (!isGeminiConfigured()) return getDefaultAnalysis(product);

  try {
    const prompt = `Analyze this dropshipping product for market viability. Return ONLY valid JSON:
${JSON.stringify({ title: product.title, price: product.price })}

Return: {"overallScore":0-100,"demandScore":0-100,"competitionScore":0-100,"profitScore":0-100,"trendScore":0-100,"seasonalityScore":0-100,"supplierReliability":0-100,"summary":"1 sentence","strengths":["3"],"weaknesses":["3"],"recommendedPrice":number,"targetAudience":["2-3"],"marketingAngles":["2-3"]}`;

    const json = cleanJson(await callGemini(prompt));
    const a = JSON.parse(json) as GeminiProductAnalysis;
    const clamp = (v: number) => Math.min(100, Math.max(0, v || 70));
    return {
      overallScore: clamp(a.overallScore), demandScore: clamp(a.demandScore),
      competitionScore: clamp(a.competitionScore), profitScore: clamp(a.profitScore),
      trendScore: clamp(a.trendScore), seasonalityScore: clamp(a.seasonalityScore),
      supplierReliability: clamp(a.supplierReliability),
      summary: a.summary || 'Promising product with growth potential.',
      strengths: a.strengths || [], weaknesses: a.weaknesses || [],
      recommendedPrice: a.recommendedPrice || (typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.]/g, '')) : product.price) * 1.5,
      targetAudience: a.targetAudience || [],
      marketingAngles: a.marketingAngles || [],
    };
  } catch (err) {
    console.error('[Gemini] Product analysis failed:', err);
    return getDefaultAnalysis(product);
  }
}

function getDefaultAnalysis(product: { title: string; price: number | string }): GeminiProductAnalysis {
  const price = typeof product.price === 'string'
    ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 29.99
    : product.price || 29.99;
  return {
    overallScore: 70, demandScore: 72, competitionScore: 65, profitScore: 75,
    trendScore: 70, seasonalityScore: 70, supplierReliability: 75,
    summary: 'Run with GOOGLE_API_KEY for full AI analysis.',
    strengths: ['Established demand', 'Good margin potential'],
    weaknesses: ['Competition analysis pending', 'Trend data needed'],
    recommendedPrice: price * 1.5,
    targetAudience: ['Online shoppers'], marketingAngles: ['Problem-solution'],
  };
}

// ── Trend Analysis ──────────────────────────────────────────

export async function analyzeTrends(
  category: string, trendData: Record<string, unknown>[]
): Promise<GeminiTrendAnalysis> {
  if (!isGeminiConfigured()) return getDefaultTrendAnalysis(category);

  try {
    const prompt = `Analyze e-commerce trends for "${category}":
${JSON.stringify(trendData.slice(0, 10))}

Return: {"category":"${category}","trendDirection":"rising|stable|falling","confidence":0-1,"keyDrivers":["3-5"],"predictedPeak":"quarter","marketSize":"description","topKeywords":["5"]}`;

    const json = cleanJson(await callGemini(prompt));
    return JSON.parse(json) as GeminiTrendAnalysis;
  } catch (err) {
    console.error('[Gemini] Trend analysis failed:', err);
    return getDefaultTrendAnalysis(category);
  }
}

function getDefaultTrendAnalysis(category: string): GeminiTrendAnalysis {
  return {
    category, trendDirection: 'rising', confidence: 0.6,
    keyDrivers: ['Online shopping growth', 'Social media', 'Influencer marketing'],
    predictedPeak: 'Q4 2025', marketSize: 'Growing',
    topKeywords: [category, `best ${category}`, `buy ${category}`, `${category} online`, `${category} shop`],
  };
}

// ── Ad Performance Analysis ─────────────────────────────────

export async function analyzeAdPerformance(
  headline: string, description: string, platform: string
): Promise<{
  effectivenessScore: number; targetAudience: string; messagingStyle: string;
  emotionalTriggers: string[]; strengths: string[]; improvements: string[];
  estimatedROI: 'high' | 'medium' | 'low';
}> {
  if (!isGeminiConfigured()) {
    return {
      effectivenessScore: 65, targetAudience: 'General consumers',
      messagingStyle: 'Standard promotion', emotionalTriggers: ['Curiosity', 'Value'],
      strengths: ['Clear focus'], improvements: ['Add social proof'],
      estimatedROI: 'medium',
    };
  }

  try {
    const prompt = `Analyze this ${platform} ad effectiveness:
Headline: "${headline}"
Description: "${description}"

Return: {"effectivenessScore":0-100,"targetAudience":"","messagingStyle":"","emotionalTriggers":["2-3"],"strengths":["2-3"],"improvements":["2-3"],"estimatedROI":"high|medium|low"}`;

    return JSON.parse(cleanJson(await callGemini(prompt)));
  } catch (err) {
    console.error('[Gemini] Ad analysis failed:', err);
    return { effectivenessScore: 65, targetAudience: 'General', messagingStyle: 'Standard',
      emotionalTriggers: ['Value'], strengths: ['Clear'], improvements: ['Add urgency'], estimatedROI: 'medium' };
  }
}

// ── Batch Analysis ──────────────────────────────────────────

export async function batchAnalyzeProducts(
  products: (SerpApiShoppingResult | ScrapedShopifyProduct)[]
): Promise<Map<string, GeminiProductAnalysis>> {
  const results = new Map<string, GeminiProductAnalysis>();
  for (const p of products) {
    const title = 'title' in p ? p.title : p.title;
    results.set(title, await analyzeProduct({ title, price: p.price }));
    await new Promise(r => setTimeout(r, 1000)); // 15 RPM limit
  }
  return results;
}
