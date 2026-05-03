/**
 * Lesson 02 — Generate Text With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to import and configure a model provider
 * - How to use generateText() for a one-shot AI response
 * - How to wrap AI calls in a reusable async function
 *
 * Run:
 *   npx tsx lessons/02-generate-text/index.ts
 */

import "dotenv/config"; // must be first — loads your .env file

import { generateText } from "ai";

// ─── CHOOSE YOUR PROVIDER ───────────────────────────────────────────────────
// Uncomment the one you want to use and comment out the others
// Make sure the matching API key is set in your .env file

// Groq (free) — GROQ_API_KEY in .env — console.groq.com
import { groq } from "@ai-sdk/groq";
const model = groq("llama-3.1-8b-instant");

//  Google Gemini (free) — GOOGLE_GENERATIVE_AI_API_KEY in .env — aistudio.google.com/apikey
// import { google } from "@ai-sdk/google";
// const model = google("gemini-1.5-flash");

// Anthropic (paid) — ANTHROPIC_API_KEY in .env — console.anthropic.com
// import { anthropic } from "@ai-sdk/anthropic";
// const model = anthropic("claude-3-5-haiku-latest");

// OpenAI (paid) — OPENAI_API_KEY in .env — platform.openai.com
// import { openai } from "@ai-sdk/openai";
// const model = openai("gpt-4o-mini");
// ────────────────────────────────────────────────────────────────────────────

// Reusable function — takes any question, returns AI answer
export const answerMyQuestion = async (question: string): Promise<string> => {
  const { text } = await generateText({
    model,
    prompt: question,
  });
  return text;
};

const question = "What is the meaning of life?";

answerMyQuestion(question).then((answer) => {
  console.log("Question:", question);
  console.log("Answer:", answer);
});