// DropAI - useProductScore Hook
// Hook for product scoring with weighted analysis
"use client";
import { useState, useCallback } from "react";
import type { AIProductScore, ProductResearchResult } from "@/types/ai";

interface ScoreState {
  score: AIProductScore | null;
  breakdown: { label: string; value: number; weight: number; color: string }[] | null;
  recommendations: string[];
  isLoading: boolean;
  error: string | null;
}

export function useProductScore() {
  const [state, setState] = useState<ScoreState>({
    score: null,
    breakdown: null,
    recommendations: [],
    isLoading: false,
    error: null,
  });

  const calculate = useCallback(async (product: Partial<ProductResearchResult>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { scoreProduct, getDetailedBreakdown, getRecommendations } = await import("../services/ai/productScoring");
      const score = scoreProduct(product);
      const breakdown = getDetailedBreakdown(score);
      const recommendations = getRecommendations(score);
      setState({ score, breakdown, recommendations, isLoading: false, error: null });
    } catch (err) {
      setState(prev => ({ ...prev, isLoading: false, error: err instanceof Error ? err.message : "Failed to calculate score" }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({ score: null, breakdown: null, recommendations: [], isLoading: false, error: null });
  }, []);

  return { ...state, calculate, reset };
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#eab308";
  return "#ef4444";
}