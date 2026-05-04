/**
 * Lesson 06 — Working With Message Histories In Vercel's AI SDK
 *
 * What you'll learn:
 * - The ModelMessage type and its roles (user, assistant, system, tool)
 * - How to build and maintain a conversation history array
 * - How to set up a stateless server with Hono
 * - How to call the server from a client and append new messages
 *
 * Run:
 *   npx tsx lessons/06-message-histories/index.ts
 */

import "dotenv/config";

import { type ModelMessage } from "ai";
import { startServer } from "./server";

const server = await startServer();

// ─── Understanding ModelMessage shape 
const exampleHistory: ModelMessage[] = [
  {
    role: "system",
    content: "You are a friendly greeter.",
  },
  {
    role: "user",
    content: "Hello, you!",
  },
  {
    role: "assistant",
    content: "Hi there!",
  },
];

console.log("Example conversation history:");
console.dir(exampleHistory, { depth: null });


const messagesToSend: ModelMessage[] = [
  {
    role: "user",
    content: "What is the capital of Nigeria?",
  },
];

const response = await fetch("http://localhost:4317/api/get-completions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(messagesToSend),
});

const newMessages = (await response.json()) as ModelMessage[];

const allMessages = [...messagesToSend, ...newMessages];

console.log("\n Full conversation history:");
console.dir(allMessages, { depth: null });

server.close();