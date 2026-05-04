/**
 * Lesson 11 — Generate Arrays With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to generate an array of structured objects using Output.array()
 * - How to stream array elements as they arrive using elementStream
 * - Using Zod schema with .describe() for better AI context
 *
 * Run:
 *   npx tsx lessons/11-generate-arrays/index.ts
 */

import "dotenv/config";

import { generateText, streamText, Output } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

const model = groq("meta-llama/llama-4-scout-17b-16e-instruct");

// ─── Zod Schema ─
const userSchema = z.object({
  name: z.string().describe("The full name of the user"),
  age: z.number().describe("The user's age"),
  email: z
    .string()
    .email()
    .describe("The user's email address, @elo.com"),
});

// ─── Generate array all at once 
export const createFakeUsers = async (input: string) => {
  const result = await generateText({
    model,
    output: Output.array({ element: userSchema }),
    prompt: input,
    system: "You are generating fake user data.",
  });

  return result.output;
};

// ─── Stream array elements one by one 
export const streamFakeUsers = async (input: string) => {
  const result = streamText({
    model,
    output: Output.array({ element: userSchema }),
    prompt: input,
    system: "You are generating fake user data.",
  });

  // elementStream yields each complete validated user as it arrives
  for await (const user of result.elementStream) {
    console.log(" New user arrived:");
    console.dir(user, { depth: null });
    console.log();
  }
};

// ─── Run it ─────

// Option 1 — generate all at once
console.log(" Generating all users at once:\n");
const users = await createFakeUsers("Generate 5 fake users from Nigeria.");
console.dir(users, { depth: null });

// Option 2 — stream users one by one as they're generated
console.log("\n Streaming users one by one:\n");
await streamFakeUsers("Generate 3 fake users from the UK.");