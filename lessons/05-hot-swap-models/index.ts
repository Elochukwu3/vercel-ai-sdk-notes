/**
 * Lesson 05 — Hot-Swap AI Models With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to use the LanguageModel type for dependency injection
 * - How to decouple your functions from any specific model
 * - How to pass any model into a reusable function
 *
 * Run:
 *   npx tsx lessons/05-hot-swap-models/index.ts
 */

import "dotenv/config";

import { generateText, type LanguageModel } from "ai";
import { groq } from "@ai-sdk/groq";

// Reusable function — completely decoupled from any specific model
// The model is injected as a parameter using the LanguageModel type
export const ask = async (
  prompt: string,
  model: LanguageModel
): Promise<string> => {
  const { text } = await generateText({
    model,
    prompt,
  });
  return text;
};

// Inject any model you want — just swap this one line
const model = groq("llama-3.1-8b-instant");

// Run it
const prompt = "What is dependency injection in one sentence?";

const answer = await ask(prompt, model);

console.log("Question:", prompt);
console.log("Answer:", answer);