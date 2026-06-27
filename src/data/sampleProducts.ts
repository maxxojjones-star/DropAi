// DropAI - Sample Products Data
// Example products with scoring data for UI development
import type { ProductResearchResult } from "@/types/ai";

export const sampleProducts: ProductResearchResult[] = [
  {
    id: "sample-001",
    title: "Smart Water Bottle with Temperature Display",
    description: "Insulated stainless steel water bottle with LED temperature display and hydration tracking. Keeps drinks cold 24h or hot 12h. Tracks daily water intake via smart cap.",
    category: "Health & Wellness",
    price: 34.99,
    cost: 8.50,
    profitMargin: 75.7,
    score: { overall: 87, demandScore: 92, competitionScore: 68, profitScore: 85, trendScore: 95, seasonalityScore: 80, supplierReliability: 90 },
    trends: [
      { platform: "tiktok", query: "smart water bottle", direction: "rising", velocity: 8.5, volume: 245000, relatedQueries: ["hydration tracker", "smart bottle", "water reminder"], timestamp: new Date() },
      { platform: "instagram", query: "smart water bottle", direction: "rising", velocity: 6.2, volume: 180000, relatedQueries: ["smart hydration", "bottle tech", "health gadgets"], timestamp: new Date() },
      { platform: "google", query: "smart water bottle", direction: "rising", velocity: 7.1, volume: 420000, relatedQueries: ["temperature display bottle", "hydration reminder bottle"], timestamp: new Date() },
    ],
    competitors: [
      { name: "HydrateSpark", url: "https://hydratespark.com", price: 49.99, estimatedSales: 15000, rating: 4.3, reviewCount: 2340, strengths: ["Brand recognition", "App integration"], weaknesses: ["Higher price", "Battery issues"] },
      { name: "AquaSmart", url: "https://aquasmart.com", price: 39.99, estimatedSales: 8500, rating: 4.1, reviewCount: 1200, strengths: ["Good design", "Fast shipping"], weaknesses: ["Limited colors", "No app"] },
    ],
    demandForecast: { currentDemand: 85, projectedDemand: 92, growthRate: 15.4, seasonalityFactor: 1.2, confidence: 0.85, peakMonths: ["January", "June", "December"], lowMonths: ["March", "September"] },
    source: "AI Research Engine",
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800"],
    timestamp: new Date(),
  },
  {
    id: "sample-002",
    title: "LED Light Therapy Face Mask",
    description: "Professional-grade LED light therapy mask for skin rejuvenation. 7 color light modes targeting wrinkles, acne, and pigmentation. FDA-cleared, medical-grade silicone.",
    category: "Beauty & Skincare",
    price: 79.99,
    cost: 18.00,
    profitMargin: 77.5,
    score: { overall: 91, demandScore: 94, competitionScore: 72, profitScore: 88, trendScore: 96, seasonalityScore: 85, supplierReliability: 88 },
    trends: [
      { platform: "tiktok", query: "led face mask", direction: "rising", velocity: 9.2, volume: 890000, relatedQueries: ["light therapy mask", "skincare device", "anti aging mask"], timestamp: new Date() },
      { platform: "instagram", query: "led light therapy", direction: "rising", velocity: 7.8, volume: 560000, relatedQueries: ["LED skincare", "face mask beauty"], timestamp: new Date() },
    ],
    competitors: [
      { name: "Dr. Dennis Gross", url: "https://drdennisgross.com", price: 459.00, estimatedSales: 5000, rating: 4.5, reviewCount: 3400, strengths: ["Premium brand", "Clinical results"], weaknesses: ["Extremely expensive", "Bulky"] },
      { name: "Omnilux", url: "https://omnilux.com", price: 395.00, estimatedSales: 8000, rating: 4.4, reviewCount: 5200, strengths: ["Medical grade", "FDA cleared"], weaknesses: ["High price point", "Limited colors"] },
    ],
    demandForecast: { currentDemand: 90, projectedDemand: 95, growthRate: 22.8, seasonalityFactor: 1.1, confidence: 0.88, peakMonths: ["January", "November", "December"], lowMonths: ["April", "August"] },
    source: "AI Research Engine",
    images: ["https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800"],
    timestamp: new Date(),
  },
  {
    id: "sample-003",
    title: "Portable Neck Fan with 6000mAh Battery",
    description: "Hands-free wearable neck fan with 72-hour battery life. 3-speed settings, ultra-quiet operation. Perfect for outdoor activities, travel, and workouts.",
    category: "Electronics & Gadgets",
    price: 25.99,
    cost: 6.80,
    profitMargin: 73.8,
    score: { overall: 84, demandScore: 88, competitionScore: 65, profitScore: 82, trendScore: 90, seasonalityScore: 75, supplierReliability: 85 },
    trends: [
      { platform: "tiktok", query: "neck fan", direction: "rising", velocity: 7.5, volume: 680000, relatedQueries: ["wearable fan", "hands free fan", "summer gadget"], timestamp: new Date() },
      { platform: "facebook", query: "portable neck fan", direction: "stable", velocity: 3.2, volume: 210000, relatedQueries: ["travel fan", "outdoor fan"], timestamp: new Date() },
    ],
    competitors: [
      { name: "JISULIFE", url: "https://jisulife.com", price: 29.99, estimatedSales: 25000, rating: 4.2, reviewCount: 8900, strengths: ["Market leader", "Good battery"], weaknesses: ["Noise issues", "Limited colors"] },
    ],
    demandForecast: { currentDemand: 78, projectedDemand: 85, growthRate: 12.5, seasonalityFactor: 1.5, confidence: 0.82, peakMonths: ["May", "June", "July", "August"], lowMonths: ["January", "February"] },
    source: "AI Research Engine",
    images: ["https://images.unsplash.com/photo-1608354580875-30bd4167f3ad?w=800"],
    timestamp: new Date(),
  },
  {
    id: "sample-004", title: "Automatic Cat Feeder with Camera", description: "Smart pet feeder with 1080p camera, two-way audio, scheduled feeding, and portion control. App controlled, works with Alexa/Google Home.", category: "Pets & Animals", price: 69.99, cost: 18.50, profitMargin: 73.6,
    score: { overall: 88, demandScore: 90, competitionScore: 70, profitScore: 84, trendScore: 92, seasonalityScore: 88, supplierReliability: 87 },
    trends: [{ platform: "tiktok", query: "automatic cat feeder", direction: "rising", velocity: 6.8, volume: 340000, relatedQueries: ["smart pet feeder", "cat camera"], timestamp: new Date() }],
    competitors: [{ name: "PetSafe", url: "https://petsafe.com", price: 89.95, estimatedSales: 18000, rating: 4.0, reviewCount: 12000, strengths: ["Trusted brand", "Reliable"], weaknesses: ["Expensive", "App issues"] }],
    demandForecast: { currentDemand: 82, projectedDemand: 89, growthRate: 18.2, seasonalityFactor: 1.05, confidence: 0.86, peakMonths: ["January", "December"], lowMonths: ["June", "July"] },
    source: "AI Research Engine", images: ["https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800"], timestamp: new Date(),
  },
  {
    id: "sample-005", title: "Compression Packing Cubes Set (6-Pack)", description: "Travel compression packing cubes that reduce luggage volume by 50%. Waterproof, durable nylon with double zipper compression system.", category: "Travel & Outdoors", price: 18.99, cost: 4.20, profitMargin: 77.9,
    score: { overall: 82, demandScore: 85, competitionScore: 62, profitScore: 90, trendScore: 78, seasonalityScore: 95, supplierReliability: 82 },
    trends: [{ platform: "tiktok", query: "packing cubes", direction: "rising", velocity: 5.9, volume: 420000, relatedQueries: ["travel hacks", "packing organization"], timestamp: new Date() }],
    competitors: [{ name: "eBags", url: "https://ebags.com", price: 29.99, estimatedSales: 35000, rating: 4.5, reviewCount: 28000, strengths: ["High quality", "Lifetime warranty"], weaknesses: ["Expensive", "Heavy"] }],
    demandForecast: { currentDemand: 75, projectedDemand: 80, growthRate: 8.5, seasonalityFactor: 1.8, confidence: 0.80, peakMonths: ["March", "April", "May", "June", "July", "August", "December"], lowMonths: ["September", "October"] },
    source: "AI Research Engine", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"], timestamp: new Date(),
  },
  {
    id: "sample-006", title: "Wireless Bluetooth Earbuds with ANC", description: "Premium wireless earbuds with active noise cancellation, 30hr battery life, IPX5 waterproof. Crystal clear calls and deep bass.", category: "Electronics & Gadgets", price: 39.99, cost: 10.50, profitMargin: 73.8,
    score: { overall: 79, demandScore: 82, competitionScore: 55, profitScore: 80, trendScore: 75, seasonalityScore: 85, supplierReliability: 80 },
    trends: [{ platform: "google", query: "wireless earbuds ANC", direction: "stable", velocity: 4.2, volume: 890000, relatedQueries: ["best budget earbuds", "noise cancelling earbuds"], timestamp: new Date() }],
    competitors: [{ name: "SoundPEATS", url: "https://soundpeats.com", price: 35.99, estimatedSales: 45000, rating: 4.3, reviewCount: 45000, strengths: ["Popular brand", "Good sound"], weaknesses: ["Battery life", "Build quality"] }],
    demandForecast: { currentDemand: 72, projectedDemand: 78, growthRate: 6.2, seasonalityFactor: 1.3, confidence: 0.78, peakMonths: ["January", "November", "December"], lowMonths: ["June", "July"] },
    source: "AI Research Engine", images: ["https://images.unsplash.com/photo-1590658268037-6bf12f032f35?w=800"], timestamp: new Date(),
  },
];

export const topRatedProducts = sampleProducts.filter(p => p.score.overall >= 85);
export const trendingProducts = sampleProducts.filter(p => p.score.trendScore >= 85);
export const highProfitProducts = sampleProducts.filter(p => p.score.profitScore >= 85);