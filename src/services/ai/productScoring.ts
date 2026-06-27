// DropAI - Product Scoring Service
// AI product scoring algorithm with detailed breakdowns
import { calculateProductScore } from "./productResearch";
import type { AIProductScore, ProductResearchResult } from "@/types/ai";

export function scoreProduct(product: Partial<ProductResearchResult>): AIProductScore {
  return calculateProductScore(product);
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Great";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  return "Poor";
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  return "red";
}

export function getDetailedBreakdown(score: AIProductScore): { label: string; value: number; weight: number; color: string }[] {
  return [
    { label: "Market Demand", value: score.demandScore, weight: 0.25, color: getScoreColor(score.demandScore) },
    { label: "Competition Level", value: score.competitionScore, weight: 0.20, color: getScoreColor(score.competitionScore) },
    { label: "Profit Potential", value: score.profitScore, weight: 0.20, color: getScoreColor(score.profitScore) },
    { label: "Trend Momentum", value: score.trendScore, weight: 0.20, color: getScoreColor(score.trendScore) },
    { label: "Seasonality", value: score.seasonalityScore, weight: 0.10, color: getScoreColor(score.seasonalityScore) },
    { label: "Supplier Reliability", value: score.supplierReliability, weight: 0.05, color: getScoreColor(score.supplierReliability) },
  ];
}

export function getRecommendations(score: AIProductScore): string[] {
  const recs: string[] = [];
  if (score.demandScore < 70) recs.push("Focus on products with higher market demand signals");
  if (score.competitionScore < 60) recs.push("Differentiate from competitors with unique positioning");
  if (score.profitScore < 70) recs.push("Look for products with better margins or negotiate with suppliers");
  if (score.trendScore < 70) recs.push("Trend momentum is low; consider products with growing interest");
  if (score.supplierReliability < 70) recs.push("Vet suppliers more thoroughly for reliability");
  return recs;
}