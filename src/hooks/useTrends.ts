// DropAI - useTrends Hook
// Hook for trend data
"use client";
import { useState, useEffect, useCallback } from "react";
import type { TrendData, ViralSignal } from "@/types/ai";

interface TrendState {
  trends: TrendData[];
  viralSignals: ViralSignal[];
  isLoading: boolean;
  error: string | null;
}

export function useTrends(query?: string) {
  const [state, setState] = useState<TrendState>({
    trends: [],
    viralSignals: [],
    isLoading: false,
    error: null,
  });

  const analyze = useCallback(async (searchQuery: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { analyzeTrends, detectViralSignals } = await import("../services/ai/trendDetection");
      const [trends, viralSignals] = await Promise.all([
        analyzeTrends(searchQuery),
        detectViralSignals(),
      ]);
      setState({ trends, viralSignals, isLoading: false, error: null });
    } catch (err) {
      setState(prev => ({ ...prev, isLoading: false, error: err instanceof Error ? err.message : "Failed to analyze trends" }));
    }
  }, []);

  useEffect(() => {
    if (query) analyze(query);
  }, [query, analyze]);

  return { ...state, analyze };
}

export function useTrendingCategories() {
  const [categories] = useState([
    "Health & Wellness", "Beauty & Skincare", "Electronics & Gadgets",
    "Pets & Animals", "Travel & Outdoors", "Home & Kitchen",
    "Fashion & Accessories", "Fitness & Sports",
  ]);
  return categories;
}