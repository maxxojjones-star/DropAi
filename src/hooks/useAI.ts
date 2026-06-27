// DropAI - useAI Hook
// Hook for streaming AI responses and managing AI state
"use client";
import { useState, useCallback } from "react";
import { streamChatCompletion, isAIConfigured } from "../services/ai/aiClient";

export function useAI() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [response, setResponse] = useState("");

  const streamResponse = useCallback(async (prompt: string, context?: string) => {
    setIsStreaming(true);
    setResponse("");
    try {
      const messages = [
        ...(context ? [{ role: "system" as const, content: context }] : []),
        { role: "user" as const, content: prompt },
      ];
      const generator = streamChatCompletion(messages);
      for await (const chunk of generator) {
        setResponse(prev => prev + chunk);
      }
    } catch (err) {
      setResponse(`Error: ${err instanceof Error ? err.message : "Failed to get response"}`);
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return { response, isStreaming, isConfigured: isAIConfigured(), streamResponse };
}

export function useChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    setMessages(prev => [...prev, { role: "user", content }]);
    setIsLoading(true);
    try {
      const { chat } = await import("../services/ai/chatbot");
      const result = await chat([...messages, { role: "user", content }].map(m => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
        timestamp: new Date(),
      })));
      setMessages(prev => [...prev, { role: "assistant", content: result.message }]);
      return result;
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error." }]);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, sendMessage, isLoading, isConfigured: isAIConfigured() };
}