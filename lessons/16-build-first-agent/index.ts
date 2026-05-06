/**
 * Lesson 16 — Build Your First Agent With Vercel's AI SDK
 *
 * What you'll learn:
 * - How to build an agentic loop using tools + maxSteps
 * - How the LLM calls a tool, reads the result, and responds
 * - How to use inputSchema (AI SDK v6 pattern)
 * - How maxSteps controls how many times the loop runs
 * - How the LLM decides when to stop (finishReason: 'stop')
 *
 * Run:
 *   npx tsx lessons/16-build-first-agent/index.ts
 */

import "dotenv/config";

import { streamText, tool } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

// ─── Step 1: Define model 
const model = groq("llama-3.3-70b-versatile");

// ─── Step 2: Create tool ─
// Tools are functions the LLM can call to interact with the real world
const getWeatherTool = tool({
  description: "Get the current weather in the specified city",
  inputSchema: z.object({
    city: z
      .string()
      .describe("The city to get the weather for"),
  }),
  strict: true,

  execute: async ({ city }) => {
    // In production: call a real weather API 
    console.log(`\n TOOL CALLED: getWeather({ city: "${city}" })`);

    return {
      city,
      temperature: "25°C",
      condition: "sunny",
      summary: `The weather in ${city} is 25°C and sunny.`,
    };
  },
});

// ─── Step 3: Agent function
const askAQuestion = async (prompt: string): Promise<void> => {
  const result = streamText({
    model,
    prompt,
    tools: {
      getWeather: getWeatherTool,
    },
    onStepFinish: ({toolCalls, toolResults, finishReason }) => {
      console.log("\n--- Step finished ---");
    //   console.log("Type:", stepType);
      console.log("Finish reason:", finishReason);

      if (toolCalls.length > 0) {
        console.log("Tool called:", toolCalls[0].toolName);
      }

      if (toolResults.length > 0) {
        console.log("Tool result:", toolResults[0].output);
      }

      console.log("---------------------");
    },
  });

  // Stream final response token by token
  console.log("\n Agent response:\n");
  for await (const text of result.textStream) {
    process.stdout.write(text);
  }

  // Inspect all steps taken
  console.log("\n\n Steps taken:");
  console.dir(await result.steps, { depth: null });
};

// ─── Step 4: Run it ──────
console.log(" Agent starting...\n");
console.log("Question: What's the weather like in Lagos?\n");

await askAQuestion("What's the weather like in Lagos?");