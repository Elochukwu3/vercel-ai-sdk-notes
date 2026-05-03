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
import "dotenv/config"; // 👈 add this line first!

import { google } from "@ai-sdk/google"; 
import { generateText } from "ai";

// 1. Configure your model — swap this one line to change provider
const model = google("gemini-1.5-flash"); 

// 2. Reusable function — takes any question, returns AI answer
export const answerMyQuestion = async (question: string): Promise<string> => {
  const { text } = await generateText({
    model,
    prompt: question,
  });
  return text;
};

// 3. Run it
const question = "What is the meaning of life?";

answerMyQuestion(question).then((answer) => {
  console.log("Question:", question);
  console.log("Answer:", answer);
});