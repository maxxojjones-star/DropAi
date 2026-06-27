// DropAI - Image Generation Service
// DALL-E integration for product photography and marketing images
import { generateImage, getMockMode } from "./aiClient";

export async function createProductImage(
  productDescription: string,
  style: "product_photo" | "lifestyle" | "white_background" | "marketing" = "product_photo"
): Promise<string[]> {
  if (getMockMode()) {
    return [
      `https://picsum.photos/seed/${Date.now()}/800/800`,
      `https://picsum.photos/seed/${Date.now() + 1}/800/800`,
    ];
  }
  try {
    const stylePrompts: Record<string, string> = {
      product_photo: "Professional product photography, studio lighting, clean background, centered",
      lifestyle: "Lifestyle shot in natural setting, showing product in use by happy person",
      white_background: "White background, e-commerce product photo, centered, professional lighting",
      marketing: "Marketing banner style, gradient background, product focus",
    };
    const result = await generateImage(`${productDescription}. ${stylePrompts[style]}`);
    return result.data.map(img => img.url || "");
  } catch {
    return ["https://picsum.photos/seed/fallback/800/800"];
  }
}

export async function generateMarketingImage(productName: string, tagline: string): Promise<string[]> {
  if (getMockMode()) return [`https://picsum.photos/seed/mktg-${Date.now()}/1200/628`];
  try {
    const result = await generateImage(`Professional e-commerce marketing banner for ${productName}: "${tagline}". Clean design, product focus.`);
    return result.data.map(img => img.url || "");
  } catch { return ["https://picsum.photos/seed/mktg-fallback/1200/628"]; }
}