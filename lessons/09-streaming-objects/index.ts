/**
 * Lesson 09 — Streaming Objects With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to stream structured objects using streamText + Output.object()
 * - How to access partial objects as they stream in
 * - The difference between awaiting the final object vs streaming partials
 * - Real world use case for streaming structured data to a UI
 *
 * Run:
 *   npx tsx lessons/09-streaming-objects/index.ts
 */

import "dotenv/config";

import { streamText, Output } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

const model = groq("meta-llama/llama-4-scout-17b-16e-instruct");

// ─── Zod Schema (same as lesson 08) 
const schema = z.object({
  recipe: z.object({
    name: z
      .string()
      .describe("The title of the recipe"),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          amount: z.string(),
        })
      )
      .describe("The ingredients needed for the recipe"),
    steps: z
      .array(z.string())
      .describe("The steps to make the recipe"),
  }),
});

// ─── Stream with partial object updates ───────────────────────────────────
export const createRecipe = async (prompt: string) => {
  const result = streamText({
    model,
    output: Output.object({ schema }),
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names, ` +
      `like Coriander over Cilantro.`,
    prompt,
  });

  // Stream partial objects as they arrive — great for real-time UI updates
  for await (const obj of result.partialOutputStream) {
    console.clear();
    console.dir(obj, { depth: null }); // watch object build up in real time
  }

  // Wait for the complete final object
  const finalObject = await result.output;
  return finalObject.recipe;
};

// ─── Run it ────
console.log(" Streaming recipe for hummus...\n");

const recipe = await createRecipe("How to make hummus?");

console.log("\n Final complete recipe:");
console.dir(recipe, { depth: null });