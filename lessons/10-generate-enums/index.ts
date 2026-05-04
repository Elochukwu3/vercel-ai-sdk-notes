/**
 * Lesson 10 — Generate Enums With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to use Output.choice() for enum/classification tasks
 * - How to get a single constrained string back from an LLM
 * - Classic sentiment analysis use case
 *
 * Run:
 *   npx tsx lessons/10-generate-enums/index.ts
 */

import "dotenv/config";

import { generateText, Output } from "ai";
import { groq } from "@ai-sdk/groq";

const model = groq("meta-llama/llama-4-scout-17b-16e-instruct");

// ─── Sentiment classifier 
export const classifySentiment = async (
  text: string
): Promise<"positive" | "negative" | "neutral"> => {
  const result = await generateText({
    model,
    output: Output.choice({
      options: ["positive", "negative", "neutral"] as const,
    }),
    prompt: text,
    system:
      `Classify the sentiment of the text as either ` +
      `positive, negative, or neutral.`,
  });

  return result.output;
};

// ─── Test a few examples ─
const tests = [
  "I'm not sure how I feel about this.",
  "This is absolutely terrible.",
  "I love this so much!",
  "The product is okay, nothing special.",
  "Best purchase I have ever made in my life!",
];

console.log("Sentiment Analysis:\n");

for (const text of tests) {
  const sentiment = await classifySentiment(text);
  const emoji =
    sentiment === "positive" ? "🟢" :
    sentiment === "negative" ? "🔴" : "🟡";

  console.log(`${emoji} "${text}"`);
  console.log(`   → ${sentiment}\n`);
}