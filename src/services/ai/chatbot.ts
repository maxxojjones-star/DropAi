// DropAI - Chatbot Service
// AI customer support chatbot with contextual responses
import { createChatCompletion, getMockMode } from "./aiClient";
import type { ChatbotMessage, ChatbotResponse, ChatbotAction } from "@/types/ai";

const CONTEXT_PROMPT = `You are DropAI's customer support assistant. Help users with:
- Order status and tracking inquiries
- Product recommendations and information
- Returns, refunds, and exchanges
- Shipping questions and policies
- Account management
Be helpful, friendly, and concise. If you cannot resolve an issue, offer to escalate.`;

export async function chat(messages: ChatbotMessage[]): Promise<ChatbotResponse> {
  if (getMockMode()) {
    const lastUserMsg = messages.filter(m => m.role === "user").pop();
    const query = lastUserMsg?.content || "";
    const hasOrder = query.toLowerCase().includes("order") || query.toLowerCase().includes("shipping") || query.toLowerCase().includes("track");
    const hasProduct = query.toLowerCase().includes("product") || query.toLowerCase().includes("recommend") || query.toLowerCase().includes("find");
    const hasRefund = query.toLowerCase().includes("refund") || query.toLowerCase().includes("return") || query.toLowerCase().includes("cancel");

    const actions: ChatbotAction[] = [];
    if (hasOrder) actions.push({ type: "order_lookup", label: "Check Order Status", data: {} });
    if (hasProduct) actions.push({ type: "product_info", label: "Get Product Details", data: {} });
    if (hasRefund) actions.push({ type: "refund", label: "Start a Return", data: {} });

    const responses: Record<string, string> = {
      order: "I'd be happy to help you with your order! Could you please provide your order number so I can look up the details?",
      shipping: "Our standard shipping takes 5-12 business days. Express shipping (2-5 business days) is available for an additional fee.",
      product: "Let me find the perfect product for you! What kind of product are you looking for? I can help with trending items in any category.",
      refund: "I understand you'd like to return an item. Our return policy allows returns within 30 days of delivery. Would you like to start a return?",
    };

    let response = "";
    if (hasOrder || hasShipping()) response = hasOrder ? responses.order : responses.shipping;
    else if (hasProduct) response = responses.product;
    else if (hasRefund) response = responses.refund;
    else response = "Hi! I'm DropAI's assistant. How can I help you today? I can check orders, find products, or help with any questions!";

    function hasShipping() { return query.toLowerCase().includes("shipping") || query.toLowerCase().includes("delivery") || query.toLowerCase().includes("arrive"); }

    return {
      message: response,
      sentiment: "positive",
      requiresHuman: hasRefund && query.includes("urgent"),
      actions,
    };
  }
  try {
    const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));
    const response = await createChatCompletion([
      { role: "system", content: CONTEXT_PROMPT },
      ...apiMessages,
    ]);
    const text = response.choices[0]?.message?.content || "";
    return {
      message: text,
      sentiment: "positive",
      requiresHuman: text.toLowerCase().includes("escalate") || text.toLowerCase().includes("human"),
    };
  } catch {
    return { message: "I'm sorry, I'm having trouble connecting. Please try again in a moment.", sentiment: "neutral", requiresHuman: false };
  }
}

export function createUserMessage(content: string): ChatbotMessage {
  return { role: "user", content, timestamp: new Date() };
}

export function createSystemMessage(content: string): ChatbotMessage {
  return { role: "system", content, timestamp: new Date() };
}