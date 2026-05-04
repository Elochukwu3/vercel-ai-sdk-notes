/**
 * Lesson 07 — Use Local Models With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to connect the AI SDK to any OpenAI-compatible local model
 * - How to use createOpenAICompatible for local providers
 * - How to connect to Ollama running on your machine
 * - Why maxRetries: 0 matters for local models
 *
 * Prerequisites:
 * - Ollama installed and running on your machine
 * - At least one model pulled e.g: ollama pull llama3.2
 * - Ollama runs at http://localhost:11434 by default
 *
 * Run:
 *   npx tsx lessons/07-local-models/index.ts
 */

import "dotenv/config";

import { generateText } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// ─── Ollama Provider 
// Ollama exposes an OpenAI-compatible API at localhost:11434
const ollama = createOpenAICompatible({
  name: "ollama",
  baseURL: "http://localhost:11434/v1",
});

// Pass the model name you have pulled locally
// Run `ollama list` in your terminal to see available models
const model = ollama("stablelm-zephyr:3b-q4_K_M");

// ─── Ask Function 
export const askLocalModel = async (input: string): Promise<string> => {
  const { text } = await generateText({
    model,
    prompt: input,
    maxRetries: 0, // fail instantly if Ollama isn't running — no point retrying
  });
  return text;
};

// ─── Run it ───────────────────────────────────────────────────────────────
const input = "Tell me a story about your grandmother.";

console.log(" Using local Ollama model — no API key, no internet needed!");
console.log("Prompt:", input);
console.log("\n Response:");

const result = await askLocalModel(input);
console.log(result);