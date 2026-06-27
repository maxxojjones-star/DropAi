// ============================================================
// DropAI - AI Client Setup
// ============================================================
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

// Check for API key in environment
const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

let openaiInstance: OpenAI | null = null;

if (apiKey && apiKey !== 'your-api-key-here') {
  openaiInstance = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // Allow client-side usage for Next.js
  });
}

export const openai = openaiInstance;

export function isAIConfigured(): boolean {
  return openaiInstance !== null;
}

export function getMockMode(): boolean {
  return !openaiInstance;
}

export async function createChatCompletion(
  messages: ChatCompletionMessageParam[],
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
  }
) {
  if (!openaiInstance) {
    throw new Error('OpenAI API key not configured. Set OPENAI_API_KEY environment variable.');
  }

  return openaiInstance.chat.completions.create({
    model: options?.model || 'gpt-4o-mini',
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 2000,
    stream: options?.stream ?? false,
  });
}

export async function* streamChatCompletion(
  messages: ChatCompletionMessageParam[],
  options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }
): AsyncGenerator<string, void, unknown> {
  if (!openaiInstance) {
    throw new Error('OpenAI API key not configured. Set OPENAI_API_KEY environment variable.');
  }

  const stream = await openaiInstance.chat.completions.create({
    model: options?.model || 'gpt-4o-mini',
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 2000,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      yield content;
    }
  }
}

export async function generateImage(
  prompt: string,
  options?: {
    size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
    quality?: 'standard' | 'hd';
    n?: number;
  }
) {
  if (!openaiInstance) {
    throw new Error('OpenAI API key not configured.');
  }

  return openaiInstance.images.generate({
    prompt,
    model: 'dall-e-3',
    n: options?.n ?? 1,
    size: options?.size ?? '1024x1024',
    quality: options?.quality ?? 'standard',
  });
}

export default openai;