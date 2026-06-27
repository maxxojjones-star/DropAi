// ============================================================
// DropAI - AI Type Definitions
// ============================================================

export interface AIProductScore {
  overall: number; // 0-100
  demandScore: number;
  competitionScore: number;
  profitScore: number;
  trendScore: number;
  seasonalityScore: number;
  supplierReliability: number;
}

export interface ProductResearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  profitMargin: number;
  score: AIProductScore;
  trends: TrendData[];
  competitors: CompetitorAnalysis[];
  demandForecast: DemandForecast;
  source: string;
  images: string[];
  timestamp: Date;
}

export interface TrendData {
  platform: 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'google';
  query: string;
  direction: 'rising' | 'falling' | 'stable';
  velocity: number;
  volume: number;
  relatedQueries: string[];
  timestamp: Date;
}

export interface CompetitorAnalysis {
  name: string;
  url: string;
  price: number;
  estimatedSales: number;
  rating: number;
  reviewCount: number;
  strengths: string[];
  weaknesses: string[];
}

export interface DemandForecast {
  currentDemand: number;
  projectedDemand: number;
  growthRate: number;
  seasonalityFactor: number;
  confidence: number;
  peakMonths: string[];
  lowMonths: string[];
}

export interface AICopyOptions {
  tone: 'professional' | 'casual' | 'luxury' | 'youthful' | 'authoritative';
  length: 'short' | 'medium' | 'long';
  keywords: string[];
  targetAudience: string;
}

export interface AICopyResult {
  title: string;
  description: string;
  seoDescription: string;
  bulletPoints: string[];
  adCopy: string;
  emailCopy: string;
  socialPost: string;
}

export interface BusinessCoachRecommendation {
  id: string;
  category: 'products' | 'marketing' | 'pricing' | 'operations' | 'growth';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  actionable: boolean;
  steps: string[];
  metrics: string[];
}

export interface ProfitOptimization {
  currentProfit: number;
  optimizedProfit: number;
  savings: number;
  recommendations: ProfitRecommendation[];
}

export interface ProfitRecommendation {
  area: 'supplier' | 'pricing' | 'shipping' | 'advertising' | 'operations';
  title: string;
  description: string;
  potentialSavings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  implementation: string[];
}

export interface PricingSuggestion {
  currentPrice: number;
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  confidence: number;
  reasoning: string[];
  competitorPrices: number[];
  optimalMargin: number;
}

export interface SalesForecast {
  daily: number[];
  weekly: number[];
  monthly: number[];
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  seasonalityAdjusted: boolean;
  factors: string[];
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  score: number; // 0-100
  productRisks: RiskFactor[];
  supplierRisks: RiskFactor[];
  marketRisks: RiskFactor[];
}

export interface RiskFactor {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  mitigation: string;
  probability: number;
}

export interface DetectionResult {
  products: ProductResearchResult[];
  timestamp: Date;
  totalResults: number;
  confidence: number;
}

export interface ViralSignal {
  platform: string;
  signal: string;
  strength: number;
  evidence: string[];
}

export interface ChatbotMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  context?: Record<string, unknown>;
  timestamp: Date;
}

export interface ChatbotResponse {
  message: string;
  actions?: ChatbotAction[];
  sentiment: 'positive' | 'neutral' | 'negative';
  requiresHuman: boolean;
}

export interface ChatbotAction {
  type: 'order_lookup' | 'product_info' | 'refund' | 'support_ticket' | 'tracking';
  label: string;
  data: Record<string, unknown>;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  enabled: boolean;
  lastRun?: Date;
}

export interface AutomationTrigger {
  type: 'price_change' | 'inventory_threshold' | 'trend_shift' | 'competitor_action' | 'time_based' | 'score_threshold';
  config: Record<string, unknown>;
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'gt' | 'lt' | 'gte' | 'lte' | 'contains' | 'changes';
  value: unknown;
}

export interface AutomationAction {
  type: 'adjust_price' | 'pause_ad' | 'increase_budget' | 'reorder' | 'notify' | 'update_listing' | 'switch_supplier';
  config: Record<string, unknown>;
}

export interface AIAnalytics {
  totalProductsAnalyzed: number;
  averageScore: number;
  topCategories: { category: string; count: number; avgScore: number }[];
  trendAccuracy: number;
  forecastingAccuracy: number;
}