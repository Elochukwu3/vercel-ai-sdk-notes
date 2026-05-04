/**
 * Lesson 08 — Structured Outputs With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to use generateText + output: 'object' for structured data
 * - How to define a Zod schema for your expected output shape
 * - How to use .describe() to give the AI more context per field
 * - How to use schemaName for cleaner AI instructions
 *
 * Note: generateObject is deprecated in AI SDK v5+
 * New pattern: generateText + output: 'object'
 *
 * Run:
 *   npx tsx lessons/08-structured-outputs/index.ts
 */

import "dotenv/config";

import { generateText, Output } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

const model = groq("meta-llama/llama-4-scout-17b-16e-instruct");

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

export const createRecipe = async (prompt: string) => {
  const result = await generateText({
    model,
    output: Output.object({ schema }), 
    prompt,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names, ` +
      `like Coriander over Cilantro.`,
  });

  return result.output.recipe; // result.output 
};

const recipe = await createRecipe("How to make baba ganoush?");

console.log("Recipe:");
console.dir(recipe, { depth: null });