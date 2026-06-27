// DropAI - AI Copywriting Service
// Product descriptions, ad copy, email, SEO content generation
import { createChatCompletion, getMockMode } from "./aiClient";
import type { AICopyOptions, AICopyResult } from "@/types/ai";

export async function generateProductCopy(
  productTitle: string,
  productDescription: string,
  options: AICopyOptions
): Promise<AICopyResult> {
  if (getMockMode()) {
    return {
      title: `${productTitle} - Premium Quality for Modern Living`,
      description: `Experience the exceptional quality of our ${productTitle.toLowerCase()}. ${productDescription} Perfect for anyone who values quality and style.`,
      seoDescription: `Shop premium ${productTitle.toLowerCase()} at unbeatable prices. ✓ Fast shipping ✓ Quality guaranteed ✓ Best prices online.`,
      bulletPoints: [
        "Premium quality materials built to last",
        "Designed for comfort and convenience",
        "Easy to use - perfect for daily life",
        "Backed by our 30-day satisfaction guarantee",
        "Fast and free shipping available",
      ],
      adCopy: `🔥 Transform your daily routine with ${productTitle}! Limited stock - order now! ⭐⭐⭐⭐⭐`,
      emailCopy: `Subject: You won't want to miss this...\n\nHi there,\n\nWe're excited to introduce our newest product: ${productTitle}!\n\n${productDescription}\n\nShop now and enjoy free shipping!`,
      socialPost: `🚀 JUST DROPPED: ${productTitle} ✨\n\n${productDescription.substring(0, 100)}...\n\nGet yours today! ⬇️\n#newproduct #musthave #trending`,
    };
  }
  try {
    const response = await createChatCompletion([
      { role: "system", content: "You are an expert e-commerce copywriter specializing in conversions." },
      { role: "user", content: `Product: ${productTitle}. Description: ${productDescription}. Tone: ${options.tone}. Length: ${options.length}. Keywords: ${options.keywords.join(", ")}. Target: ${options.targetAudience}. Return JSON with title, description, seoDescription, bulletPoints (array), adCopy, emailCopy, socialPost.` },
    ]);
    const text = response.choices[0]?.message?.content || "{}";
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return { title: productTitle, description: productDescription, seoDescription: productDescription.substring(0, 160), bulletPoints: ["High quality", "Fast shipping"], adCopy: "Shop now!", emailCopy: "Check it out!", socialPost: "#new" };
  }
}

export async function generateAdCopy(product: string, platform: string, audience: string): Promise<string> {
  if (getMockMode()) return `Amazing ${product} - Perfect for ${audience}. Get yours on ${platform} today! 🔥 Limited stock!`;
  try {
    const r = await createChatCompletion([{ role: "user", content: `Write a short, compelling ad copy for ${product} on ${platform} targeting ${audience}. Keep it under 150 chars.` }]);
    return r.choices[0]?.message?.content || "";
  } catch { return `Check out ${product}!`; }
}

export async function generateSEODescription(product: string, keywords: string[]): Promise<string> {
  if (getMockMode()) return `Shop the best ${product}. ${keywords.slice(0, 5).join(", ")}. Premium quality at great prices with fast shipping.`;
  try {
    const r = await createChatCompletion([{ role: "user", content: `Write an SEO meta description (max 160 chars) for ${product} with keywords: ${keywords.join(", ")}` }]);
    return r.choices[0]?.message?.content || "";
  } catch { return product; }
}