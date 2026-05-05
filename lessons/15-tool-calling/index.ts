/**
 * Lesson — Tool Calling: logToConsole
 *
 * What you'll learn:
 * - How tools work in AI SDK v6
 * - How to define a simple tool with inputSchema
 * - How execute runs when the model calls the tool
 * - How to force tool usage with toolChoice
 *
 * Run:
 *   npx tsx lessons/15-tool-calling/index.ts
 */

import "dotenv/config";

import { generateText, tool } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

// ─── Step 1: Define model
const model = groq("llama-3.1-8b-instant");

// ─── Step 2: Create tool
const logToConsoleTool = tool({
  description: "Logs a message to the console",
  inputSchema: z.object({
    message: z.string(),
  }),
  strict: true,

  execute: async ({ message }) => {
    console.log(" TOOL OUTPUT:", message);

    return {
      logged: true,
      message,
    };
  },
});

// ─── Step 3: Call AI with tool
const prompt = "Log this message: Hello from AI tools";

const result = await generateText({
  model,
  prompt,

  tools: {
    logToConsole: logToConsoleTool,
  },

  toolChoice: "required", // forces tool usage
});

// ─── Step 4: Inspect result
console.log("\n FINAL RESULT:");
console.dir(result.text, { depth: null });

console.log("\n TOOL CALLS:");
console.dir(result.toolCalls, { depth: null });

console.log("\n TOOL RESULTS:");
console.dir(result.toolResults, { depth: null });