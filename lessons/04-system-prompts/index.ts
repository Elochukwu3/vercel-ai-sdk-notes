/**
 * Lesson 04 — Adding System Prompts With Vercel's AI SDK
 *
 * What you'll learn:
 * - What a system prompt is and why it matters
 * - How to pass a `system` property to generateText / streamText
 * - How system prompts shape AI behaviour before the user prompt
 * - Alternative: passing `messages` array manually
 *
 * Run:
 *   npx tsx lessons/04-system-prompts/index.ts
 */

import "dotenv/config";

import { generateText } from "ai";

// ─── CHOOSE YOUR PROVIDER ───────────────────────────────────────────────────
// Groq (free) — GROQ_API_KEY in .env — console.groq.com
import { groq } from "@ai-sdk/groq";
const model = groq("llama-3.1-8b-instant");

//  Google Gemini (free) — GOOGLE_GENERATIVE_AI_API_KEY in .env
// import { google } from "@ai-sdk/google";
// const model = google("gemini-1.5-flash");

//  Anthropic (paid) — ANTHROPIC_API_KEY in .env
// import { anthropic } from "@ai-sdk/anthropic";
// const model = anthropic("claude-3-5-haiku-latest");
// ────────────────────────────────────────────────────────────────────────────

// System prompt — defines the AI's role and behaviour
const SUMMARIZER_SYSTEM_PROMPT =
  `You are a text summarizer. ` +
  `Summarize the text you receive. ` +
  `Be concise. ` +
  `Return only the summary. ` +
  `Do not use the phrase "here is a summary". ` +
  `Highlight relevant phrases in bold. ` +
  `The summary should be two sentences long.`;

// Summarize any block of text using a system prompt
export const summarizeText = async (input: string): Promise<string> => {
  const { text } = await generateText({
    model,
    prompt: input,
    system: SUMMARIZER_SYSTEM_PROMPT, //  this is the key addition
  });
  return text;
};

// Bonus: same result using `messages` array instead of system + prompt
export const summarizeTextWithMessages = async (
  input: string
): Promise<string> => {
  const { text } = await generateText({
    model,
    messages: [
      { role: "system", content: SUMMARIZER_SYSTEM_PROMPT },
      { role: "user", content: input },
    ],
  });
  return text;
};

// Run it
const articleSnippet = `
  The James Webb Space Telescope has revealed thousands of previously unseen 
  galaxies in a tiny patch of sky, offering the deepest infrared image of the 
  universe ever captured. Scientists believe the data could help explain how 
  galaxies formed just hundreds of millions of years after the Big Bang, 
  fundamentally changing our understanding of the early universe. The images 
  show light that has travelled over 13 billion years to reach us.
`;

console.log(" Original Text:", articleSnippet.trim());
console.log("\n Summary:");
console.log(await summarizeText(articleSnippet));

console.log("\n Summary (via messages array):");
console.log(await summarizeTextWithMessages(articleSnippet));