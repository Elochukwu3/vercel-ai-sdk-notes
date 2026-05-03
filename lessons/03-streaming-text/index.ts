/**
 * Lesson 03 — Streaming Text With Vercel's AI SDK
 *
 * What you'll learn:
 * - The difference between generateText and streamText
 * - How to use textStream (async iterable) token by token
 * - How to stream output to the console with process.stdout
 * - How to also await the full text from streamText
 *
 * Run:
 *   npx tsx lessons/03-streaming-text/index.ts
 */

import "dotenv/config";

import { streamText } from "ai";

// ─── CHOOSE YOUR PROVIDER ───────────────────────────────────────────────────
//  Groq (free) — GROQ_API_KEY in .env — console.groq.com
import { groq } from "@ai-sdk/groq";
const model = groq("llama-3.1-8b-instant");

// Google Gemini (free) — GOOGLE_GENERATIVE_AI_API_KEY in .env
// import { google } from "@ai-sdk/google";
// const model = google("gemini-1.5-flash");

// Anthropic (paid) — ANTHROPIC_API_KEY in .env
// import { anthropic } from "@ai-sdk/anthropic";
// const model = anthropic("claude-3-5-haiku-latest");
// ────────────────────────────────────────────────────────────────────────────

// Stream response token by token to the console
export const streamAnswer = async (prompt: string): Promise<void> => {
  const { textStream } = await streamText({
    model,
    prompt,
  });

  // textStream is an async iterable — each chunk is a token as it arrives
  for await (const chunk of textStream) {
    process.stdout.write(chunk); // write each token instantly, no newline
  }

  console.log(); // move to new line when stream finishes
};

// Bonus: if you just want the full text without streaming
export const streamAnswerFull = async (prompt: string): Promise<string> => {
  const { text } = await streamText({
    model,
    prompt,
  });

  // `text` is a Promise — await it to get the complete response
  return text;
};

// Run it — watch the response appear token by token in your terminal!
const prompt = "What is the color of the sun? Explain in detail.";

console.log("Question:", prompt);
console.log("Answer:");
await streamAnswer(prompt);