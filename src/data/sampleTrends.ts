// DropAI - Sample Trends Data
// Trend data samples for UI development
import type { TrendData, ViralSignal } from "@/types/ai";

export const sampleTrends: TrendData[] = [
  { platform: "tiktok", query: "smart water bottle", direction: "rising", velocity: 8.5, volume: 245000, relatedQueries: ["hydration tracker", "smart bottle", "water reminder"], timestamp: new Date() },
  { platform: "tiktok", query: "led face mask", direction: "rising", velocity: 9.2, volume: 890000, relatedQueries: ["light therapy mask", "skincare device"], timestamp: new Date() },
  { platform: "tiktok", query: "neck fan", direction: "rising", velocity: 7.5, volume: 680000, relatedQueries: ["wearable fan", "hands free fan"], timestamp: new Date() },
  { platform: "tiktok", query: "automatic cat feeder", direction: "rising", velocity: 6.8, volume: 340000, relatedQueries: ["smart pet feeder", "cat camera"], timestamp: new Date() },
  { platform: "instagram", query: "smart water bottle", direction: "rising", velocity: 6.2, volume: 180000, relatedQueries: ["smart hydration", "bottle tech"], timestamp: new Date() },
  { platform: "instagram", query: "led light therapy", direction: "rising", velocity: 7.8, volume: 560000, relatedQueries: ["LED skincare", "face mask beauty"], timestamp: new Date() },
  { platform: "facebook", query: "portable neck fan", direction: "stable", velocity: 3.2, volume: 210000, relatedQueries: ["travel fan", "outdoor fan"], timestamp: new Date() },
  { platform: "youtube", query: "packing cubes review", direction: "stable", velocity: 3.8, volume: 180000, relatedQueries: ["best packing cubes", "travel organization"], timestamp: new Date() },
  { platform: "google", query: "smart water bottle", direction: "rising", velocity: 7.1, volume: 420000, relatedQueries: ["temperature display bottle", "hydration reminder bottle"], timestamp: new Date() },
  { platform: "google", query: "automatic cat feeder with camera", direction: "rising", velocity: 8.1, volume: 520000, relatedQueries: ["best automatic cat feeder", "pet camera feeder"], timestamp: new Date() },
];

export const sampleViralSignals: ViralSignal[] = [
  { platform: "TikTok", signal: "#smartwaterbottle content going viral with influencers", strength: 92, evidence: ["2.3M views on top video", "45K shares in 24hr", "Influencer adoption rising"] },
  { platform: "Instagram", signal: "LED face mask reels surging in beauty niche", strength: 96, evidence: ["Sponsored posts up 340%", "Beauty influencers promoting", "High engagement rates"] },
  { platform: "Google", signal: "Search volume for automatic pet feeders up 180% YoY", strength: 85, evidence: ["Growing search trend", "Low competition keywords available", "High commercial intent"] },
  { platform: "TikTok", signal: "Neck fan content trending in summer gadgets", strength: 78, evidence: ["Seasonal spike beginning", "Outdoor lifestyle creators adopting", "TikTok shop listings growing"] },
];

export const trendingCategories = [
  { name: "Health & Wellness", trendScore: 92, growthRate: 18.5, totalVolume: 2400000, rising: true },
  { name: "Beauty & Skincare", trendScore: 94, growthRate: 22.3, totalVolume: 3100000, rising: true },
  { name: "Electronics & Gadgets", trendScore: 85, growthRate: 12.1, totalVolume: 4100000, rising: true },
  { name: "Pets & Animals", trendScore: 88, growthRate: 16.7, totalVolume: 1800000, rising: true },
  { name: "Travel & Outdoors", trendScore: 78, growthRate: 8.2, totalVolume: 1500000, rising: false },
  { name: "Home & Kitchen", trendScore: 72, growthRate: 5.4, totalVolume: 2900000, rising: false },
  { name: "Fashion & Accessories", trendScore: 70, growthRate: 4.8, totalVolume: 5200000, rising: false },
  { name: "Fitness & Sports", trendScore: 82, growthRate: 11.3, totalVolume: 2100000, rising: true },
];